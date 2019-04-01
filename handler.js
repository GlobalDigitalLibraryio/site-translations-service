'use strict';
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json({ type: 'application/json' }));

server.get('/:language', (req, res) => {
  try {
    const trans = require(`./gdl/${req.params.language}.messages.json`);
    res.status(200).json({ [req.params.language]: trans });
  } catch (error) {
    res
      .status(404)
      .json(`Could not find translations for ${req.params.language}`);
  }
});

const app = serverless(server);

// https://github.com/FidelLimited/serverless-plugin-warmup
module.exports.translations = async (event, context) => {
  // check if we get a warm up event
  if (event.source === 'serverless-plugin-warmup') {
    return {
      statusCode: 200,
      body: 'Warm up assistant-service'
    };
  }
  return app(event, context);
};
