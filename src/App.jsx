import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navbar } from "./components/navbar/Navbar";
import { COLORS, FONT } from "./assets/constants/theme";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <>
      <Navbar />
      <h1>Vite + React</h1>
      <p style={{ fontFamily: "Elephant" }}>Vite + React</p>
      <p style={{ color: COLORS.blue, fontFamily: FONT.HELVETICA_BOLD }}>Vite + React</p>
      <p style={{ color: COLORS.green, fontFamily: FONT.Montserrat_Bold }}>Vite + React</p>
      <p style={{ color: COLORS.green, fontFamily: 'Helvetica' }}>Vite + React</p>
     
    </>
  );
}

export default App;
