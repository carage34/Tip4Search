import {default as bodyParser} from 'body-parser';
import {default as cors} from 'cors';
import {default as mongoose} from 'mongoose';
import {default as express} from 'express';
import {messageRouter} from './routes/message.route.js'
import {videoRouter} from './routes/video.route.js'
import {songRouter} from './routes/song.route.js'

import { Client, IntentsBitField } from 'discord.js';
import { readFile } from 'fs/promises';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.login(process.env.TOKEN);
client.on("ready", () => {
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
    client.channels.cache.get(process.env.CHANNEL_ID).send("test");
});


// Connexion à mongoDB
mongoose
    .connect(`mongodb://mongodb:27017`, {user: `${process.env.DB_USER}`, pass: `${process.env.DB_PASSWORD}`, dbName: `${process.env.DB_NAME}`})
    .then((x) => {
        console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base', err)
    });

let corsParam = {
    credentials: true,
    origin: "http://localhost:4200",
};

// Configuration des routes et des ports
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors(corsParam));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use('/api/messages', messageRouter);
app.use('/api/videos', videoRouter);
app.use('/api/songs', songRouter);
app.use('/api', (req, res) => {
    res.send("api working");
})

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Connecté au port ' + port)
});
