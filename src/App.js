import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Otp from "./components/main/Otp"
import Login from "./components/main/Login"
import Signup from "./components/main/Signup";
import Origin from "./components/main/Origin";
import ProductAdd from "./components/ecom/productadd";
import EcomHome from "./components/others/ecomHome";
// import Sidebar from "./components/others/Sidebar";
import Productshow from "./components/ecom/productshow";
import Chatmain from "./components/chat/Chatmain";
import Indipro from"./components/ecom/indiproduct";
import MainE from "./components/ecom/MainE";
import Cart from "./components/ecom/cart";
import Settings from "./components/others/settings";
import Chatadmin from "./components/chat/Chatadmin";

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
          <Route path="/productshow" element={<Productshow/>}></Route>
          <Route path="/chatmain" element={<Chatmain/>}></Route>
          <Route path="/indip" element={<Indipro/>}></Route>
          <Route path="/Ecom" element={<MainE/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/setting" element={<Settings/>}></Route>
          <Route path="/Chatadmin" element={<Chatadmin/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
