import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Otp from "./components/main/Otp"
import Login from "./components/main/Login"
import Signup from "./components/main/Signup";
import Chatmain from "./components/chat/Chatmain";

const App = ()=> {
  return(
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/otp" element={<Otp/>}></Route>
          <Route path="/logIn" element={<Login/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/chatmain" element={<Chatmain/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
