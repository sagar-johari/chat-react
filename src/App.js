import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import { Link } from 'react-router-dom';
import './App.css';
import { CiUser, CiChat1, CiHome  } from "react-icons/ci";


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ display: 'flex', gap: '10px',flexDirection: 'row',justifyContent: 'center',alignItems: 'center' }}>
         <Link to="/"><CiHome /></Link>
         <Link to="/chat"><CiChat1 /></Link>
         <Link to="/login"><CiUser /></Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
