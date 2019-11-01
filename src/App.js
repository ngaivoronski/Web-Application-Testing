import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './components/Display';
import Dashboard from './components/Dashboard';

export const playGame = (gameStatus, balls, strikes, fouls, outs, inning, hit) => {
  if (gameStatus === "Out" && outs === 3) {
    return ['Playing',0,0,0,0,inning+1,'New inning! Next batter is up!']
  } else if  (gameStatus==="Not Started" || gameStatus === "Out") {
      return ['Playing',0,0,0,outs,inning,'Next batter is up!']
  } else if (hit === 'strike') {
    if(strikes === 2) {
      return ['Out',balls,3,fouls,outs+1,inning,"Three strikes! You're out!"]
    } else {
      return [gameStatus,balls,strikes+1,fouls,outs,inning,"Strike!"]
    }
  } else if (hit === 'ball') {
    if (balls === 3) {
      return ['Out',4,strikes,fouls,outs,inning,"Four Balls! You walk!"]
    } else {
      return [gameStatus,balls+1,strikes,fouls,outs,inning,"Ball!"]
    }
  } else if (hit === 'foul') {
    if (strikes < 2) {
      return [gameStatus,balls,strikes+1,fouls+1,outs,inning,"Foul!"]
    } else {
      return [gameStatus,balls,strikes,fouls+1,outs,inning,"Foul!"]
    }
  } else {
    return ['Out',balls,strikes,fouls,outs,inning,"Hit!"]
  }
}

function App() {
  const [gameStatus, setGameStatus] = useState('Not Started');
  const [pitch, setPitch] = useState(0);
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [fouls, setFouls] = useState(0);
  const [outs, setOuts] = useState(0);
  const [inning, setInning] = useState(1);
  const [message, setMessage] = useState('Welcome, press "Start Game" to start the game')

  const generateHit = () => {
    var randomNumber = Math.round(Math.random() * 4);
    if (randomNumber === 1) {
      return('strike');
    } else if (randomNumber === 2) {
      return ('ball');
    } else if (randomNumber === 3) {
      return ('hit');
    } else {
      return ('foul');
    }
  }

  useEffect(() => {
    var hit = generateHit();
    if (gameStatus !== "Not Started") {
      var gameUpdate = playGame(gameStatus, balls, strikes, fouls, outs, inning, hit);

      setGameStatus(gameUpdate[0]);
      setBalls(gameUpdate[1]);
      setStrikes(gameUpdate[2]);
      setFouls(gameUpdate[3]);
      setOuts(gameUpdate[4]);
      setInning(gameUpdate[5]);
      setMessage(gameUpdate[6]);
    }
  },[pitch])



  return (
    <div className="App">
      <Display gameStatus={gameStatus} pitch={pitch} balls={balls} strikes={strikes} fouls={fouls} outs={outs} inning={inning} message={message}/>
      <Dashboard pitch={pitch} setPitch={setPitch} gameStatus={gameStatus} setGameStatus={setGameStatus} setMessage={setMessage}/>
      
    </div>
  );
}

export default App;
