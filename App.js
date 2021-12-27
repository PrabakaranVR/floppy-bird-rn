import { React, useState, useEffect } from "react"
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Button } from "react-native-web"
import Bird from "./components/Brid"
import Obstacles from "./components/Obstacles"

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [randomObstacleGap, setRandomObstacleGap] = useState(0)
  const [randomObstacleGapTwo, setRandomObstacleGapTwo] = useState(0)
  const gravity = 3
  const obstaclesWidth = 60
  const obstaclesHeight = 300
  const gap = 200
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  //start bird falling

  useEffect(()=> {
    if(birdBottom > 0){
      gameTimerId = setInterval(()=>{
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return()=>{
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])


  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
    }

  }

//start first obstacle

useEffect(()=>{
  if(obstaclesLeft > -obstaclesWidth){
  obstaclesLeftTimerId = setInterval(()=>{
    setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
  }, 30)
  return()=>{
    clearInterval(obstaclesLeftTimerId)
  }
} else {
  setObstaclesLeft(screenWidth)
  setRandomObstacleGap(-Math.random() * 100)
  setScore(score => score + 1)
}
}, [obstaclesLeft])

//start second obstacle

useEffect(()=>{
  if(obstaclesLeftTwo > -obstaclesWidth){
  obstaclesLeftTimerIdTwo = setInterval(()=>{
    setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
  }, 30)
  return()=>{
    clearInterval(obstaclesLeftTimerIdTwo)
  }
} else {
  setObstaclesLeftTwo(screenWidth)
  setRandomObstacleGapTwo(-Math.random() * 100)
  setScore(score => score + 1)
}
}, [obstaclesLeftTwo])

//check for collisions

useEffect(()=>{
  if(
    ((birdBottom < (randomObstacleGap + obstaclesHeight + 30) || 
    birdBottom > (randomObstacleGap + obstaclesHeight + gap -30))&& 
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
    )
    ||
    ((birdBottom < (randomObstacleGapTwo + obstaclesHeight + 30) || 
    birdBottom > (randomObstacleGapTwo + obstaclesHeight + gap -30))&& 
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
    )
  ){
    console.log('Game over')
    gameOver()
  }
})

const gameOver = () => {
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
  setIsGameOver(true)
}

const newGame = () => {
  setBirdBottom(screenHeight/2)
  setObstaclesLeft(screenWidth)
  setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30)
  setIsGameOver(false)
  setScore(0)
}

  
  return (
  <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
    {isGameOver && <Text>{score}</Text>}
      <Bird
      birdBottom={birdBottom}
      birdLeft={birdLeft} 
      />
      <Obstacles
      color={'green'} 
      randomObstacleGap={randomObstacleGap}
      obstaclesWidth={obstaclesWidth}
      obstaclesHeight={obstaclesHeight}
      obstaclesLeft={obstaclesLeft}
      gap={gap}/>
      <Obstacles 
      color={'yellow'}
      randomObstacleGap={randomObstacleGapTwo}
      obstaclesWidth={obstaclesWidth}
      obstaclesHeight={obstaclesHeight}
      obstaclesLeft={obstaclesLeftTwo}
      gap={gap}/>
     {isGameOver && <Text style={{padding: 10, backgroundColor: 'green', color: 'white'}} onPress={newGame}>New Game</Text>}
    </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
