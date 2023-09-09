import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import Otp from "./components/Otp"
<<<<<<< HEAD
import Login from "./components/Login"
=======
// import Login from "./components/Login"
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
import Signup from "./components/Signup";

const App = ()=> {
  return(
    <Router>
      <div className="App">
        {/* <Signup/> */}
        <Routes>
          <Route path="/otp" element={<Otp/>}></Route>
<<<<<<< HEAD
          <Route path="/logIn" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
=======
          {/* <Route path="/LogIn" element={<Login/>}></Route> */}
          
>>>>>>> a6fa22614af9b4a55c5fa6c10117065766c3bc53
        </Routes>
      </div>
    </Router>
  )
}

export default App;
