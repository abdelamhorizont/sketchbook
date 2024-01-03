import './App.scss';
import { motion } from "framer-motion"

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images
}

const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));

function randomNumber(min, max) { // min and max included
  return (
    Math.floor(Math.random() * (max - min + 1) + min)
  )
}

function App() {
  const isBrowser = () => typeof window !== "undefined"
  const windowHeight = isBrowser() && window.screen.height
  const windowWidth = isBrowser() && window.screen.width

  let imageArray = Object.keys(images).map(function (k) { return images[k] });
  console.log(images);
  
  const container = {
    start: { rotate: 0 },
    move: {
      rotate: 90,
      transition: { repeat: Infinity, duration: 2 }
    }
  }

  return (
    <div className="App">
      {
        imageArray.slice(0,15).map((image) => {
          const imgStyle = {
            width: randomNumber(200, 700) + "px",
            left: randomNumber(-100, windowWidth - 200) + "px",
            top: randomNumber(-100, windowHeight - 200) + "px",
          }

          return (
            <motion.img
              // variants={container}
              // initial="start"
              start={{ width: randomNumber(200, 700) + "px" }}
              animate={{ width: randomNumber(200, 700) + "px" }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 100 }}
              style={imgStyle}
              src={image}
              alt="" />
          )
        })
      }
    </div>
  );
}

export default App;
