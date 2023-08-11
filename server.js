import url from "url";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import next from 'next';
import logger from 'log4js';

const port = parseInt(process.env.PORT || 3000, 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();
const log = logger.getLogger('server');

const start = () => {
  app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json({ limit: '10kb' }));
    server.use(bodyParser.urlencoded({
      extended: true,
      parameterLimit: 100,
      limit: '10kb'
    }));

    server.use(
      session({
        secret: 'j3tSMf4c)H+!Zyb#dw!T*Jq69Jg$r%Fg',
        resave: false,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            secure: true,
            maxAge: 6 * 600000
        }
      })
    )

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
          throw err
      }

      log.info(`> Ready on port ${port}`)
    })
  })
}

start();
