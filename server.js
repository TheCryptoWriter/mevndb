const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

const connectionString = "mongodb+srv://davidmcneal28:SL256Tnp@cluster0.xnty7.mongodb.net/advisorCRM?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db('advisorCRM')
        const advisors = db.collection('advisors')
            // ========================
            // Middlewares
            // ========================
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))
            // ========================
            // Routes
            // ========================

        // Read
        app.get('/', (req, res) => {
                advisors.find().toArray()
                    .then(advisors => {
                        res.render('index.ejs', { advisors: advisors })
                    })
                    .catch(error => console.error(error))
            })
            // Create
            //create new advisor listings Needs fixed!!
        app.post('/advisors', (req, res) => {
            advisors.insertMany(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })


        //Update
        app.put('/advisors', (req, res) => {
            advisors.findOneAndUpdate({
                    name: 'David'
                }, {
                    $set: {
                        name: req.body.name,
                        email: req.body.email
                    }
                }, {
                    upsert: true
                })
                .then(result => res.json('Success'))
                .catch(error => console.error(error))
        })


        //Delete
        app.delete('/advisors', (req, res) => {
            advisors.deleteOne({ name: req.body.name })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No advisor to delete')
                    }
                    res.json('Deleted Advisor')
                })
                .catch(error => console.error(error))
        })
    }),


    // ========================
    // Listen
    // ========================
    app.listen(3000, function() {
        console.log('listening on 3000')
    })