'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise(resolve => {
    let currentPos = startPos;
    img.style.left = currentPos + img.width;

    const interval = setInterval(() => {
      if (currentPos < stopPos - img.width) {
        currentPos += STEP_SIZE_PX;
        img.style.left = parseInt(img.style.left, 10) + STEP_SIZE_PX + 'px';
      } else {
        clearInterval(interval);
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise(resolve => {
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  walk(img, startPos, centerPos)
    .then(() => {
      return dance(img);
    })
    .then(() => {
      return walk(img, centerPos, stopPos);
    })
    .then(() => {
      catWalk();
    })
    .catch(error => {
      console.log(error);
    });
}

window.addEventListener('load', catWalk);
