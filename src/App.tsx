import { Home, Login } from "@mui/icons-material"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "./logo.svg"
import Header from "./components/Header"
import Homepage from "./pages/homepage";
import Basic from "./layouts/Basic";
import Signup from "./pages/SignupPage";
import LoginPage from "./pages/loginpage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<LoginPage/>}/>

        <Route element={<Basic/>}>
        <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>

        // <Header   title="My App"/>
        
      
    
  )
}

export default App
