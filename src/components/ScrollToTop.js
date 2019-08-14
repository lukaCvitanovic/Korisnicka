import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ScrollButton extends Component {
    constructor() {
      super();
  
      this.state = {
          intervalId: 0
      };
    }
    
    scrollStep() {
      const site = document.querySelector("#gatsby-focus-wrapper").firstChild.firstChild
      //Text();

      if (site.scrollTop === 0) {
          clearInterval(this.state.intervalId);
      }
      site.scroll(0, site.scrollTop - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
    
    render () {
      
        return <button title='Back to top' className='scroll' 
                 onClick={ () => { this.scrollToTop(); }}>
                    <FontAwesomeIcon icon="angle-up" size="3x" />
                </button>;
     }
  } 

  export default ScrollButton;