import { useState, useEffect, useRef } from 'react'
import Square from './Square.jsx'
import useWindowDimensions from './useWindowDimensions.jsx';

const SQUARE_DIMENSIONS = 100
const SPEED = 30

function Arena() {


    const { height, width } = useWindowDimensions();

    let aHeight = height * .9
    let aWidth = width * .95

    const [x1, setX1] = useState(10)
    const [y1, setY1] = useState(0)
    const [x2, setX2] = useState(aWidth - SQUARE_DIMENSIONS)
    const [y2, setY2] = useState(aHeight - SQUARE_DIMENSIONS)

    const x1Ref = useRef()
    const y1Ref = useRef()
    const x2Ref = useRef()
    const y2Ref = useRef()

    x1Ref.current = x1
    y1Ref.current = y1
    x2Ref.current = x2
    y2Ref.current = y2

    //binds key presses to the document
    useEffect(() => {

        const handleKeyDown = (e) => {
            const key = e.key;
            
            switch(key) {
                case 'ArrowLeft':
                    if (x1Ref.current > 0) {
                        if (x1Ref.current - SPEED < 0) {
                            setX1(0)
                        } else {
                            setX1(x1Ref.current - SPEED) //way 1
                        }
                    }
                    break;
                case 'ArrowUp':
                    if (y1Ref.current > 0) {
                        if (y1Ref.current - SPEED < 0) {
                            setY1(0)
                        } else {
                            setY1(cur => cur - SPEED) //way 2
                        }
                    }
                    break;
                case 'ArrowDown':
                    if (y1Ref.current < aHeight - 100) {
                        if (y1Ref.current + SPEED > aHeight - 100) {
                            setY1(aHeight - 100)
                        } else {
                            setY1(cur => cur + SPEED)
                        }
                    }
                    break;
                case 'ArrowRight':
                    if (x1Ref.current < aWidth - 100) {
                        if (x1Ref.current + SPEED > aWidth - 100) {
                            setX1(aWidth - 100)
                        } else {
                            setX1(cur => cur + SPEED)
                        }
                    }
                    break;
                case 'a':
                    if (x2Ref.current > 0) {
                        if (x2Ref.current - SPEED < 0) {
                            setX2(0)
                        } else {
                            setX2(x2Ref.current - SPEED) //way 1
                        }
                    }
                    break;
                case 'w':
                    if (y2Ref.current > 0) {
                        if (y2Ref.current - SPEED < 0) {
                            setY2(0)
                        } else {
                            setY2(cur => cur - SPEED) //way 2
                        }
                    }
                    break;
                case 's':
                    if (y2Ref.current < aHeight - 100) {
                        if (y2Ref.current + SPEED > aHeight - 100) {
                            setY2(aHeight - 100)
                        } else {
                            setY2(cur => cur + SPEED)
                        }
                    }
                    break;
                case 'd':
                    if (x2Ref.current < aWidth - 100) {
                        if (x2Ref.current + SPEED > aWidth - 100) {
                            setX2(aWidth - 100)
                        } else {
                            setX2(cur => cur + SPEED)
                        }
                    }
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

  return (
    <div id="a" className="arena">
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
