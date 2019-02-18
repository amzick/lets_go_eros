import React from 'react';

const LoggedInFooter = (props) => {
  return (
    <footer className="logged-in-footer">
      <div className="logged-in-footer-div">
        <span>Replica of OKCupid Built By Aaron Zick. Hire me!</span>
        <span><a target="_blank" href="https://www.aaronzick.com"><i class="fas fa-laptop"></i></a></span>
        <span><a target="_blank" href="https://www.linkedin.com/in/amzick/"><i className="fab fa-linkedin"></i></a></span>
        <span><a target="_blank" href="https://github.com/amzick"><i className="fab fa-github"></i></a></span>
        <span><a target="_blank" href="https://angel.co/aaron-zick?public_profile=1"><i className="fab fa-angellist"></i></a></span>
      </div>
    </footer >
  );
}

export default LoggedInFooter;