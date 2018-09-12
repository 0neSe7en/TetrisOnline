import {autorun} from 'mobx'
import store from './store'

const scoreDom = document.getElementById('score');

autorun(() => {
    scoreDom.innerText = store.game.score
})
