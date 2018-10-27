import localStore from '../store/localStore';
import sound from './sound';
console.log('sound:', sound);

const Mousetrap = require('mousetrap');

export function bind(player, game) {
  Mousetrap.bind('left', () => {
    sound.sounds.play('move');
    player.move({x: -1, y: 0});
  })

  Mousetrap.bind('right', () => {
    sound.sounds.play('move');
    player.move({x: 1, y: 0});
  })

  Mousetrap.bind('up', () => {
    sound.sounds.play('rotate');
    player.rotate();
  });

  Mousetrap.bind('down', () => {
    localStore.soft();
  }, 'keydown');

  Mousetrap.bind('down', () => {
    localStore.resetSoft();
  }, 'keyup')

  Mousetrap.bind('space', () => {
    game.hardDrop();
  })

  Mousetrap.bind(['shift', 'c'], () => {
    game.hold();
  })
}

export function unbind() {
  Mousetrap.unbind('left');
  Mousetrap.unbind('space');
  Mousetrap.unbind('right');
  Mousetrap.unbind('up');
  Mousetrap.unbind('down');
}
