const mongoose = require('mongoose');

const VERSION = process.env.SOURCE_VERSION || "localhost";

module.exports = {
    index(req, res) {
        res.status(200).json({api_version: process.env});
    }
};