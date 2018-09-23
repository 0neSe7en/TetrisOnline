import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <button>
          <Link to="/single">SinglePlayer</Link>
        </button>
        <button>
          <Link to="/multi">MultiPlayer</Link>
        </button>
      </div>
    )
  }
}

export default observer(Home);
