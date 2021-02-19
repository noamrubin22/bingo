import './App.css';
import Ticket from "./Ticket";
import React, {useState, useEffect} from 'react';
import {start} from "./Snow";
import _ from 'lodash';

const winningCombinations = _.concat(
  _.range(5).map((i) => _.range(5).map((j) => i*5+j)),
  _.range(5).map((i) => _.range(5).map((j) => i+5*j)),
  [[0,6,12,18,24],[4,8,12,16,20]], // diagonals
)

const ticketNames = [
      "(child noises in the background)", 
      "Hello, hello?",
      "I need to jump into another call", 
      "can everyone go on mute?", 
      "could you please get closer to the mic?", 
      "(load painful echo / feedback)", 
      "Next slide, please.", 
      "can we take this offline?", 
      "is __ on the call?", 
      "could you share these slides afterwards?", 
      "can somebody grant presenter rights?", 
      "can you email that to everyone?",
      "sorry, I had problems logging in", 
      "(animal noises in the background)", 
      "sorry, I didn't find the conference id", 
      "I was having connection issues", 
      "I'll have to get back to you", 
      "who just joined?", 
      "sorry something __ with my calendar", 
      "do you see my screen?", 
      "let's wait for __!",
      "Will you send the minutes?", 
      "Sorry, I was on mute", 
      "Can you repeat, please?", 
      ]

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [winningArray, setWinningArray] = useState(Array(winningCombinations.length).fill(false));
  
  useEffect(() => {
    let shuffled = ticketNames.sort(() => Math.random() - 0.5);
    shuffled.splice(12, 0, "CONF CALL BINGO")
    setTickets(shuffled.map((name, index) => {
      if (index !== 12) {
        return { ticket: name, checked: false }
      } else {
        return { ticket: name , checked: true }
      }
    }));
  }, []);

  useEffect(() => {
  }, [tickets])

  useEffect(() => {
    setIsWon(true);
  }, [winningArray]);
  
  function onTicketClicked(index) {
    tickets[index].checked = true;
    setTickets([...tickets], [tickets])
    checkWin();
  }

  const checkWin = () => {
    winningCombinations.map((array, index) => {
      let counterWin = 0;
      array.map(el => {
        if ((tickets[el]) && (tickets[el].checked == true)) {
          counterWin++
        }
      })
      if ((counterWin === 5) && (winningArray[index] == false)) {
        winningArray[index] = true;
        setWinningArray([...winningArray], [winningArray]);
      } else {
        return
      }
    })
  }

  function Snow() {
    useEffect(() => {
      // start();
      console.log("SNOWING")
      setTimeout(function(){ 
          setIsWon(false);
        }, 3000);
    });
    return <canvas id="canvas" />;
  } 

  return (
    <div className="App">
    <div className="sun"></div>
    <div className="house">
        <div className="board">
        {tickets.map((ticket, index) => {
          return <Ticket 
                    ticket={ticket} 
                    key={index} 
                    isWon={isWon}
                    onClick={() => onTicketClicked(index)}
                    ></Ticket>
          })
        }
        {isWon ? <Snow/> : null}
        </div>
    </div>
    </div>
  );
}

export default App;
