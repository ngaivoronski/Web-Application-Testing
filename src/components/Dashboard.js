import React from 'react';

export const buttonMessage = (status) => {
    if (status === "Not Started") {
        return "Start Game"
    } else if (status === 'Playing') {
        return "Next Pitch"
    } else {
        return "Next Batter"
    }
}

export default function Dashboard(props) {

    const cyclePitch = () => {
        if (props.gameStatus === "Not Started") {
            props.setGameStatus("Playing");
            props.setMessage('First batter up!');
        } else {
            props.setPitch(props.pitch + 1)
        }
    }

    return(
        <div>
            <button onClick={cyclePitch}>{buttonMessage(props.gameStatus)}</button>
        </div>
    )
}