import React, { useEffect, useState } from 'react'
import Board from './Board'
import Player from '../Player'
import PieceCemetery from './PieceCemetery'
import '../Board.css'

const gameTypes = [60, 300, 600]
const rowKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const player_black = new Player('b', 60);
const player_white = new Player('w', 60);

function App() {
    const [gameStart, setGameStart] = useState(false);
    const [gameType, setGameType] = useState(0);
    const [movesHistory, setMovesHistory] = useState([])

    function startButton(){
        setGameStart(true);
        if(!gameStart) player_white.startTimer()
    }

    useEffect(() => {
        player_black.editTimer(gameTypes[gameType])
        player_white.editTimer(gameTypes[gameType])
    }, [gameType])

    function updateMovementHistory(from, to){
        let movesHistoryCopy = JSON.parse(JSON.stringify(movesHistory));
        movesHistoryCopy.push([`${from.type}: ${rowKeys[from.col]}${from.row}`, `${rowKeys[to.col]}${to.row}`]);
        setMovesHistory(movesHistoryCopy);
    }
    return (
        <div className="container">
            <Board player_black={player_black} player_white={player_white} gameStart={gameStart}
            updateMovementHistory={updateMovementHistory}/>

            
            <aside>
                <PieceCemetery player = {player_black} />
                <PlayerTimer player={player_black} className="player-black"/>
                <div className='menu'>
                    {!gameStart ? 
                    (<div className="custom-game">
                        <div className="games">
                            <i className={`fas fa-brain ${gameType === 0 ? 'selected': ''}`}
                            style={{color:'rgb(189, 125, 65)'}}
                            onClick={() => setGameType(0)}></i>
                            <i className={`fas fa-bolt ${gameType === 1 ? 'selected': ''}`}
                            style={{color:"#ff0"}}
                            onClick={() => setGameType(1)}></i>
                            <i className={`fas fa-hourglass-half ${gameType === 2 ? 'selected': ''}`}
                            style={{color:'rgb(52, 159, 42)'}}
                            onClick={() => setGameType(2)}></i>
                        </div>
                        <button className="btn-start" onClick={() => startButton()}>PLAY</button>
                    </div>): 
                    (
                    <div id="table-wrapper">
                    <div id="table-scroll">
                        <table id="table">
                        <thead>
                            <tr>
                                <th>Move Num</th>
                                <th>From Square</th>
                                <th>To Square</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movesHistory.map((move, index) => (
                                <tr key = {index}>
                                    <td>{index}</td>
                                    <td>{move[0]}</td>
                                    <td>{move[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                    )}
                </div>
                <PlayerTimer player={player_white} className="player-white"/>
                <PieceCemetery player = {player_white} />
            </aside>
        </div>
    )
}

function PlayerTimer({player}){
    const [pTimer, setPTimer] = useState(player.time);
    useEffect(() => player.updateTimerFunction = setPTimer , [player])
    return (
        <div className="div-player">
            <div className={`timer ${player.color}`} ><h1>{pTimer}</h1></div>
        </div>
    )
}

export default App