var fs = require('fs');
const { NeuralNetwork } = require('brain.js');
const testCovid = async (net,input) => {
    // const weightsAndBiases = require('../utils/weightsCovid.json');
    // const weight1 = weightsAndBiases.weight1
    // const weight2 = weightsAndBiases.weight2
    // const bias1 = weightsAndBiases.bias1
    // const bias2 = weightsAndBiases.bias2

    // console.log(weight1);
    const output = net.run(input);
    return output;
}


const neuralNetwork = async () => {
   
    var dataSet = fs.readFileSync(__dirname.replace(/\\/g, '/')+'/Covid-Dataset.csv', 'utf8');
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

    const prueba = testingData[0]
    const pruebaInputs = prueba.slice(0, prueba.length - 1);
    const pruebaOutputs = prueba[prueba.length - 1];

    const modifyData = (data) => {
        return data.map(d => {
            return {
                input: d.slice(0, d.length - 1),
                output: [d[d.length - 1]]
            }
        });
    }
    const dataModify = modifyData(trainingData);
    const net = new NeuralNetwork({
        activation: 'sigmoid', // activation function
        learningRate: 0.6, // global learning rate, useful when training using streams
    });
    net.train(dataModify);
    // const output = net.run(pruebaInputs);
    return net;
}

module.exports = {
    neuralNetwork,
    testCovid
}
// neuralNetwork();