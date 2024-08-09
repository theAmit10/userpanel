import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/userdashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { Navbar } from "./components/navbar/Navbar";
// import { COLORS, FONT } from "./assets/constants/theme";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from "./pages/userdashboard/Dashboard";
// import Login from "./pages/login/Login";

// function App() {
//   return (
//      <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />}>
//           <Route path="login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
