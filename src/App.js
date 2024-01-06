import { useRef, useState } from 'react';
import { Image } from './components/Image';
import './App.scss';
import { motion, useScroll, useTransform } from "framer-motion"

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}

const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));

export function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

function App() {
  let imageArray = Object.keys(images).map(function (k) { return images[k] });

  const imageNumber = 4
  const randomStart = randomNumber(0, imageArray.length - imageNumber)

  return (
    <div className="App">
      {
        imageArray.slice(randomStart, randomStart + imageNumber).map((image, i) => {
          return (
            <Image index={i} image={image}  />
          )
        })
      }
    </div>
  );
}

export default App;

