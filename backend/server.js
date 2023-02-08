import {default as bodyParser} from 'body-parser';
import {default as cors} from 'cors';
import {default as mongoose} from 'mongoose';
import {default as path} from 'path';
import {default as express} from 'express';
import {messageRouter} from './routes/message.route.js'

// Connexion à mongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/tip4search')
    .then((x) => {
        console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base', err.reason)
    })

// Configuration des routes et des ports
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(cors())
app.use('/messages', messageRouter);
app.use('/api', (req, res) => {
    res.send("api working");
})

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Connecté au port ' + port)
});