'use strict';
var Counters = require('../models/counters.js');
var UrlEntries = require('../models/urlEntries.js');
var dns = require('dns');

exports.addUrl = function(req, res){
    res.json({addUrl: "Incomplete"});
};

exports.processShortUrl = function(req, res){
    res.json({processShortUrl: "Incomplete"});
};