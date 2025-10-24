import React from "react";
import "./Style/Footer.css";

function Footer() {
  return (
    <>
      <div className="footer-wrapper">
        <div className="content-display">
          <div className="footer-display">
            <h5 className="title-footer">KEEP IN TOUCH</h5>
            <div className="contact-item">

              <a href="https://www.instagram.com/a.arjuuun?igsh=bmY0cHh4dW00aHls" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>


              <a href="https://www.linkedin.com/in/arjun-a-883889266/"  target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>


              <a href="https://github.com/arjoonn"  target="_blank">
                <i className="fa-brands fa-github"></i>
              </a>

            </div>
          </div>
          <div className="contact-item2">
            <h5 className="title-footer">CONTACT ME</h5>
            <p className="footer-description">+91 6282818654</p>
            <p className="footer-description">arjuchempully@gmail.com</p>
          </div>
        </div>
        <div className="copyright">
          <p>&copy;BlogSphere</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
