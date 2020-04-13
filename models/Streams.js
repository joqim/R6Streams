var mongoose = require('mongoose');

const streamSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        title: {
            index: true,
            required: true,
            unique: true,
            type: String 
        },
        stream_url: {
            type: String,
            default : ""
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("Stream", streamSchema);