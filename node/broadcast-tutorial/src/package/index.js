import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';
import App from './App';
import { LoggerHttpWriter } from '@livelyvideo/logger';

class Broadcaster extends EventEmitter {
  constructor(el, props) {
    super();

    const logger = new LoggerHttpWriter();

    logger.setOptions({
      uri: `${props.lbUrl}/lb/logger`,
      interval: 5000,
    });

    logger.setGlobalOptions({
      print: true,
      write: true,
      printLevel: 'debug',
      writeLevel: 'info',
    });

    this.el = el;
    this.props = props;
    this.render();
  }

  setRoomState(state) {
  	this.props.roomState = state;
  	this.render();
  }

  setCanProduce(canProduce) {
    this.props.canProduce = canProduce;
    this.render(); 
  }

  render() {
    ReactDOM.render(<App on={(e, ...args) => {
      this.emit(e, ...args);
    }} {...this.props} />, this.el);
  }
}

export default Broadcaster;
