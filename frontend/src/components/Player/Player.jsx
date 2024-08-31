import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Player.css';

const Player = () => {

    // const video = 'YQQD67N5pi0';

  return (
    <div className='player'>
      <iframe width = '100%' height= '100%' src={'https://www.youtube.com/embed/YQQD67N5pi0'}
      title  = 'trailer' frameBorder='0' allowFullScreen>
        <FontAwesomeIcon icon={faArrowLeft} className='back_arrow'/></iframe>
    </div>
  )
}

export default Player
