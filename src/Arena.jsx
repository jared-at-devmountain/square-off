import { useState, useEffect } from 'react'
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

    //binds key presses to the document
    useEffect(() => {

        const handleKeyDown = (e) => {
            const key = e.key;
            
            switch(key) {
                case 'ArrowLeft':
                    x1 >= 0 && setX1(cur => cur - SPEED)
                    break;
                case 'ArrowUp':
                    y1 >= 0 && setY1(cur => cur - SPEED)
                    break;
                case 'ArrowDown':
                    y1 <= aHeight - 100 && setY1(cur => cur + SPEED)
                    break;
                case 'ArrowRight':
                    x1 <= aWidth - 100 && setX1(cur => cur + SPEED)
                    break;
                case 'a':
                    x2 >= 0 && setX2(cur => cur - SPEED)
                    break;
                case 'w':
                    y2 >= 0 && setY2(cur => cur - SPEED)
                    break;
                case 's':
                    y2 <= aHeight - 100 && setY2(cur => cur + SPEED)
                    break;
                case 'd':
                    x2 <= aWidth - 100 && setX2(cur => cur + SPEED)
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
