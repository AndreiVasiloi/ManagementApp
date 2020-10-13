import React from "react";
import ReactDOM from "react-dom";
import '../node_modules/react-vis/dist/style.css';
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.min.css';
import "./index.css";
import App from "./app/layout/App";
import 'react-calendar/dist/Calendar.css';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/layout/ScrollToTop";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
