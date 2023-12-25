import SmokeMachine from '@bijection/smoke'
import { useEffect, useRef } from 'react'

const Smoke = ({width , height}) => {
const canvas  = useRef(null)



  useEffect(() => {
    if(canvas) emitSmoke(canvas);

  }  , []) ;

  function emitSmoke({current : $canvas}) {
    console.log($canvas) 

    const context = $canvas.getContext('2d')

    // const context = canvas
    const party =  SmokeMachine(context , [190,190,190]) ; 

     party.start() // start animating
     party.setPreDrawCallback(function(dt){
           // want to fill in 5 units along width of section x direction 
           // 
         for(let i = 0 ; i <=150 ; i++) {
             let o = Math.random() * 600 + i
             party.addSmoke(i * 20 ,o, 0.002)
         }
         
     })
   }
    return (
        <>
        <canvas  width={width} height={height} className='smoke' ref={canvas} id="canvas"></canvas>
        </>
    )
}

export default Smoke ; 