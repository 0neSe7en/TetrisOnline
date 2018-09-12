import store from './store'
import {autorun} from 'mobx'

const controller = document.getElementById('control');

controller.addEventListener('click', () => {
    if (store.game.state === 'playing') {
        store.game.stop();
    } else {
        store.game.start();
    }
});

autorun(() => {
    if (store.game.state === 'playing') {
        controller.innerText = 'Stop';
    } else {
        controller.innerText = 'Start';
    }
});
