import {GraphQLClient} from 'graphql-request';
import {default as axios} from 'axios';
import {default as util} from 'util';
import {default as fs} from 'fs';
import {default as mongoose} from 'mongoose';
import {schemaVideo} from './models/Video.js'
import {schemaMessage} from './models/Message.js'
import process from 'process'

import { Client, IntentsBitField } from 'discord.js';
import { readFile } from 'fs/promises';

console.log("oui")
const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });
client.login(process.env.TOKEN);
let channel = "";
client.on("ready", () => {
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
    channel = client.channels.cache.get(process.env.CHANNEL_ID);
    channel.send(`Début script ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`);

    /**
     * Connexion à la base mongo
     */
    mongoose
        .connect(process.env.MONGO_URI)
        .then((x) => {
            console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`);
            logger('Connecté à la base');
            getVods().then((res) => {
                logger('Requête récupération VOD twitch effectué');
                loadSong(res);
            });
        })
        .catch((err) => {
            console.error('Erreur de connexion à la base', err)
            logger(`Erreur de connexion à la base ${err}`);
            process.kill(process.pid);
        })
});

const date = new Date();
//channel.send("-----------------------------");
let currentDate = (new Date).toLocaleDateString();
let fileName = `${currentDate.substring(0,2)}${currentDate.substring(3,5)}${currentDate.substring(6,10)}`


/**
 * Fonction de log des messages pour discord
 * @param message
 */
function logger(message) {
    let log = `${date.toLocaleTimeString()} - ${message}`;
    return channel.send(log);
}



/**
 * Récupération de toute les VOD de Tip
 * @return {Promise<unknown>}
 */
function getVods() {
    return new Promise((resolve, reject) => {
        axios.get('https://api.twitch.tv/helix/videos?user_id=123092401&first=100&type=archive',
            {headers: {Authorization: process.env.TOKEN_TWITCH, "Client-ID": process.env.CLIENTID_TWITCH}})
            .then((res) => {
                resolve(res.data.data);
            })
            .catch((err) => {
                //console.log(err);
                logger(`Erreur lors de récupération des vod ${err.response.data.message}`).then(() => {
                    process.kill(process.pid);
                });
               // console.log(err.response.data);


            });
    });
}

/**
 * Traitement des vods
 * @param vods
 * @return {Promise<void>}
 */
async function loadSong(vods) {
        let promise = [];
        let lastDate = new Date(JSON.parse(fs.readFileSync('./lastDate.txt')));
        console.log(lastDate);
        const vodList = vods.filter(vod => new Date(vod.created_at).getTime() > lastDate.getTime() && new Date(vod.created_at).getDay() === 0);
        logger(`Traitement des VOD créé après le ${lastDate}`);
        logger(`Nombre de VOD à traiter : ${vodList.length}`);
        const vods_reverse = vods.reverse();
        let nbVod=0;
        for (let i =0; i< vods_reverse.length; i++) {
            let date = new Date(vods_reverse[i].created_at);
            // Filtrer sur les vods du dimanche
            if(date.getTime() > lastDate.getTime() && date.getDay() === 0) {
                    nbVod++;
                    console.log(vods_reverse[i].created_at);
                    logger(`Traitement de la VOD créé le ${vods_reverse[i].created_at}`);
                    logger(`id twitch ${vods_reverse[i].id}`);
                    let video = new schemaVideo({
                        _id: new mongoose.Types.ObjectId,
                        name: vods_reverse[i].title,
                        thumbnail: vods_reverse[i].thumbnail_url,
                        postedAt: vods_reverse[i].created_at,
                        twitchid: vods_reverse[i].id

                    });
                    let res = await video.save();
                    logger(`Vod créé le ${vods_reverse[i].created_at}, id bdd ${res.id}`)
                    fs.writeFileSync('./lastDate.txt', JSON.stringify(vods_reverse[i].created_at));
                    await loadChat(vods_reverse[i].id, res.id, vods_reverse[i].created_at);
            }
        }

        await mongoose.disconnect();
        logger("-----------------------------").then(()=> {
            process.kill(process.pid);
        });
}

function requestGql(query, client) {
    return new Promise((resolve, reject) => {
        client.request(query).then((res) => {
            resolve(res);
            console.log(res);
        }).catch((err) => {
            console.log("err ");
            logger(`Erreur requête gql : ${err}`);
            logger("```" + query + "```");
        })
    })

}

async function loadChat(videoid, mongoid, vodDate) {
    let messages = [];
    let hasNextPage = true;
    let cursor = null;
    while (hasNextPage) {
        const graphQLClient = new GraphQLClient('https://gql.twitch.tv/gql', {
            headers: {
                'client-ID': process.env.CLIENTIDGQL,
                'Client-Integrity': process.env.CLIENTINTE
            },
        });
        console.log(videoid)
        let query = `
                query {
                  video(id: ${videoid}) {
                    comments(after: ${cursor ? cursor : '""'}) {
                      edges {
                        cursor
                        node {
                          commenter {
                            displayName
                            login
                            displayBadges(channelID: 123092401) {
                              setID
                            }
                          }
                          createdAt
                          contentOffsetSeconds
                          message {
                            fragments {
                              text
                            }
                            userColor
                          }
                        }
                      }
                      pageInfo {
                        hasNextPage
                      }
                    }
                  }
                }
        `


        //const res = await graphQLClient.request(query);
        const res = await requestGql(query, graphQLClient);
        //logger("Requête gql récupération message twitch effectué");
        let comments = res.video.comments.edges;
        hasNextPage = res.video.comments.pageInfo.hasNextPage;
        console.log(hasNextPage)
        messages.push(...comments);
        cursor = comments[0].cursor;
        console.log(cursor);

    };
    let winner = "";
    let francis = ""
    let songTimestamp = [];
    let promises = [];
    console.log("mongoid");
    console.log(mongoid);
    logger("Traitement des messages");
    console.log("Traitement des messages");
    for(let i=0;i<messages.length;i++) {
        console.log("Les messages");
        cursor = messages[i].cursor;
        if (messages[i].node.commenter && messages[i].node.commenter.displayName === 'Robot_Francis' && messages[i].node.message.fragments[0].text.includes('tu peux choisir un morceau')) {
            francis = {
                text: messages[i].node.message.fragments[0].text,
                postedAt: messages[i].node.createdAt,
                offsetSeconds: messages[i].node.contentOffsetSeconds
            }
            winner = messages[i].node.message.fragments[0].text.split(" ")[0];
            winner = winner.slice(1, winner.length);
            let winnerMessages = messages.filter(comment => comment.node.commenter && comment.node.commenter.displayName === winner && comment.node.contentOffsetSeconds >= francis.offsetSeconds);
            let winnerMessageSorted = winnerMessages.map(comment => comment.node.message.fragments).slice(0, 50);
            songTimestamp.push({francis: francis, winner: {winnerMessages: winnerMessageSorted}});

            let message = new schemaMessage({
                _id: new mongoose.Types.ObjectId,
                video: mongoid,
                winner:winnerMessageSorted.flat().map(message => message.text),
                postedAt: winnerMessages[0] && winnerMessages[0].node ? winnerMessages[0].node.createdAt : null,
                offsetSeconds: winnerMessages[0] && winnerMessages[0].node ? winnerMessages[0].node.contentOffsetSeconds : null,
                done: false,
                nickname: messages[i].node.commenter ? messages[i].node.commenter.displayName : ''
            });
           let res = await message.save();
           await schemaVideo.findByIdAndUpdate(mongoid, {$push: {"messages": {_id: res.id}}});
        }
    }
}