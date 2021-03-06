import React from 'react';

const SplashFooter = (props) => {
  return (
    <footer className="splash-footer">
      <div className="splash-footer-div">
        <span>Replica of OKCupid Built By Aaron Zick. Hire me!</span>
        <span><a target="_blank" href="https://www.aaronzick.com"><i className="fas fa-laptop"></i></a></span>
        <span><a target="_blank" href="https://www.linkedin.com/in/amzick/"><i className="fab fa-linkedin"></i></a></span>
        <span><a target="_blank" href="https://github.com/amzick"><i className="fab fa-github"></i></a></span>
        <span><a target="_blank" href="https://angel.co/aaron-zick"><i className="fab fa-angellist"></i></a></span>
      </div>
    </footer >
  );
}

export default SplashFooter;