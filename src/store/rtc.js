import Peer from 'peerjs';
import {
  applyPatch,
  applySnapshot,
  onPatch,
  getSnapshot,
} from 'mobx-state-tree';
import gameStore from './gameStore';

let peer = null;
let conn = null;
let lock = false;

onPatch(gameStore, patch => {
  if (!lock) {
    if (conn) {
      conn.send(JSON.stringify({type: 'patch', data: patch}));
    }
  }
})

export function createPeer() {
  peer = new Peer();
  return new Promise((resolve) => {
    peer.on('open', id => {
      resolve(id);
    })
  })
}

export function createRoom() {
  peer.on('connection', c => {
    conn = c;
    conn.on('open', () => {
      const snap = getSnapshot(gameStore);
      conn.send(JSON.stringify({type: 'snapshot', data: snap}));
    });
    conn.on('data', str => {
      const data = JSON.parse(str);
      lock = true;
      switch (data.type) {
        case 'patch':
          applyPatch(gameStore, data.data);
          break;
      }
      lock = false;
    });
  })
}

export function join(peerId) {
  conn = peer.connect(peerId);
  return new Promise(resolve => {
    conn.on('open', () => {
      console.log('connection opened');
    })
    conn.on('data', str => {
      const data = JSON.parse(str);
      lock = true;
      switch (data.type) {
        case 'patch':
          applyPatch(gameStore, data.data);
          break;
        case 'snapshot':
          applySnapshot(gameStore, data.data);
          resolve();
          break;
      }
      lock = false;
    })
  })
}

export function leave() {
  conn.close();
  conn = null;
}
