import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/userdashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";

import Splashscreen from "./pages/splashscreen/Splashscreen";
import {
  CustomErrorToastContainer,
  ToastProvider,
} from "./components/helper/showErrorToast";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splashscreen />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="setting" element={<Setting />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
        </Routes>
        <CustomErrorToastContainer />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/userdashboard/Dashboard";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Setting from "./pages/setting/Setting";
// import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
// import CustomErrorToastContainer from "./components/helper/showErrorToast";
// import Splashscreen from "./pages/splashscreen/Splashscreen";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Splashscreen />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="register" element={<Register />} />
//         <Route path="setting" element={<Setting />} />
//         <Route path="login" element={<Login />} />
//         <Route path="forgotpassword" element={<Forgotpassword />} />
//       </Routes>
//       <CustomErrorToastContainer/>
//     </BrowserRouter>
//   );
// }

// export default App;
