import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Register from "./page/Register";

function App() {
  return (
    <div className="layout" style={{height:"100vh", backgroundColor:"darkgray"}}>
      <BrowserRouter>
      <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
