import React from 'react';
import { NavLink } from 'react-router-dom';


const SplashMain = (props) => {
  return (
    <div className="splash-content">
      <div className="splash-content-top">
        <h1 className="splash-greeting">Dating Deserves <br />Better</h1>
        <p>On LetsGoEros, you're more than just a photo. You have stories to tell,
           and passions to share, and things to talk about that are more interesting
           than the weather. Get noticed for who you are, not what
         you look like. Because you deserve what dating deserves: better.</p>
      </div>
      <div className="splash-content-join">
        <NavLink className="sign-up-link" to="/signup">Join OKC</NavLink>
      </div>
      <div className="splash-content-bottom">
        <p>By clicking Join, you agree to our Terms of Service. Learn about how we
          process and use your data in our Privacy Policy and how we use cookies and
         similar technology in our Cookie Policy.</p>
      </div>
    </div>
  )
}

export default SplashMain;