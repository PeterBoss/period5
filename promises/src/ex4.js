function stringManipulator(sentence, delay) {
    const words = sentence.split(' ');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                upperCased: sentence.toUpperCase(),
                msgLength: sentence.length,
                asJson: () => new Promise((resolve, reject) => {
                    resolve(JSON.stringify({ words }));
                })
            });
        }, delay);
    });
};

stringManipulator("JavaScript is cool, even when it sucks", 1000)
    .then(data => {
        console.log("From first promise: " + data.upperCased);
        console.log("From first promise: " + data.msgLength);
        return data.asJson()
    })
    .then(res => {
        console.log("From second promise: " + res)
    });