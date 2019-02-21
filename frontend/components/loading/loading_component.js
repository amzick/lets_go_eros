import React from 'react';
import { Spinner } from 'spin.js';



class LoadingComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // http://spin.js.org/

    // const opts = {
    //   lines: 12, // The number of lines to draw
    //   length: 43, // The length of each line
    //   width: 15, // The line thickness
    //   radius: 59, // The radius of the inner circle
    //   scale: 1.35, // Scales overall size of the spinner
    //   corners: 1, // Corner roundness (0..1)
    //   color: '#0f4da1', // CSS color or array of colors
    //   fadeColor: 'transparent', // CSS color or array of colors
    //   speed: 1.2, // Rounds per second
    //   rotate: 0, // The rotation offset
    //   animation: 'spinner-line-fade-more', // The CSS animation name for the lines
    //   direction: 1, // 1: clockwise, -1: counterclockwise
    //   zIndex: 2e9, // The z-index (defaults to 2000000000)
    //   className: 'spinner', // The CSS class to assign to the spinner
    //   top: '50%', // Top position relative to parent
    //   left: '50%', // Left position relative to parent
    //   shadow: '0 0 1px transparent', // Box-shadow for the lines
    //   position: 'absolute' // Element positioning
    // };

    // const target = document.getElementById('spinner');
    // this.spinner = new Spinner(opts).spin(target);
  }

  render() {
    return (
      <div id="spinner" className="loading-div">
        {/* <div class="heartbeat-loader" /> */}
        <div id="loading" />
      </div>
    )
  }
}

export default LoadingComponent;