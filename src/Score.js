import {autorun} from 'mobx'
import gameStore from './store'

const container = document.getElementById('scoreContainer');

autorun(() => {
    container.innerHTML = '';
    gameStore.players.forEach(player => {
        const score = document.createElement('p');
        score.id = player.id;
        score.innerText = `${player.name}:${player.score}`;
        container.appendChild(score);
    })
})
