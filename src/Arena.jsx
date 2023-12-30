import { useState, useEffect, useRef } from 'react'
import useWindowDimensions from './useWindowDimensions.jsx'
import Square from './Square.jsx'

const SQUARE_DIMENSIONS = 100
const STEP_DISTANCE = 5
const HOLD_INTERVAL_MS = 8
const STARTING_OFFSET = 30

function Arena() {

    const { height, width } = useWindowDimensions();

    let aHeight = height * .9
    let aWidth = width * .95

    const [x1, setX1] = useState(0 + STARTING_OFFSET)
    const [y1, setY1] = useState(0 + STARTING_OFFSET)
    const [x2, setX2] = useState(aWidth - SQUARE_DIMENSIONS - STARTING_OFFSET)
    const [y2, setY2] = useState(aHeight - SQUARE_DIMENSIONS - STARTING_OFFSET)
    const [weapon1Direction, setWeapon1Direction] = useState('right')
    const [weapon2Direction, setWeapon2Direction] = useState('left')

    const x1Ref = useRef()
    const y1Ref = useRef()
    const x2Ref = useRef()
    const y2Ref = useRef()
    const direction1Ref = useRef('')
    const direction2Ref = useRef('')
    const direction1IntervalId = useRef(0)
    const direction2IntervalId = useRef(0)

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
                    startMovement(key, direction1IntervalId, direction1Ref, setX1, () => x1Ref.current > 0, () => x1Ref.current - STEP_DISTANCE < 0, 0, () => x1Ref.current - STEP_DISTANCE) //last arg is way 2 (using ref)
                    break;
                case 'ArrowUp':
                    startMovement(key, direction1IntervalId, direction1Ref, setY1, () => y1Ref.current > 0, () => y1Ref.current - STEP_DISTANCE < 0, 0, () => cur => cur - STEP_DISTANCE) //last arg is way 1 (function)
                    break;
                case 'ArrowDown':
                    startMovement(key, direction1IntervalId, direction1Ref, setY1, () => y1Ref.current < aHeight - SQUARE_DIMENSIONS, () => y1Ref.current + STEP_DISTANCE > aHeight - SQUARE_DIMENSIONS, aHeight - SQUARE_DIMENSIONS, () => cur => cur + STEP_DISTANCE)
                    break;
                case 'ArrowRight':
                    startMovement(key, direction1IntervalId, direction1Ref, setX1, () => x1Ref.current < aWidth - SQUARE_DIMENSIONS, () => x1Ref.current + STEP_DISTANCE > aWidth - SQUARE_DIMENSIONS, aWidth - 100, () => cur => cur + STEP_DISTANCE)
                    break;
                case 'a':
                    startMovement(key, direction2IntervalId, direction2Ref, setX2, () => x2Ref.current > 0, () => x2Ref.current - STEP_DISTANCE < 0, 0, () => x2Ref.current - STEP_DISTANCE)
                    break;
                case 'w':
                    startMovement(key, direction2IntervalId, direction2Ref, setY2, () => y2Ref.current > 0, () => y2Ref.current - STEP_DISTANCE < 0, 0, () => cur => cur - STEP_DISTANCE)
                    break;
                case 's':
                    startMovement(key, direction2IntervalId, direction2Ref, setY2, () => y2Ref.current < aHeight - SQUARE_DIMENSIONS, () => y2Ref.current + STEP_DISTANCE > aHeight - SQUARE_DIMENSIONS, aHeight - SQUARE_DIMENSIONS, () => cur => cur + STEP_DISTANCE)
                    break;
                case 'd':
                    startMovement(key, direction2IntervalId, direction2Ref, setX2, () => x2Ref.current < aWidth - SQUARE_DIMENSIONS, () => x2Ref.current + STEP_DISTANCE > aWidth - SQUARE_DIMENSIONS, aWidth - SQUARE_DIMENSIONS, () => cur => cur + STEP_DISTANCE)
                    break;
                case 'Enter':
                    setWeaponDirection(setWeapon1Direction)
                    break;
                case ' ':
                    setWeaponDirection(setWeapon2Direction)
                    break;
                default:
                    break;
            }
        }

        const handleKeyUp = (e) => {
            const key = e.key

            if (direction1Ref.current === key) {
                clearInterval(direction1IntervalId.current)
                direction1IntervalId.current = 0
                direction1Ref.current = ''
            } else if (direction2Ref.current === key) {
                clearInterval(direction2IntervalId.current)
                direction2IntervalId.current = 0
                direction2Ref.current = ''
            }
        }

        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('keyup', handleKeyUp, true);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    
    }, []);

    function startMovement(
        dir, dirIntervalIdRef, dirRef, coordStateSetter, shouldMoveFunc, isNearEdgeFunc, edgeCoord, calcNewPos
    ) {
        if (dirRef.current !== dir) {
            clearInterval(dirIntervalIdRef.current)
            dirRef.current = dir
            dirIntervalIdRef.current = setInterval(() => {
                if (shouldMoveFunc()) {
                    if (isNearEdgeFunc()) {
                        coordStateSetter(edgeCoord)
                    } else {
                        coordStateSetter(calcNewPos())
                    }
                }
            }, HOLD_INTERVAL_MS)
        }
    }

    function setWeaponDirection(dirStateSetter) {
        dirStateSetter(curDir => {
            switch(curDir) {
                case 'left':
                    return 'up'
                case 'up':
                    return 'right'
                case 'right':
                    return 'down'
                case 'down':
                    return 'left'
                default:
                    break
            }
        })
    }

  return (
    <div id="a" className="arena">
        <Square
            dimensions={SQUARE_DIMENSIONS}
            weaponDirection={weapon1Direction}
            color='blue'
            x={x1}
            y={y1}
        />
        <Square
            dimensions={SQUARE_DIMENSIONS}
            weaponDirection={weapon2Direction}
            color='red'
            x={x2}
            y={y2}
        />
    </div>
  )
}

export default Arena
