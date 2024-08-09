import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./assets/constants/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Dashboard from "./pages/userdashboard/Dashboard.jsx";
import Setting from "./pages/setting/Setting.jsx";
import "./assets/fonts/MontserratRegular.ttf";
import "./assets/fonts/SFPROMEDIUM.OTF";
import "./assets/fonts/Elephant.ttf";
import "./assets/fonts/HelveticaBold.ttf";
import "./assets/fonts/Helvetica.ttf";
import "./assets/fonts/SFPROREGULAR.OTF";
import "./assets/fonts/MontserratBold.ttf";
import "./assets/fonts/MontserratSemiBold.ttf";
import "./assets/fonts/ZCOOLRegular.ttf";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
