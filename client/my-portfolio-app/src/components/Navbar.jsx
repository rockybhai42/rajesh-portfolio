import "../styles/navbar.css";
import { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";
import { FaMoon,FaSun } from "react-icons/fa";
import { useEffect } from "react";




function Navbar({theme, setTheme}) {
    const [isMobileMenuOpen, setMobileMenuopen] = useState(false);
    const closeMenu =() => setMobileMenuopen(false);
    return (
        <nav className="navbar">
            <div className="logo">Rajesh Kumar</div>

            <button
              type="button"
              className="menu-icon"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={()=>setMobileMenuopen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
             <ul className={isMobileMenuOpen ? "nav-links active" : "nav-links"}>
                <li><a href="#home" onClick={closeMenu}>Home</a></li>
                <li><a href="#about" onClick={closeMenu}>About</a></li>
                <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
                <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>
           
           <button className="theme-toggle" onClick={()=> setTheme( theme === "dark" ? "light":"dark")}> 
            {theme === "dark" ? <FaSun /> : <FaMoon />}
           </button>

        </nav>
    )
}


export default Navbar;