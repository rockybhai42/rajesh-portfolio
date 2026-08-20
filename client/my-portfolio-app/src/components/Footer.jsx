import "../styles/footer.css"
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaEnvelope
} from "react-icons/fa";

function Footer (){
    return(
         <footer className="footer">
            <h2>Rajesh Kumar Portfolio</h2>
            <p>full stack web developer</p>
            <div className="footer-links">
         <a href="https://github.com/rockybhai42/" target="_blank">
             <FaGithub />
          GitHub
        </a>

        <a href="mailto:rajeshskkanagaraj2001@gmail.com">
            <FaEnvelope />
          Email
        </a>

            </div>

            <p className="copyright">

                &copy; © 2026 Rajesh. All rights reserved.
            </p>
          <Link to="/admin" className="admin-link">
            Admin
          </Link>

         </footer>
    )
}

export default Footer;