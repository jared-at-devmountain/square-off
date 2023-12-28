import { useState, useEffect } from 'react'

function Square({color, x, y}) {
    return (
        <div className="square" style={{backgroundColor: color, left: x, top: y}}>
        </div>
    )
}

export default Square