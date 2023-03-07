var fs = require('fs');
const tf = require('@tensorflow/tfjs');

const testCovid = async (model,input) => {

    const output = model.predict(tf.tensor2d(input, [1, 20])).arraySync()
    return output;
}

const neuralNetwork = async () => {
    
    var dataSet = fs.readFileSync(__dirname + "/Covid-Dataset.csv", 'utf8');
    var lines = dataSet.split('\r\n');
    var dataArray = [];
    for (var i = 0; i < lines.length; i++) {
    var linea = lines[i].split(',');
    dataArray.push(linea);
    }

    for (var i = 0; i < dataArray.length; i++) {
        for (var j = 0; j < dataArray[i].length; j++) {
            if (dataArray[i][j].toLocaleLowerCase() == 'yes') {
                dataArray[i][j] = 1;
            } else if (dataArray[i][j].toLocaleLowerCase() == 'no') {
                dataArray[i][j] = 0;
            }
        }
    }
    const symtomps = dataArray[0];
    const data = dataArray.slice(1);

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const mixedData = shuffle(data);
    const trainingData = mixedData.slice(0, 500);
    const testingData = mixedData.slice(3500);

    const trainingDataInputs = trainingData.map(t => t.slice(0, t.length - 1));
    const trainingDataOutputs = trainingData.map(t => t[t.length - 1]);

    async function entrena(model,xs,ys){
        const historia = await model.fit(xs, ys, {
            epochs: 1000,
            callbacks: {
                // onEpochEnd: async(epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
            }
        });
    }
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [20], units: 10, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: 10, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));

    model.compile({loss: 'binaryCrossentropy', optimizer: 'adam', metrics: ['accuracy']});
    model.summary();
    const xs = tf.tensor2d(trainingDataInputs, [500, 20]);
    const ys = tf.tensor2d(trainingDataOutputs, [500, 1]);

    await entrena(model,xs ,ys);
    return model
}

module.exports = {
    neuralNetwork,
    testCovid
}
