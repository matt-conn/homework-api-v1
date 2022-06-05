const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const PORT = 8000;

const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URI;

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(cors())

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('100devs')
        const homeworkColl = db.collection('homework')

        // add class object to mongodb
        // homeworkColl.insertMany(classes)

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })
        
        app.get('/api/class:classNum', (req, res) => {
            // if no params, return all classes
            if(!req.params) {
                homeworkColl.find().toArray()
                .then(results => {
                    res.json(results)
                })
                .catch(error => console.log(error))
            }        
            
            // return specific 100Devs class
            const classNumIndex = parseInt(req.params.classNum) - 1;
        
            homeworkColl.find().toArray()
                .then(results => {
                    res.json(results[classNumIndex])
                })
                .catch(error => console.log(error))
        })
        
        app.listen(process.env.PORT || PORT, () => {
            console.log(`The server is now running on port ${PORT}. Go catch it!`)
        })
    })
    .catch(error => console.log(error))