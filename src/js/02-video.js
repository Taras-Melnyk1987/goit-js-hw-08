import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

function onGetTimePlayer() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(LOCALSTORAGE_KEY, seconds);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

player.on('timeupdate', throttle(onGetTimePlayer, 1000));

const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);

player.setCurrentTime(currentTime).catch(function (error) {
  console.log(error.message);
});
