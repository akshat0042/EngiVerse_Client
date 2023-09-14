import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Otp from "./components/Otp"
import Login from "./components/Login"
import Signup from "./components/Signup";
import Origin from "./components/Origin";
import ProductAdd from "./components/productadd";
import EcomHome from "./components/ecomHome";

const App = ()=> {
  return(
    <Router>
      <div className="App">
        <Routes>
          <Route path="/otp" element={<Otp/>}></Route>
          <Route path="/logIn" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/origin" element={<Origin/>}></Route>
          <Route path="/logInSkip" element={<Login/>}></Route>
          <Route path="/productadd" element={<ProductAdd/>}></Route>
          <Route path="/ecomhome" element={<EcomHome/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
