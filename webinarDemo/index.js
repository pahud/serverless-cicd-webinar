'use strict';

console.log('Loading function');

var return400 = (callback) => {
    callback(null, {
        statusCode: '400',
        body: 'got 400 error',
        headers: {
            'Content-Type': 'application/json',
        }  
    })
}

var return500 = (callback) => {
    callback(null, {
        statusCode: '500',
        body: 'got 500 error',
        headers: {
            'Content-Type': 'application/json',
        }  
    })
}

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var version = '1.0.1'
    var err = null

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    switch (event.path) {
        case '/version':
            console.log('got version')
            done(err, {version: version})
            break;
        case '/return400':
            console.log('got /return400')
            return400(callback)
            break;
        case '/return500':
            console.log('got /return500')
            return500(callback)
            break;
        default:
            console.log('got default')
            done(err, {version: version})
    }

};
