import localStore from '../store/localStore';

const Mousetrap = require('mousetrap');

export function bind(player) {
  Mousetrap.bind('left', () => {
    player.move({x: -1, y: 0});
  })

  Mousetrap.bind('right', () => {
    player.move({x: 1, y: 0});
  })

  Mousetrap.bind('up', () => {
    player.rotate();
  });

  Mousetrap.bind('down', () => {
    localStore.soft();
  }, 'keydown');

  Mousetrap.bind('down', () => {
    localStore.resetSoft();
  }, 'keyup')
}

export function unbind() {

}
