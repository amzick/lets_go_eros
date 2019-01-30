import React from 'react';
import { Link } from 'react-router-dom';

const SplashFooter = (props) => {
  return (
    <footer className="splash-footer">
      <div className="splash-footer-div">
        <span>Replica of OKCupid Built By Aaron Zick. Hire me!</span>
        <span><a target="_blank" href="https://www.linkedin.com/in/amzick/"><i class="fab fa-linkedin"></i></a></span>
        <span><a target="_blank" href="https://github.com/amzick"><i class="fab fa-github"></i></a></span>
        <span><a target="_blank" href="https://angel.co/aaron-zick?public_profile=1"><i class="fab fa-angellist"></i></a></span>
      </div>
    </footer >
  );
}

export default SplashFooter;