import React, { useEffect, useState } from 'react';

const Footer = () => {

  const[showFooter,setShowFooter]=useState(true)
  const pageURL = window.location.href

  useEffect(()=>{
    if (pageURL.includes('shipping') || pageURL.includes('thankyou')) {
      setShowFooter(false);
  }
  },[pageURL,showFooter])



  return (
    <>
         {
          showFooter &&  (<footer>
          <img
            src="https://res.cloudinary.com/denmnkoks/image/upload/v1711443436/cooltees-logo_aschuy.png"
            alt=""
            className="footer-logo"
          />
          <p className="f-para">
            Premium Quality t-shirts, polo shirts, shirts & clothes at the best and
            most affordable price. <br />
            We have a new offer every day for 365 days.
          </p>
          <p className="f-C-info">
            Contact <br />
            E-cooltees@ct.io | Hotline: +1 131 138 138
          </p>
          <div className="f-rights">
            DESIGN BY COOLTEES - © 2022. ALL RIGHTS RESERVED.
          </div>
        </footer>)
         }

    </>
  );
};

export default Footer;
