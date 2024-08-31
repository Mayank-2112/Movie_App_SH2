import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Player.css';

const Player = ({yt_key}) => {

    // const video = 'YQQD67N5pi0';
    // console.log(yt_key.key);

  return (
    <div className='player'>
      {yt_key ? (
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${yt_key.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        />
      ) : (
        <p>Error...</p>
      )}
    </div>
  )
}

export default Player
