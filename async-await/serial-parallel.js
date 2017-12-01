const fetch = require('node-fetch');
const now = require('performance-now');
const URL = 'https://swapi.co/api/people/';

async function fetchPerson(url) {
    const response = await fetch(url);
    const person = await response.json();
    return person;
}


async function printNamesSerial() {
    console.log("Start Serial");
    const person1 = await fetchPerson(URL + 1);
    const person2 = await fetchPerson(URL + 2);
    console.log(person1.name);
    console.log(person2.name);
    console.log("End Serial");
}


async function printNamesParallel() {
    console.log("Start Parallel");
    const peopleProm = [fetchPerson(URL + 1), fetchPerson(URL + 2)];
    const people = await Promise.all(peopleProm);
    console.log(people[0].name);
    console.log(people[1].name);
    console.log("End Parallel");
}

async function demo() {
    var startTime = now();
    await printNamesSerial();
    var endTime = now();
    console.log((endTime - startTime).toFixed(3))
    startTime = now();
    await printNamesParallel();
    endTime = now();
    console.log((endTime - startTime).toFixed(3))
}

demo();