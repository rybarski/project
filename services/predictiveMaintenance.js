// services/predictiveMaintenance.js
const tf = require('@tensorflow/tfjs-node');

let model;

const trainModel = async () => {
  const data = [[100, 1], [150, 2], [200, 3], [250, 4], [300, 5]];
  const xs = tf.tensor2d(data.map(d => [d[0]]));
  const ys = tf.tensor2d(data.map(d => [d[1]]));

  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  await model.fit(xs, ys, { epochs: 100 });
  console.log('Model trained');
};

const predictFailures = async (usageHours) => {
  if (!model) await trainModel();
  const input = tf.tensor2d([[usageHours]]);
  const prediction = model.predict(input);
  const result = await prediction.array();
  return result[0][0];
};

module.exports = { trainModel, predictFailures };
