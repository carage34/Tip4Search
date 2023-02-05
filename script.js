import {GraphQLClient} from 'graphql-request';
import {default as axios} from 'axios';
import {default as util} from 'util';
import {default as fs} from 'fs';

//const results = await graphQLClient.request(query);
//console.log(results.video.comments.edges[0].node.message.fragments);
console.log(process.env.TOKEN);
getVods().then((res) => {
    loadSong(res);
})

function getVods() {
    return new Promise((resolve, reject) => {
        axios.get('https://api.twitch.tv/helix/videos?user_id=123092401&first=100&type=archive&sort=time',
            {headers: {Authorization: process.env.TOKEN, "Client-ID": process.env.CLIENTID}})
            .then((res) => {
                resolve(res.data.data);
            });
    });
}

function loadSong(vods) {
    let songs = [];
    let promise = [];

    vods.forEach((vod) => {
        const date = new Date(vod.created_at);
        if(date.getDay() === 0) {
            console.log(vod);
            promise.push(loadChat(vod.id));
        }
    });
    Promise.all(promise).then((values) => {
        values.forEach(value => {
            songs.push(...value);
        });
        fs.appendFileSync('./store.json', JSON.stringify(songs));
    });
}

async function loadChat(videoid) {
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
            songTimestamp.push({francis: francis, winner: {winnerMessages: winnerMessageSorted}})
        }
    })
    return songTimestamp;
}