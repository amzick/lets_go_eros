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
    this.imgClasses = [
      "splash-page-couch-img",
      "splash-page-eyemasks-img",
      "splash-page-rose-img",
      "splash-page-facepaint-img",
      "splash-page-hands-img"
    ]
    this.increment = 0;
    this.state = {
      currentBG: this.bgClasses[this.increment],
      currentImg: this.imgClasses[this.increment]
    };
  }

  changeBG() {
    this.increment++;
    const image = document.getElementById("splash-img");
    // $(image).fadeOut(100);
    // this.setState({
    //   currentBG: this.bgClasses[this.increment % 5],
    //   currentImg: this.imgClasses[this.increment % 5]
    // }, () => {
    //   console.log("??");
    //   $(image).fadeIn(100);
    // });
    $(image).fadeOut(250, "linear", () => {
      setTimeout(() => {
        this.setState({ currentImg: "hidden-img" }, () => {
          setTimeout(() => {
            this.setState({
              currentBG: this.bgClasses[this.increment % 5],
              currentImg: this.imgClasses[this.increment % 5]
            });
          }, 500);
          $(image).fadeIn(100, "linear");
        });
      }, 500);
    });
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
      // <main id="splash-main" className={this.state.currentBG}>
      <>
        <div id="splash-backdrop" className={this.state.currentBG} >
          <div id="splash-img" className={this.state.currentImg} />
        </div>
        <main id="splash-main">
          <SplashNavBar className="splash-nav" />
          <SplashMain />
        </main>
        <SplashFooter />
      </>
    );
  }
};

export default Splash;