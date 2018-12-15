'use strict';
var Counters = require('../models/counters.js');
var UrlEntries = require('../models/urlEntries.js');
var dns = require('dns');



exports.addUrl = function(req, res){

    var submittedUrl = req.body.url;

    // regex to remove '/' from end of urls if it is last character
    if (submittedUrl.match(/\/$/i)){
        submittedUrl = submittedUrl.slice(0,-1);
    }

    res.json({addUrl: "Incomplete"});
};

exports.processShortUrl = function(req, res){
    res.json({processShortUrl: "Incomplete"});
};