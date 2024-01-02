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
    const weapon1DirectionRef = useRef()
    const weapon2DirectionRef = useRef()
    const direction1Ref = useRef('')
    const direction2Ref = useRef('')
    const direction1IntervalIdRef = useRef(0)
    const direction2IntervalIdRef = useRef(0)


    x1Ref.current = x1
    y1Ref.current = y1
    x2Ref.current = x2
    y2Ref.current = y2
    weapon1DirectionRef.current = weapon1Direction
    weapon2DirectionRef.current = weapon2Direction


    //binds key presses to the document //
    useEffect(() => {

        const handleKeyDown = (e) => {
            const key = e.key;

            let player = (key.includes('Arrow') || key === 'Enter') && 'p1'
            if (!player) {
                player = (key === 'a' || key === 'w' || key === 's' || key === 'd' || key === ' ') && 'p2'
            }
            if (!player) {
                return
            }

            if (key === 'Enter' || key === ' ') {
                setWeaponDirection(player === 'p1' ? setWeapon1Direction : setWeapon2Direction)
            } else {
                startMovement(key, player)
            }
        }

        const handleKeyUp = (e) => {
            const key = e.key

            if (direction1Ref.current === key) {
                clearInterval(direction1IntervalIdRef.current)
                direction1IntervalIdRef.current = 0
                direction1Ref.current = ''
            } else if (direction2Ref.current === key) {
                clearInterval(direction2IntervalIdRef.current)
                direction2IntervalIdRef.current = 0
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

    function startMovement(key, player) {
        let pInfo = {
            dirRef: player === 'p1' ? direction1Ref : direction2Ref,
            dirIntervalIdRef: player === 'p1' ? direction1IntervalIdRef : direction2IntervalIdRef,
            weaponDirectionRef: player === 'p1' ? weapon1DirectionRef : weapon2DirectionRef,
            enemyWeaponDirectionRef: player === 'p1' ? weapon2DirectionRef : weapon1DirectionRef,
        }

        if (pInfo.dirRef.current !== key) {
            clearInterval(pInfo.dirIntervalIdRef.current)
            pInfo.dirRef.current = key
            pInfo.dirIntervalIdRef.current = setInterval(() => {

                let aSpecs = (key === 'a' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'd')
                    && {plane: 'horizontal', dimension: aWidth}
                if (!aSpecs) {
                    aSpecs = (key === 'ArrowUp' || key === 'w' || key === 's' || key === 'ArrowDown')
                        && {plane: 'vertical', dimension: aHeight}
                }

                let isIncreasingDir = key === 'ArrowRight' || key === 'd' || key === 's' || key === 'ArrowDown'
                    ? true
                    : false

                pInfo.coordData = player === 'p1'
                    ? (aSpecs.plane === 'horizontal'
                        ? {coordStateSetter: setX1, coordRef: x1Ref, enemyCoordRef: x2Ref, perpCoordRef: y1Ref, enemyPerpCoordRef: y2Ref}
                        : {coordStateSetter: setY1, coordRef: y1Ref, enemyCoordRef: y2Ref, perpCoordRef: x1Ref, enemyPerpCoordRef: x2Ref})
                    : (aSpecs.plane === 'horizontal'
                        ? {coordStateSetter: setX2, coordRef: x2Ref, enemyCoordRef: x1Ref, perpCoordRef: y2Ref, enemyPerpCoordRef: y1Ref}
                        : {coordStateSetter: setY2, coordRef: y2Ref, enemyCoordRef: y1Ref, perpCoordRef: x2Ref, enemyPerpCoordRef: x1Ref})

                let moveTypeBools = {
                    isntPressingWall: isIncreasingDir
                        ? pInfo.coordData.coordRef.current < aSpecs.dimension - SQUARE_DIMENSIONS
                        : pInfo.coordData.coordRef.current > 0,
                    isNearEdge: isIncreasingDir
                        ? pInfo.coordData.coordRef.current + STEP_DISTANCE > aSpecs.dimension - SQUARE_DIMENSIONS
                        : pInfo.coordData.coordRef.current - STEP_DISTANCE < 0,
                    edgeCoord: isIncreasingDir
                        ? aSpecs.dimension - SQUARE_DIMENSIONS
                        : 0
                }

                if (moveTypeBools.isntPressingWall) {
                    if (moveTypeBools.isNearEdge) {
                        pInfo.coordData.coordStateSetter(moveTypeBools.edgeCoord)
                        return
                    }

                    let playersOnSamePerpLevel = Math.abs(pInfo.coordData.perpCoordRef.current - pInfo.coordData.enemyPerpCoordRef.current) < SQUARE_DIMENSIONS

                    let playerWouldEnterEnemySquare = isIncreasingDir
                        ? playersOnSamePerpLevel && Math.abs(pInfo.coordData.enemyCoordRef.current - pInfo.coordData.coordRef.current - SQUARE_DIMENSIONS) < STEP_DISTANCE
                        : playersOnSamePerpLevel && Math.abs(pInfo.coordData.coordRef.current - pInfo.coordData.enemyCoordRef.current - SQUARE_DIMENSIONS) < STEP_DISTANCE

                    if (playerWouldEnterEnemySquare) {
                        let playerWeaponIsInMovementDir =
                            (pInfo.weaponDirectionRef.current === 'left' && (key === 'ArrowLeft' || key === 'a')) ||
                            (pInfo.weaponDirectionRef.current === 'right' && (key === 'ArrowRight' || key === 'd')) ||
                            (pInfo.weaponDirectionRef.current === 'up' && (key === 'ArrowUp' || key === 'w')) ||
                            (pInfo.weaponDirectionRef.current === 'down' && (key === 'ArrowDown' || key === 's'))

                        let enemyWeaponIsFacingOncoming =
                            (pInfo.enemyWeaponDirectionRef.current === 'right' && (key === 'ArrowLeft' || key === 'a')) ||
                            (pInfo.enemyWeaponDirectionRef.current === 'left' && (key === 'ArrowRight' || key === 'd')) ||
                            (pInfo.enemyWeaponDirectionRef.current === 'down' && (key === 'ArrowUp' || key === 'w')) ||
                            (pInfo.enemyWeaponDirectionRef.current === 'up' && (key === 'ArrowDown' || key === 's'))

                        if (playerWeaponIsInMovementDir) {
                            if (enemyWeaponIsFacingOncoming) {
                                pInfo.coordData.coordStateSetter(isIncreasingDir ? pInfo.coordData.enemyCoordRef.current - 100 : pInfo.coordData.enemyCoordRef.current + 100)
                            } else {
                                pInfo.coordData.coordStateSetter(pInfo.coordData.coordRef.current + (isIncreasingDir ? STEP_DISTANCE : -STEP_DISTANCE))
                                alert(player === 'p1' ? 'Blue wins' : 'Red wins')
                            }
                        } else {
                            if (enemyWeaponIsFacingOncoming) {
                                pInfo.coordData.coordStateSetter(pInfo.coordData.coordRef.current + (isIncreasingDir ? STEP_DISTANCE : -STEP_DISTANCE))
                                alert(player === 'p1' ? 'Red wins' : 'Blue wins')
                            } else {
                                pInfo.coordData.coordStateSetter(isIncreasingDir ? pInfo.coordData.enemyCoordRef.current - 100 : pInfo.coordData.enemyCoordRef.current + 100)
                            }
                        }
                        return
                    }

                    pInfo.coordData.coordStateSetter(pInfo.coordData.coordRef.current + (isIncreasingDir ? STEP_DISTANCE : -STEP_DISTANCE))
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
