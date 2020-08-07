import React, { useEffect, useState } from 'react';
import './home.css';
import Mascot from '../../../../shared/resources/images/mascot.png';
import { useSelector } from 'react-redux';

function Welcome () {
  const conversation = [
    'Lets Go kill some orcs',
    'What are you waiting for',
    'You arent afraid are you'
  ];
  let index = 0;
  const [currentStatement, setCurrentStatement] = useState(conversation[index]);

  useEffect(() => {
    setInterval(() => {
      setCurrentStatement(conversation[++index % conversation.length]);
    }, 3000);
  }, []);

  return (
    <div className='welcome home'>
      <img className='mascot' src={Mascot} />
      <div className='starting-text'>enhancing</div>
      <div className='main-text'>your role playing</div>
      <div className='ending-text'>experience</div>
      <div className='speech-bubble'>
        <span className='speech-bubble-text'>{currentStatement}</span>
      </div>
    </div>
  );
}

function Main () {
  return (
    <div className='main home'>
          Heyo!
    </div>
  );
}

export default function Home (props) {
  console.log(props);
  const isLoggedIn = useSelector(state => state.auth.loggedIn);

  return (isLoggedIn ? <Main/> : <Welcome/>);
}
