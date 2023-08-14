import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./footer.scss";
import staticData from "../../data/staticData";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const { address, phone, email } = staticData.ourContacts;
  return (
    <footer>
      <HashLink to={'/#slideshow'} className="footer-logo"></HashLink>
      <div className="footer-info">
        <ul className="footer-left">
          <li>
            <Link to="/about_us">ABOUT US</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contacts">CONTACT</Link>
          </li>
        </ul>
        <ul className="footer-middle">
          <li>
            <Link to="/comment_about_us">CUSTOMER SERVICE</Link>
          </li>
          <li>
            <Link to="info@car.com">{email}</Link>
          </li>
          <li>
            <a href="tel:240-865-3730">{phone}</a>
          </li>
        </ul>
        <ul className="footer-right">
          <li>
            <HashLink to={'/#about_us_map'}>
            {address}
            </HashLink> 
            </li>
          <li className="footer-media">
            <ul className="footer-media-list">
              <li>
                <Link to="/">
                  <YouTubeIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <InstagramIcon />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        2 0 2 3 Autohunt. Developed by Oleksandr Vernichenko
      </div>
    </footer>
  );
};

export default Footer;
