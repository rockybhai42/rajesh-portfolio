import "../styles/footer.css"
import {
  FaGithub,
  FaLinkedin,
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

        <a href="https://github.com/rockybhai42/" target="_blank">
        
            <FaLinkedin />
          LinkedIn
        </a>

        <a href="mailto:rajeshskkanagaraj2001@gmail.com">
            <FaEnvelope />
          Email
        </a>

            </div>

            <p className="copyright">

                &copy; © 2026 Rajesh. All rights reserved.
            </p>
         </footer>
    )
}

export default Footer;