import React from "react";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from "framer-motion"
import { randomNumber } from "../App";

export function Image({ image, index }) {
  const isBrowser = () => typeof window !== "undefined"
  const windowHeight = isBrowser() && window.screen.height
  const windowWidth = isBrowser() && window.screen.width
  
  const imgRef = useRef(null);
  const [imgWidth, setimgWidth] = useState(0)
  const [imgHeight, setimgHeight] = useState(randomNumber(2, 10) / 10)
  const [scaleFactor, setscaleFactor] = useState(randomNumber(2, 10) / 10)
  const height = randomNumber(windowHeight*0.2, windowHeight*1.1)

  const { scrollYProgress } = useScroll();
  
  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleFactor, 1, 1-scaleFactor]
  )

  const scrollblur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [90, 90, 90]
  )

  useEffect(() => {
    setTimeout(() => {
      setimgWidth(imgRef.current.clientWidth)
      setimgHeight(imgRef.current.clientHeight)
      console.log(imgHeight);
    }, 100);
  }, [])


  const imgStyle = {
    height: height + "px",
    left: randomNumber(-100, windowWidth - imgWidth) + "px",
    top: randomNumber(-100, windowHeight - (imgHeight * scrollScale)) + "px",
    filter: "blur(" + index * 10 + "px)",
    // filter: index == (0 || 1 || 4) ? "blur(0px)" : "blur(" + scrollblur + "px)",
    scale: scrollScale
  }

  return (
    <motion.img
      // variants={container}
      // initial="start"
      ref={imgRef}
      start={{
        width: randomNumber(200, 700) + "px"
      }}
      whileHover={{
        filter: "blur(0px)"
      }}
      // animate={{ width: randomNumber(200, 700) + "px" }}
      // transition={{ repeat: Infinity, repeatType: "reverse", duration: 100 }}
      style={imgStyle} src={image} alt="" />
  )
}
