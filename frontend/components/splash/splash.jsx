import React from 'react';
import SplashNavBar from './splash_nav_bar';
import SplashMain from './splash_main';
import SplashFooter from './splash_footer';

class Splash extends React.Component {

  constructor(props) {

    super(props);

    this.changeBG = this.changeBG.bind(this);
    this.bgClasses = [
      "splash-page-couch",
      "splash-page-eyemasks",
      "splash-page-rose",
      "splash-page-facepaint",
      "splash-page-hands"
    ];
    this.increment = 0;
    this.state = { currentBG: this.bgClasses[this.increment] };
  }

  changeBG() {

    this.increment++;
    this.setState({ currentBG: this.bgClasses[this.increment % 5] });
  }

  componentDidMount() {

    this.interval = setInterval(() => {
      this.changeBG();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {

    return (
      <main id="splash-main" className={this.state.currentBG}>
        <SplashNavBar className="splash-nav" />
        <SplashMain />
        <SplashFooter />
      </main>
    );
  }
};

export default Splash;