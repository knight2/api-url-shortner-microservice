'use strict';
var Counters = require('../models/counters.js');
var UrlEntries = require('../models/urlEntries.js');
var dns = require('dns');


//counter function for shorturl
function getCountandIncrease(req, res, callback){
    Counters.findOneAndUpdate({}, {$inc:{'count': 1}}, function(err, data){
        if (err) return;
        if (data){
            callback(data.count);
        } else{
            var newCounter = new Counters();
            newCounter.save(function(err){
                if(err) return;
                Counters.findOneAndUpdate({}, {$inc:{'count': 1}}, function(err, data){
                    if (err) return;
                    callback(data.count);
                });
            });
        }
    });
}

//search string to have 'https' at the start, with a ':', '//', and a '.'
var urlProtocolExpession = /^https?:\/\/(.*)/i;

exports.addUrl = function(req, res){

    var submittedUrl = req.body.url;

    // regex to remove '/' from end of urls if it is last character
    if (submittedUrl.match(/\/$/i)){
        submittedUrl = submittedUrl.slice(0,-1);
    }

    //check if url matches requirements
    if (submittedUrl.match(urlProtocolExpession) == null){
        console.log(submittedUrl.match(urlProtocolExpession));
        console.log('invalid url format');
        return res.json({'error': 'Invalid url format'})
    }
    else 
    {//url is correct format
        console.log('correct url format');
        console.log(submittedUrl.match(urlProtocolExpession));

        //check dns of host
        dns.lookup(submittedUrl.match(urlProtocolExpession)[1], function(err, address){
            console.log('inside dns');

            if (err){//invalid hostname
                console.log('invalid' + ', address: ' + address + ' error: ' + err);
                res.json({'error': 'invalid hostname'});
            }
            else{//valid
                console.log('valid, address: ' + address + ' error: ' + err);
                UrlEntries.findOne({'url': submittedUrl}, function(err, storedUrl){
                    console.log('inside urlentires');
                    if(err) return;
                    if (storedUrl){
                        console.log('url is stored previously');
                        //url is inside database, send info
                        res.json({'original_url': submittedUrl, "short_url": storedUrl.index});
                    }
                    else{
                        console.log('not previously stored');
                        //increase shorturl number and store url
                        getCountandIncrease(req, res, function(cnt){
                            console.log('inside getcount call');
                            var newUrlEntry = new UrlEntries({
                                'url': submittedUrl,
                                'index': cnt
                            });

                        //return data
                        newUrlEntry.save(function(err){
                            console.log('inside save');
                            if(err) return;
                            res.json({"original_url": submittedUrl, "short_url": cnt});
                        });
                        });
                    }
                });
            }
        });
    }
};

exports.processShortUrl = function(req, res){
    res.json({processShortUrl: "Incomplete"});
};