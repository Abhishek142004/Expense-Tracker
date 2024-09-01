import Home from "./Components/Home";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Profile from "./Components/Profile";
import Need_to_sign_in from "./Components/Need_to_sign_in";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home value="home" />} />
          <Route exact path="/About" element={<Home value="about" />} />
          <Route exact path="/History" element={<Home value="history" />} />
          <Route exact path="/Profile" element={<Home value="profile" />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Need" element={<Home value="need" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
