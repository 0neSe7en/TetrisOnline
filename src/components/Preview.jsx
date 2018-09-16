import React, {Component} from 'react'
import { autorun } from 'mobx';
import {drawGrids, clear, scaleRatio} from '../utils/canvas'
import { localStore } from '../store';
import {observer} from 'mobx-react'


class Preview extends Component {
  constructor(props) {
    super(props);
    this.previewCanvas = React.createRef();
    this.previewCtx = null;
    this.cancelAutorun = [];
  }

  clearPreviewCanvas() {
    clear(this.previewCtx, this.props.width, this.props.height);
  }

  componentDidMount() {
    this.previewCtx = this.previewCanvas.current.getContext('2d');
    scaleRatio(this.previewCanvas.current, this.previewCtx, this.props.width, this.props.height);
    this.clearPreviewCanvas();
    this.cancelAutorun = [
      autorun(() => {
        const preview = localStore.nextShape;
        if (preview) {
          this.clearPreviewCanvas();
          drawGrids(this.previewCtx, preview.gridPositions());
        }
      })
    ]
  }

  componentWillUnmount() {
    this.cancelAutorun.forEach(dispos => dispos());
  }

  render() {
    console.log('render...preview');
    return <canvas ref={this.previewCanvas} width={this.props.width} height={this.props.height}/>
  }

}

export default observer(Preview)