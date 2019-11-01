import React from 'react';
import ReactDOM from 'react-dom';
import App, {playGame, generateHit} from './App';
import {buttonMessage} from './components/Dashboard';
import Display from './components/Display';
import {render, getByTestId} from '@testing-library/react'

test('start game', () => {
  expect(playGame("Not Started",3,2,0,'strike')).toStrictEqual(['Playing',0,0,0,'Next batter is up!']);
})

test('three strikes', () => {
  expect(playGame("Playing",0,2,0,'strike')).toStrictEqual(["Out",0,3,0,"Three strikes! You're out!"]);
})

test('four balls', () => {
  expect(playGame("Playing",3,2,0,'ball')).toStrictEqual(["Out",4,2,0,"Four Balls! You walk!"]);
})

test('message - start game', () => {
  expect(buttonMessage('Not Started')).toStrictEqual("Start Game");
})

test('message - next pitch', () => {
  expect(buttonMessage('Playing')).toStrictEqual("Next Pitch");
})

test('message - next batter', () => {
  expect(buttonMessage('Out')).toStrictEqual("Next Batter");
})

let idCounter = 1

test('calling render of Display with the same component on the same container does not remount', () => {
  var currentPitch = idCounter++ // to ensure we don't remount a different instance

  const {getByTestId, rerender} = render(<Display gameStatus='Playing' pitch={currentPitch} balls='0' strikes='0' fouls='0' message="test" />)
  expect(getByTestId('game-display').textContent).toBe('Game: Playing');

  // re-render the same component with different props
  rerender(<Display gameStatus='Not Started' pitch={currentPitch} balls='0' strikes='0' fouls='0' message="test" />)
  expect(getByTestId('game-display').textContent).toBe('Game: Not Started')

  expect(getByTestId('pitch-display').textContent).toBe('Pitch: 1')
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
