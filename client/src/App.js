import "./app.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";





function App() {

    return (
        <div  className="App">
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path={"/admin/*"} element={<Admin/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/privacy"} element={<Privacy/>}/>
                <Route path={"/terms"} element={<Terms/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
            </Routes>
            <div>
                <Toaster
                    position="bottom-left"
                />
            </div>
        </div>
    );
}

export default App;