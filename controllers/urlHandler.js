'use strict';
var Counters = require('../models/counters.js');
var UrlEntries = require('../models/urlEntries.js');
var dns = require('dns');


//search string to have 'https' at the start, with a ':', '//', and a '.'
var urlProtocolExpession = /^https?:\/\/(.*)/i;

exports.addUrl = function(req, res){

    var submittedUrl = req.body.url;

    // regex to remove '/' from end of urls if it is last character
    if (submittedUrl.match(/\/$/i)){
        submittedUrl = submittedUrl.slice(0,-1);
    }

    if (submittedUrl.match(urlProtocolExpession) == null){
        console.log(submittedUrl.match(urlProtocolExpession));
        console.log('invalid url format');
        return res.json({'error': 'Invalid url format'})
    }
    else 
    {
        console.log('correct url format');
        console.log(submittedUrl.match(urlProtocolExpession));
        dns.lookup(submittedUrl.match(urlProtocolExpession)[1], function(err, address){
            console.log('inside dns');

            if (err){
                console.log('invalid' + ', address: ' + address + ' error: ' + err);
                res.json({'error': 'invalid hostname'});
            }
            else{
                console.log('valid, address: ' + address + ' error: ' + err);
                res.json('valid address: ' + address);
            }
        });
    }
};

exports.processShortUrl = function(req, res){
    res.json({processShortUrl: "Incomplete"});
};