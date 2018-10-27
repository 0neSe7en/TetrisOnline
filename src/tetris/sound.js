import { Howl, Howler } from 'howler';


class Sound {
  constructor() {
    this.sounds = new Howl({
      src: ['/assets/sounds.ogg', '/assets/sounds.mp3'],
      sprite: {
        background: [ 0, 209146.48526077098, true],
        //
        click: [],
        move: [216000, 500.04535147391493],
        rotate: [218000, 500.04535147391493],
        //
        rotateFailed: [],
        clear: [211000, 1002.585034013606],
        tetrisClear: [220000, 1012.6757369614552],
        hardDrop: [214000, 789.342403628126],
        drop: [214000, 789.342403628126],
        hold: [214000, 789.342403628126],
        // hold: [],
        //
        win: [],
        //
        gameover: []
      },
    })
  }
}

export default new Sound();
