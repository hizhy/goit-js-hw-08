import vimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);

setCurrentTime();

player.on('timeupdate', throttle(playedTime, 1000));

function playedTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
function setCurrentTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
