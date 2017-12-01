const fetch = require('node-fetch');

function getPlanetforFirstSpeciesInFirstMovieForPerson(id) {
    fetch(`https://swapi.co/api/people/${id}/`).then(res => res.json())
        .then((res) => {
            console.log(`Name: ${res.name}`);
            fetch(findFirst(res.films)).then(res => res.json())
                .then((res) => {
                    console.log(`Film: ${res.title}`);
                    fetch(findFirst(res.species)).then(res => res.json())
                        .then((res) => {
                            console.log(`Species: ${res.name}`);
                            fetch(res.homeworld).then(res => res.json())
                                .then((res) => {
                                    console.log(`Homeworld: ${res.name}`);
                                });
                        });
                });
        });
}

function findFirst(arr) {

    let res = undefined;
    let resId = undefined;

    arr.forEach((item) => {
        const items = item.split('/');
        const itemId = parseInt(items[items.length - 2]);

        if (items.length <= 2) {
            return;
        }
        if (res === undefined || resId == undefined) {
            res = item;
            resId = itemId;
            return;
        }

        if (itemId < resId) {
            res = item;
            resId = itemId;
        }

    });

    return res;
}

getPlanetforFirstSpeciesInFirstMovieForPerson(1);