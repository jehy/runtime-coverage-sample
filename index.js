'use strict';

const express = require('express');
const runtimeCoverage = require('runtime-coverage');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/startCoverage', async (req, res) => {
  await runtimeCoverage.startCoverage();
  res.send('coverage started');
});


app.get('/getCoverage', async (req, res) => {

  const options = {
    all: req.query.all,
    return: true,
    reporters: [req.query.reporter || 'text'],
  };
  const coverage = await runtimeCoverage.getCoverage(options);
  const data = Object.values(coverage)[0];
  res.end(data);
});

app.get('/getCoverageWithStream', async (req, res) => {

  const options = {
    all: req.query.all,
    return: true,
    stream: true,
    reporters: [req.query.reporter || 'text'],
  };
  const coverage = await runtimeCoverage.getCoverage(options);
  const stream = Object.values(coverage)[0];
  stream.pipe(res);
});


app.get('/getCoverageWithNodeModules', async (req, res) => {
  const options = {
    all: req.query.all,
    return: true,
    stream: true,
    exclude: ['**/node_modules/runtime-coverage/**', '**/collect-v8-coverage/**'],
    reporters: [req.query.reporter || 'text'],
  };
  const coverage = await runtimeCoverage.getCoverage(options);
  const stream = Object.values(coverage)[0];
  stream.pipe(res);
});

app.listen(3000);
