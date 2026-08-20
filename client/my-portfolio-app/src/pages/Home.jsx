import "../styles/app.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";

function Home (){
  const [theme, setTheme] = useState(localStorage.getItem("theme")||"dark");
  useEffect(()=>{
    localStorage.setItem("theme",theme);
  },[theme]);

  return(
    <>
    <div className={theme}>
        <Navbar theme = {theme} setTheme = {setTheme} />
        <Hero theme={theme} />
        <About />
        <Skills /> 
        <Projects /> 
        <Contact /> 
        <Footer />
    </div>
    </>
  )
}

export default Home;


