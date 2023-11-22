import express from "express";
// import { MongoClient } from 'mongodb';
// const  mongoose = require('mongoose');
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';
import marked from 'marked';

const body = require('body-parser');
import {logger, setHeaders, sendOld} from './controllers/commonControllers';
import api_router from "./routes/apiRouter";

// const expressSwaggerGenerator = require("express-swagger-generator");
// import options from "./swagger-options";

async function start()
{
    try
    {
        const app = express();
        const PORT = process.env.PORT || 3000;

        // const url = 'mongodb://0.0.0.0/hotelbooking';
        // mongoose.connect(url);
        // const conn = mongoose.connection;

        // conn.once('open' , () => {
        //     console.log('success db connected');
        // });
        // conn.on('error', (err) => {
        //     console.log('error connecting to db');
        //     process.exit();
        // })

        // const mongo = await MongoClient.connect('mongodb://0.0.0.0/hotelbooking');

        // await mongo.connect();

        // app.db = mongo.db();


        //body parser
        app.use(logger);
        // app.use(setHeaders);
        app.use(body.text());
        app.use(body.json());
        
        // Routes
       
        // const expressSwagger = expressSwaggerGenerator(app);
        // expressSwagger(options);

        const swaggerDocument = YAML.load(path.resolve('.') + '/hotelbooking.yaml');

        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.use('/api/v1', api_router);

        app.use("/old", sendOld);

        app.get('/readme', function(_req, res) {
            const file = fs.readFileSync(path.resolve('.') + '/README.md', 'utf8');
            res.send(marked.parse(file.toString()));
        });
        
        // Start server 
        app.listen(PORT, () => {
            console.log(
                `Server is running on port: http://localhost:${PORT}`);
        });
    }
    catch(error)
    {
        console.log(error); 
    }
}

start();