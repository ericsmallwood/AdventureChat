import React from 'react';
import './home.css';
import Mascot from '../../resources/images/mascot.png';
import {shallowEqual, useSelector} from "react-redux";

function Welcome () {
    return (
        <div className='welcome home'>
            <img className='mascot' src={Mascot} />
            <div className='starting-text'>enhancing</div>
            <div className='main-text'>your role playing</div>
            <div className='ending-text'>experience</div>
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

export default function Home() {
    const loggedIn = useSelector(state => {
        return state.loggedIn
    });

    return (loggedIn ? <Main/> : <Welcome/>);
}
