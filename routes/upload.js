var express = require('express');
const Multer = require('multer');
const format = require('util').format;
var Stream = require('../models/Streams');
const router = express.Router();
const path = require('path');
const {Storage} = require('@google-cloud/storage');

//Upload POST request
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const storage = new Storage({
  keyFilename: path.join(__dirname,'../R6Bet-7e53bf66b10d.json'),
  projectId:  "r6bet-267405"
});

// A bucket is a container for objects (files).
const bucket = storage.bucket('r6-episodes');
  
router.post("/:id",multer.single('stream-file'), async(req,res,next) => {
    try {
      console.log("in upload POST request", req.file);
      console.log('params', req.params)
    
      if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
      }
    
      res.status(200);
      res.send({ message: 'file is being uploaded' });

      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();
    
      blobStream.on('error', (err) => {
        console.log('error', err)
        next(err);
      });
    
      blobStream.on('finish', async() => {
        console.log("finished")
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(`https://storage.cloud.google.com/r6-episodes/${blob.name}`);
        console.log('url',publicUrl);

        await Stream.findOneAndUpdate({
          _id: req.params.id
        },
        {
          stream_url: publicUrl
        })
      });
    
      blobStream.end(req.file.buffer);
      console.log('exiting blob ')
    }
    catch(error) {
        res.status(400);
        res.send({ error: error.message });
    }
});

module.exports = router;