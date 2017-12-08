#!/usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const prompt = require('prompt');

const now = new Date();

let title = '';
let tags = [];
let newdirtitle = '';
let newdirectory = '';

function promptForTitle() {
  return new Promise((resolve, reject) => {
    prompt.message = '📖';
    prompt.delimiter = '  ';
    prompt.start();

    const params = {
      properties: {
        title: {
          message: 'Title of the new post',
          required: true
        },
        tags: {
          message: 'Comma separated tags'
        }
      }
    };

    prompt.get(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        title = result.title;
        tags = result.tags;
        resolve();
      }
    });
  });
}

function buildDirectory() {
  const date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
  newdirtitle = `${date}-${hyphenate(title)}`;
  newdirectory = directory(newdirtitle);

  return new Promise((resolve, reject) => {
    mkdirp(newdirectory, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function writeFile() {
  const data = `---
title: ${title}
date: ${getLocalISO(now)}
tags: ${tags.length > 0 && yamlizeTags()}
layout: post
---

type something smart here
`

  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(newdirectory, 'index.md'), data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

function directory(newdir) {
  return path.join(process.cwd(), 'src', 'pages', newdir);
}

// credit https://goo.gl/Ss9T1v
function getLocalISO(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };
  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}

function hyphenate() {
  return title.split(' ').map(word => {
    return word.toLowerCase()
  }).join('-');
}

function yamlizeTags() {
  const sep = `\n  - `;
  const list = tags.split(',').map(tag => {
    return tag.replace(/\s/g,'');
  })
  .join(sep);
  return `${sep}${list}`;
}

promptForTitle()
  .then(buildDirectory)
  .then(writeFile)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .then(() => {
    console.log(`New post ready at src/pages/${newdirtitle}/index.md`);
    process.exit(0);
  });
