import React from 'react';
import './home.css';
import Mascot from '../../resources/images/mascot.png';

export default function Home() {
    return (
      <div className='home'>
          <img className='mascot' src={Mascot} />
          <div className='starting-text'>enhancing</div>
          <div className='main-text'>your role playing</div>
          <div className='ending-text'>experience</div>
      </div>
    );
}
