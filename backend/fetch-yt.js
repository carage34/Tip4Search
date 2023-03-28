import fetch from 'node-fetch';
import {schemaVideo} from './models/Video.js'
import {default as mongoose} from "mongoose";
import {default as axios} from "axios";

const CHANNEL_ID = "UCdCdW2k5265_OXpAy5Nvy2g";
const PUBLISHED_AFTER = "2022-12-01T00:00:00Z";
const MAX_RESULT = 50;
const API_KEY = process.env.YOUTUBE_API;

function getVideos() {
    return new Promise((resolve, reject) => {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULT}&publishedAfter=${PUBLISHED_AFTER}&key=${API_KEY}`)
            .then(res => {
                return res.json()
            }).then(json => {
            let snippet = json.items.map(item => item);
            //console.log(snippet);
            resolve(snippet);
        });
    });
}

function getVods() {
    return new Promise((resolve, reject) => {
        schemaVideo.find().then(video => {
            resolve(video);
        })
            .catch(err => {
                console.log(err);
            })
    });
}

function connectToMongo() {
    return new Promise((resolve, reject) => {
        mongoose
            .connect('mongodb://127.0.0.1:27017/tip4search')
            .then((x) => {
                console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
                resolve();
            })
            .catch((err) => {
                console.error('Erreur de connexion à la base', err.reason)
            })
    })

}

function isVodAvailable(twitchId) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.twitch.tv/helix/videos?id=${twitchId}`, {headers: {Authorization: process.env.TOKEN, "Client-ID": process.env.CLIENTID}})
            .then(res => {
                return res.json()
            })
            .then(json => {
                if(json.error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
    });
}

await connectToMongo();
let videosYt = await getVideos();
let vodTwitch = await getVods();
for(let i=0; i < vodTwitch.length; i++) {
    if(!vodTwitch[i].twitchid) {
        //vodTwitch[i].available = false;
        vodTwitch[i].set({available: false})
    }
    let twitchDateSplit = vodTwitch[i].postedAt.toLocaleDateString();
    let youtubeDateFormat = `(${twitchDateSplit.substring(0, 2)} ${twitchDateSplit.substring(3, 5)} ${twitchDateSplit.substring(8, 10)})`;
    let items = videosYt.filter(item => item.snippet.title.includes(youtubeDateFormat));
    if(items.length > 0) {
        //vodTwitch[i].youtubeid = items[0].id.videoId;
        vodTwitch[i].set({youtubeid: items[0].id.videoId})
    }
    if(vodTwitch[i].twitchid) {
        vodTwitch[i].set({available: await isVodAvailable(vodTwitch[i].twitchid)});
        //vodTwitch[i].available = await isVodAvailable(vodTwitch[i].twitchid);
    }
    await vodTwitch[i].save();
}