import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onGetTimePlayer, 1000));

function onGetTimePlayer (e) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(e.seconds));
};

if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
    try {
        player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
    } catch (err) {
        console.log("error");
    };
};
