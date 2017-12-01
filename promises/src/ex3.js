const express = require('express');
const app = express();
const PORT = 3000;
const fetch = require('node-fetch');

const baseUrl = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const albumIds = ['1', '3', '5', '7', '9'];

getAlbumById = (id, words) => {
    return new Promise((resolve, reject) => {
        fetch(baseUrl.concat(id)).then(res => res.json())
            .then((res) => {
                resolve({
                    albumId: id,
                    album: res
                        .filter(item => item.title.split(' ').length === words)
                        .map(item => {
                            return { id: item.id, title: item.title };
                        })
                });
            });
    });
};

let promises = [];
for (let i = 0; i < albumIds.length; i++) {
    promises.push(getAlbumById(albumIds[i], 3));
}

app.get('/api/albumthreewords', (req, res) => {
    let promises = [];
    for (let i = 0; i < albumIds.length; i++) {
        promises.push(getAlbumById(albumIds[i], 3));
    }
    Promise.all(promises).then(values => res.json(values));
});

app.get('/api/albums/:words', (req, res) => {
    const words = parseInt(req.params['words']);
    let promises = [];
    for (let i = 0; i < albumIds.length; i++) {
        promises.push(getAlbumById(albumIds[i], words));
    }
    Promise.all(promises).then(values => res.json(values.filter(item => item.album.length > 0)));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));