import { useState, useEffect, useRef, useCallback } from 'react'
import Square from './Square.jsx'
import useWindowDimensions from './useWindowDimensions.jsx';

const SQUARE_DIMENSIONS = 100

function Arena() {


    const { height, width } = useWindowDimensions();

    let aHeight = height * .9
    let aWidth = width * .95

    const [x1, setX1] = useState(10)
    const [y1, setY1] = useState(0)
    const [x2, setX2] = useState(aWidth - SQUARE_DIMENSIONS)
    const [y2, setY2] = useState(aHeight - SQUARE_DIMENSIONS)
    
    const x1Ref = useRef(x1);
    const y1Ref = useRef(y1);
    const x2Ref = useRef(x2);
    const y2Ref = useRef(y2);

    //binds key presses to the document
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            
            switch(key) {
                case 'ArrowLeft':
                    if(x1 > 0) {
                        document.getElementById('a').setAttribute('x-1', x1Ref.current - 1) 
                        x1Ref.current = x1Ref.current - 1
                        console.log(x1Ref.current)
                    }
                    break;
                case 'ArrowUp':
                    console.log(key)
                    break;
                case 'ArrowDown':
                    console.log(key)
                    break;
                case 'ArrowRight':
                    x1 < aWidth - 100 && x1Ref.current++
                    console.log(x1Ref.current)
                    break;
                case 'a':
                    console.log(key)
                    break;
                case 'w':
                    console.log(key)
                    break;
                case 's':
                    console.log(key)
                    break;
                case 'd':
                    console.log(key)
                    break;
                default:
                    break;
            }
        }
        document.addEventListener('keydown', handleKeyDown, true);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    
    }, []);

    useEffect(() => {
        console.log('hey')
        setX1(x1Ref.current)
    }, [x1Ref.current])

    const updatePositionState = useCallback(() => {
        console.log('hey')
        setX1(x1Ref.current)
    }, [x1Ref.current]);

  return (
    <div id="a" className="arena" ref={updatePositionState}>
        <Square
            dimensions={SQUARE_DIMENSIONS}
            color='blue'
            x={x1}
            y={y1}
        />
        <Square
            dimensions={SQUARE_DIMENSIONS}
            color='red'
            x={x2}
            y={y2}
        />
    </div>
  )
}

export default Arena
