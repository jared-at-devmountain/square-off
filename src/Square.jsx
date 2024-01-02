import explodeGif from '/explode.gif'

function Square({color, x, y, weaponDirection, zIndex, lost}) {

    return (
        <>
            { lost
                ? <img
                    src={explodeGif}
                    className="explode"
                    alt="explosion gif"
                    style={{left: x - 120, top: y, zIndex: zIndex}}
                />
                : <div
                    className={'square ' + 'weapon-' + color + '-' + weaponDirection}
                    style={{backgroundColor: color, left: x, top: y, zIndex: zIndex}}>
                </div>
            }
        </>
    )
}

export default Square