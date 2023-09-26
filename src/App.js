import logo from './logo.svg';
import './App.css';
import { TransformWrapper, TransformComponent, useTransformContext } from "react-zoom-pan-pinch";
import { useEffect, useState, useRef } from 'react';

function App() {
  const [positionFirst, setPositionFirst] = useState({scale: 1, positionX: 0, positionY: 0})
  const [positionSecond, setPositionSecond] = useState({scale: 1, positionX: 0, positionY: 0})

  const whichIsTransform = useRef('first')

  const handleTransformedFirst = (ref, e) => {
    if(whichIsTransform.current !== 'first')  return
    setPositionSecond(e)
  }

  const handleTransformedSecond = (ref, e) => {
    
    if(whichIsTransform.current !== 'second')  return
    setPositionFirst(e)
    
  }

  const handlePanning = (e, pan) => {
    console.log(e)
    if(pan === '1') whichIsTransform.current = 'first'
    else if(pan === '2') whichIsTransform.current = 'second'
  }

  const handleWheel = (pan) => {
    
    if(pan === '1') whichIsTransform.current = 'first'
    if(pan === '2') whichIsTransform.current = 'second'
    
  }
  
  return (
    <div className="App">
      <TransformWrapper
        onTransformed={handleTransformedFirst}
        onPanning={(ref, e) => handlePanning(e,'1')}
        onWheel={(ref, e) => handleWheel('1')}
      >
        <TransformFirst 
          position={positionFirst}
        />
      </TransformWrapper>
      <TransformWrapper
        onTransformed={handleTransformedSecond}
        onPanning={(ref, e) => handlePanning(e,'2')}
        onWheel={(ref, e) => handleWheel('2')}
      >
        <TransformSecond 
          position={positionSecond}
        />
      </TransformWrapper>
    </div>
  );
}

export default App;

function TransformFirst({position}){
  const { setTransformState } = useTransformContext()
  
  useEffect(() => {
    if(!position) return
    const {scale, positionX, positionY} = position
    setTransformState(scale, positionX, positionY)
  },[position])

  return(
    <TransformComponent>
      <img 
        src="logo512.png" 
        alt="test" 
        style={{
          width: '500px',
          height: '500px'
        }}
      />
    </TransformComponent>
  )
}

function TransformSecond({position}){
  const { setTransformState } = useTransformContext()
  
  useEffect(() => {
    console.log(position)
    if(!position) return
    const {scale, positionX, positionY} = position
    setTransformState(scale, positionX, positionY)
  },[position])

  return(
    <TransformComponent>
      <img 
        src="logo512.png" 
        alt="test" 
        style={{
          width: '500px',
          height: '500px'
        }}
      />
    </TransformComponent>
  )
}

