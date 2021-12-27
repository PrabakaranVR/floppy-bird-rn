import React from 'react'
import { View } from 'react-native'

const obstacles = ({color, 
    obstaclesLeft, 
    obstaclesWidth, 
    obstaclesHeight,
    randomObstacleGap,
    gap,
}) =>{

    return(
        <>
        <View style={{
        position: 'absolute',
        backgroundColor: color,
        width: obstaclesWidth,
        height: obstaclesHeight,
        left: obstaclesLeft,
        bottom: randomObstacleGap + obstaclesHeight + gap,
    }}
        />
        <View style={{
        position: 'absolute',
        backgroundColor: color,
        width: obstaclesWidth,
        height: obstaclesHeight,
        left: obstaclesLeft,
        bottom: randomObstacleGap,
    }}
        />
        </>
    )
}

export default obstacles