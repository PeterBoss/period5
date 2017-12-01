const express = require('express')
const crypto = require('crypto')
const app = express()
const PORT = 3000

let secureRandoms = {
    title: '6 secure Randoms',
    randoms: []
}

function makeSecureRandom(size) {
    return new Promise((resolve, reject) => {
        const random = crypto.randomBytes(size).toString('hex');
        resolve({
            length: random.length,
            random
        });
    });
};

function doTheThing(callback) {
    let resultObject = {
        "title": "6 secure Randoms",
        "randoms": []
    };

    let promises = [];
    for (let i = 48; i > 0; i -= 8) {
        promises.push(makeSecureRandom(i / 2));
    }


    Promise.all(promises).then(values => {
        console.log(values);
        resultObject.randoms.push(values);
        callback(resultObject);
    });
}

doTheThing((res) => {
    console.log(res)
})

app.get('/api/securerandoms', (req, res) => {
    stuff((resultObject) => {
        res.json(resultObject);
    });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
