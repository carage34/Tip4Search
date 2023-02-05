import {GraphQLClient} from 'graphql-request';
import {default as axios} from 'axios';
import {default as util} from 'util';
import {default as fs} from 'fs';
import {default as mongoose} from 'mongoose';
import {schemaVideo} from './backend/models/Video.js'
import {schemaMessage} from './backend/models/Message.js'


//const results = await graphQLClient.request(query);
//console.log(results.video.comments.edges[0].node.message.fragments);

mongoose
    .connect('mongodb://127.0.0.1:27017/tip4search')
    .then((x) => {
        console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
        getVods().then((res) => {
            loadSong(res);
        });
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base', err.reason)
    })


function getVods() {
    return new Promise((resolve, reject) => {
        axios.get('https://api.twitch.tv/helix/videos?user_id=123092401&first=100&type=archive',
            {headers: {Authorization: process.env.TOKEN, "Client-ID": process.env.CLIENTID}})
            .then((res) => {
                resolve(res.data.data);
            });
    });
}

function loadSong(vods) {
    let songs = [];
    let promise = [];
    let lastDate = new Date(JSON.parse(fs.readFileSync('./lastDate.txt')));
    console.log(lastDate);
    const vods_reverse = vods.reverse();
    vods_reverse.forEach((vod) => {
        const date = new Date(vod.created_at);
        if(date.getTime() > lastDate.getTime()) {
            if(date.getDay() === 0) {
                let video = new schemaVideo({
                    _id: new mongoose.Types.ObjectId,
                    name: vod.title,
                    thumbnail: vod.thumbnail_url,
                    postedAt: vod.created_at,

                });
                video.save().then((res) => {
                    console.log("Video ajouté ", res.id)
                    fs.writeFileSync('./lastDate.txt', JSON.stringify(vod.created_at));
                    promise.push(loadChat(vod.id, res.id));
                }).catch((err) => {
                    console.error('Erreur de connexion à la base', err.reason)
                })
            }
        }
    });
    Promise.all(promise).then((values) => {
        mongoose.disconnect();
    });
}

async function loadChat(videoid, mongoid) {
    let messages = [];
    let hasNextPage = true;
    let cursor = null;
    while (hasNextPage) {
        const graphQLClient = new GraphQLClient('https://gql.twitch.tv/gql', {
            headers: {
                'client-ID': process.env.CLIENTIDGQL,
            },
        });

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


        const res = await graphQLClient.request(query);
        let comments = res.video.comments.edges;
        hasNextPage = res.video.comments.pageInfo.hasNextPage;
        messages.push(...comments);
        cursor = comments[0].cursor;

    }
    let winner = "";
    let francis = ""
    let songTimestamp = [];
    messages.forEach((comment) => {
        cursor = comment.cursor;
        if (comment.node.commenter && comment.node.commenter.displayName === 'Robot_Francis' && comment.node.message.fragments[0].text.includes('tu peux choisir un morceau')) {
            francis = {
                text: comment.node.message.fragments[0].text,
                postedAt: comment.node.createdAt,
                offsetSeconds: comment.node.contentOffsetSeconds
            }
            winner = comment.node.message.fragments[0].text.split(" ")[0];
            winner = winner.slice(1, winner.length);
            let winnerMessages = messages.filter(comment => comment.node.commenter && comment.node.commenter.displayName === winner && comment.node.contentOffsetSeconds >= francis.offsetSeconds);
            let winnerMessageSorted = winnerMessages.map(comment => comment.node.message.fragments).slice(0, 5);
            songTimestamp.push({francis: francis, winner: {winnerMessages: winnerMessageSorted}});
            let message = new schemaMessage({
                _id: new mongoose.Types.ObjectId,
                video: mongoid,
                winner:winnerMessageSorted.flat().map(message => message.text)
            });
            message.save().then((res) => {console.log("Message ajouté")}).catch((err) => {
                console.error('Erreur de connexion à la base', err.reason)
            })

        }
    })
    return songTimestamp;
}