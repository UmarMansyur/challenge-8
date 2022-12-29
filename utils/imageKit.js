const ImageKit = require('imagekit');

const { 
    PUBLIC_KEY, PRIVATE_KEY, URL_ENDPOINT
 } = process.env;

const imagekit = new ImageKit({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
    urlEndpoint: URL_ENDPOINT
});

module.exports = imagekit;