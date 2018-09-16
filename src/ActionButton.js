import gameStore from './store'
import {autorun} from 'mobx'

const startControl = document.getElementById('startBtn');
const pauseControl = document.getElementById('pauseBtn');

startControl.addEventListener('click', () => {
    if (gameStore.state === 'stop') {
        gameStore.start();
    } else {
        gameStore.stop();
    }
});

pauseControl.addEventListener('click', () => {
    if (gameStore.state === 'playing') {
        gameStore.pause();
    } else if (gameStore.state === 'pause') {
        gameStore.resume();
    }
})

autorun(() => {
    switch (gameStore.state) {
        case 'playing':
            startControl.innerText = 'Stop';
            pauseControl.disabled = false;
            pauseControl.innerText = 'Pause';
            break;
        case 'stop':
            startControl.innerText = 'Start';
            pauseControl.disabled = true;
            pauseControl.innerText = 'Pause';
            break;
        case 'pause':
            startControl.innerText = 'Stop';
            pauseControl.disabled = false;
            pauseControl.innerText = 'Resume';
            break;
    }
});
