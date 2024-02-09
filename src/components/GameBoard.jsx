import React, { useEffect, useState } from 'react';
import { playerIsWin,highlight, resetCellColors } from '../util';

const GameBoard = () => {
    const [array, setArray] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(true);
    const [winner, setWinner] = useState(false);
    const [numberOfTurn, setNumberOfTurn] = useState(0);
    const [tie, setTie] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!player && numberOfTurn < 9 && !winner && !tie) {
            setLoading(true);

        const fetchMove = async () => {
            try {
                const response = await fetch('https://hiring-react-assignment.vercel.app/api/bot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(array)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                const computerMove = data;
                array[computerMove] = 'O';
                setArray([...array]);
                setPlayer(true);
                setNumberOfTurn(numberOfTurn + 1);
                setLoading(false);

                // Check for win or tie
                const result=playerIsWin(array);
                if (result) {
                    setWinner(true);
                    highlight(result)
                } else if (numberOfTurn === 8) {
                    setTie(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchMove();
        }
    }, [player]);

    
    function clickOnBlock(index) {
        if (array[index] === null && numberOfTurn<9 && winner===false) {
            if (player) {
                array[index] = "X";
                setArray(array);
            } else {
                array[index] = "O"
                setArray(array);
            }
            setPlayer(!player);
            setNumberOfTurn(numberOfTurn+1);
        }
        
        const result=playerIsWin(array);
        if (result) {
            setWinner(true);
            highlight(result)
            return;
        }
        if(numberOfTurn===8){
            setTie(true);
            setNumberOfTurn(9);
            return;
        }
    }
    
    const restartTheGame = () => {
        resetCellColors();
        setArray(Array(9).fill(null));
        setPlayer(true);
        setWinner(false);
        setNumberOfTurn(0);
        setTie(false);
        setLoading(false); 
    }
    
    return (
        <div className='wrapper'>
            <div id='grp'>
                <img src='human.png' width={250} alt='human'/>
                {!loading && player && !winner && !tie && numberOfTurn < 9 && <div className={`think ${player ? 'human' : 'computer'}`}>I'm Thinking now</div>}
            </div>
            <div className="content-wrapper">
            <div id='title-tooltip' title="The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.">
                <div className='title'>Tic-Tac-Toe</div>
            </div>
            <div className='game-board'>
                    <div className='row'>
                        <button className='block' onClick={() => { clickOnBlock(0) }} > {array[0]} </button>
                        <button className='block' onClick={() => { clickOnBlock(1) }} > {array[1]} </button>
                        <button className='block' onClick={() => { clickOnBlock(2) }} > {array[2]} </button>
                    </div>
                    <div className='row'>
                        <button className='block' onClick={() => { clickOnBlock(3) }} > {array[3]} </button>
                        <button className='block' onClick={() => { clickOnBlock(4) }} > {array[4]} </button>
                        <button className='block' onClick={() => { clickOnBlock(5) }} > {array[5]} </button>
                    </div>
                    <div className='row'>
                        <button className='block' onClick={() => { clickOnBlock(6) }} > {array[6]} </button>
                        <button className='block' onClick={() => { clickOnBlock(7) }} > {array[7]} </button>
                        <button className='block' onClick={() => { clickOnBlock(8) }} > {array[8]} </button>
                    </div>
                </div>
                <div className='action-panel'>
                    {!winner && !tie && numberOfTurn < 9 && <div className="msg">{player ? <div id='turn'><img alt='left' src='leftarrow.png'/>It's your turn now</div> : <div id='turn'>Computer's turn now<img alt='right' src='rightarrow.png'/></div>}</div>}
                    {tie && <div id="turn">Game Is Draw....</div>}
                    {!winner && !tie && numberOfTurn === 9 && <div id="turn">Game Is Draw....</div>}
                    {winner && <div className="turn2">{!player ?<div id='turn2'>You are the winner</div> : <div id='turn2'>Computer is the winner</div>} </div>}
                </div>
                    <div className='action-panel'><button className='btn' onClick={restartTheGame}>Play Again</button></div>
            </div>
    
            <div id='grp'>
                <img src='computer.png' width={250} alt='computer'/>
                {loading && !player && !winner && !tie && numberOfTurn < 9 && <div className={`think ${player ? 'human' : 'computer'}`}>I'm Thinking now</div>}
            </div>
    
        </div>
    )
    
}

export default GameBoard;
