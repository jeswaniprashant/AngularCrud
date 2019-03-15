const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUDApi');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Origin', false);
    next()    
})

let UsersSchema = mongoose.Schema({
    name: String,
    address: String
}, {versionKey: false});

let model = mongoose.model('users', UsersSchema, 'users');

app.post('/api/SaveUser', (req, res) => {
    let mod = new model(req.body);
    mod.save((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send({data: 'Record has been inserted'});
        }
    })
})

app.post('/api/UpdateUser', (req, res) => {
    let mod = new model(req.body);
    model.findByIdAndUpdate(req.body._id, { name: req.body.name, address: req.body.address }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send({data: 'Record has been updated'});
        }
    })
})

app.post('/api/deleteUser', (req, res) => {
    model.remove({ _id: req.body.id }, (err) => {
        if(err) {
            res.send(err);
        } else {
            res.send({data: 'Record has been deleted'});
        }
    })
})

app.get('/api/getUser', (req, res) => {
    model.find({}, (err, data) => {
        if(err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

app.listen(8080, () => {
    console.log('Hello There')
});

