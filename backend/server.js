import {default as bodyParser} from 'body-parser';
import {default as cors} from 'cors';
import {default as mongoose} from 'mongoose';
import {default as express} from 'express';
import {messageRouter} from './routes/message.route.js'
import {videoRouter} from './routes/video.route.js'
import {songRouter} from './routes/song.route.js'

// Connexion à mongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/tip4search')
    .then((x) => {
        console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base', err.reason)
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