// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { ThemeProvider } from "@emotion/react";
// import theme from "./theme.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ThemeProvider theme={theme}>
//     <React.StrictMode>
//       <Provider store={store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Provider>
//     </React.StrictMode>
//   </ThemeProvider>
// );

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import theme from "./theme";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);

