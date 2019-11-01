import React from 'react';

export default function Display(props) {
    return(
        <div>
            <h1>{props.message}</h1>
            <div data-testid="game-display">Game: {props.gameStatus}</div>
            <div data-testid="pitch-display">Pitch: {props.pitch}</div>
            <div data-testid="balls-display">Balls: {props.balls}</div>
            <div data-testid="strikes-display">Strikes: {props.strikes}</div>
            <div data-testid="fouls-display">Fouls: {props.fouls}</div>
            <div data-testid="outs-display">Outs: {props.outs}</div>
            <div data-testid="inning-display">Inning: {props.inning}</div>
        </div>
    )
}