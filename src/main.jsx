import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./assets/constants/theme.js";
import "./assets/fonts/MontserratRegular.ttf";
import "./assets/fonts/SFPROMEDIUM.OTF";
import "./assets/fonts/Elephant.ttf";
import "./assets/fonts/HelveticaBold.ttf";
import "./assets/fonts/Helvetica.ttf";
import "./assets/fonts/SFPROREGULAR.OTF";
import "./assets/fonts/MontserratBold.ttf";
import "./assets/fonts/MontserratSemiBold.ttf";
import "./assets/fonts/ZCOOLRegular.ttf";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//      <App/>
//   </React.StrictMode>,
// )

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
