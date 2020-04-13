var express = require('express');
var Stream = require('../models/Streams');
const router = express.Router();

//GET request
router.get("/", async(req, res) => {
    await Stream.find({})
    .then( response => {
        res.status(200);
        res.send( response );
    })
    .catch(error => {
        res.status(400);
        res.send({ error: error})
    })
});

//EDIT Stream GET request 
router.get("/edit/:id", async(req, res) => {
    console.log('edit request id',req.params.id)
    await Stream.find({ _id: req.params.id})
    .then( response => {
        res.status(200);
        res.send( response );
    })
    .catch(error => {
        res.status(400);
        res.send({ error: error})
    })
});

//PATCH request
router.patch("/edit/:id", async(req, res) => {
    var editStreamDetails = req.body;
    await Stream.findOneAndUpdate(
        { _id: req.params.id},
        editStreamDetails
    )
    .then( response => {
        res.status(200);
        res.send( response );
    })
    .catch(error => {
        res.status(400);
        res.send({ error: error})
    })
});

//DELETE request
router.delete("/:id", async(req, res) => {
    var deleteStreamDetails = req.params.id;
    await Stream.deleteOne(
       { _id: deleteStreamDetails }
    )
    .then( response => {
        res.status(200);
        res.send( response );
    })
    .catch(error => {
        res.status(400);
        res.send({ error: error})
    })
});

//POST request
router.post("/", async(req,res) => {
    try {
        console.log("in POST request", req.body);
        var streamDetails = req.body;
        await Stream.create(streamDetails)
        .then( response => {
            //console.log("response", response)
            res.status(200);
            res.send( response );
        })
        .catch( error => {
            throw new Error(error.errmsg);
        });
    }
    catch(error) {
        res.status(400);
        res.send({ error: error.message });
    }
});

module.exports = router;