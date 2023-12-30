function Square({color, x, y, weaponDirection}) {
    return (
        <div
            className={'square ' + 'weapon-' + weaponDirection}
            style={{backgroundColor: color, left: x, top: y}}>
        </div>
    )
}

export default Square