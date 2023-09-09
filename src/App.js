import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Otp from "./components/Otp"
import Login from "./components/Login"
import Signup from "./components/Signup";

const App = ()=> {
  return(
    <Router>
      <div className="App">
        {/* <Signup/> */}
        <Routes>
          <Route path="/otp" element={<Otp/>}></Route>
          <Route path="/logIn" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
