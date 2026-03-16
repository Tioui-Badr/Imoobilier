import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ IMPORTS CORRECTS
import Login from './component/Sign up/Login';
import Home from './component/home/Home';

function App() {
  return (
    <div className="App">
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
