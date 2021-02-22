import './App.css';
import Ticket from "./Ticket";
import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {Howl, Howler} from 'howler';
import VolumeMuteRoundedIcon from '@material-ui/icons/VolumeMuteRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import sound0 from "./assets/0.wav";
import sound1 from "./assets/1.wav";
import sound2 from "./assets/2.wav";
import sound3 from "./assets/3.wav";
import sound4 from "./assets/4.wav";
import sound5 from "./assets/5.wav";
import sound6 from "./assets/6.wav";
import sound7 from "./assets/7.wav";
import sound8 from "./assets/8.wav";
import sound9 from "./assets/9.wav";
import sound10 from "./assets/10.wav";
import sound11 from "./assets/11.wav";
import sound12 from "./assets/12.wav";
import sound13 from "./assets/13.wav";
import sound14 from "./assets/14.wav";
import sound15 from "./assets/15.wav";
import sound16 from "./assets/16.wav";
import sound17 from "./assets/17.wav";
import sound18 from "./assets/18.wav";
import sound19 from "./assets/19.wav";
import sound20 from "./assets/20.wav";
import sound21 from "./assets/21.wav";
import sound22 from "./assets/22.wav";
import sound23 from "./assets/23.wav";
import sound24 from "./assets/24.wav";


const audioObject = [
  {sound: sound0},{sound: sound1},
  {sound: sound2},{sound: sound3}, 
  {sound: sound4},{sound: sound5}, 
  {sound: sound6},{sound: sound7}, 
  {sound: sound8},{sound: sound9}, 
  {sound: sound10},{sound: sound11}, 
  {sound: sound12},{sound: sound13}, 
  {sound: sound14},{sound: sound15}, 
  {sound: sound16},{sound: sound17}, 
  {sound: sound18},{sound: sound19}, 
  {sound: sound20},{sound: sound21},
  {sound: sound22},{sound: sound23},
  {sound: sound24}];

const winningCombinations = _.concat(
  _.range(5).map((i) => _.range(5).map((j) => i*5+j)),
  _.range(5).map((i) => _.range(5).map((j) => i+5*j)),
  [[0,6,12,18,24],[4,8,12,16,20]], // diagonals
);

const ticketNames = [
      "(child noises in the background)", 
      "hello, hello?",
      "I need to jump into another call", 
      "can everyone go on mute?", 
      "could you please get closer to the mic?", 
      "(load painful echo / feedback)", 
      "next slide, please.", 
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
      "will you send the minutes?", 
      "sorry, I was on mute", 
      "can you repeat, please?", 
      ];

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [winningArray, setWinningArray] = useState(Array(winningCombinations.length).fill(false));
  const [mute, setMute] = useState(false);

  useEffect(() => {
    let shuffled = ticketNames.sort(() => Math.random() - 0.5);
    shuffled.splice(12, 0, "CONF CALL MUSIC BINGO");

    setTickets(shuffled.map((name, index) => {
      if (index !== 12) {
        return { ticket: name, checked: false}
      } else {
        return { ticket: name , checked: true, music: false }
      }
    }));
  }, []);

  useEffect(() => {
    setIsWon(true);
  }, [winningArray]);

  const onTicketClicked = (index) => {
    if (index === 12) {
      tickets[index].music = true;
    }
    tickets[index].checked = true;
    setTickets([...tickets], [tickets]);
    checkWin();
    soundPlay(audioObject[index].sound, mute);
  }

  const checkWin = () => {
    winningCombinations.map((array, index) => {
      let counterWin = 0;
      array.map(el => {
        if ((tickets[el]) && (tickets[el].checked == true)) {
          counterWin++;
        }
      });
      if ((counterWin === 5) && (winningArray[index] == false)) {
        winningArray[index] = true;
        setWinningArray([...winningArray], [winningArray]);
      } else {
        return
      }
    })
  }

  function playAllSounds(mute) {
    if (!mute) {
      tickets.map((ticket, index) => {
        if (ticket.checked == true) {
          soundPlay(audioObject[index].sound);
        }
      });
    } else {
      soundPlay("randomfile", mute);
    }

    setTimeout(function(){ 
      setIsWon(false);
  }, 2000);
  } 

  const toggleMute = () => {
    setMute(!mute)
  }

  const soundPlay = (src, mute) => {
    const sound = new Howl({src});
    if (mute) {
      sound.pause();
    } else {
      sound.play();
    }
  }

  Howler.volume(1.0);

  const buttonStyle = {
    width: "5rem",
    height: "5rem",
    fill: "grey"
  }

  return (
    <div className="App">
        <div className={isWon ? "board win" : "board"}>
        {tickets.map((ticket, index) => {
          return <Ticket 
                    ticket={ticket} 
                    key={index} 
                    index={index}
                    isWon={isWon}
                    onClick={() => onTicketClicked(index)}
                    ></Ticket>
          })
        }
        {isWon && playAllSounds(mute)}
        </div>
        {mute ? <VolumeMuteRoundedIcon style={buttonStyle} onClick={() => toggleMute()}>mute</VolumeMuteRoundedIcon> : <VolumeUpRoundedIcon style={buttonStyle} onClick={() => toggleMute()}>mute</VolumeUpRoundedIcon>}
    </div>
  );
}

export default App;
