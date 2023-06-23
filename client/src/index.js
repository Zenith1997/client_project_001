import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={'/'}>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);