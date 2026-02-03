import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import Main from "./page/Main";
import History from "./page/History";
import Profile from "./page/Profile";
import About from "./components/About";
import Messenger from "./page/Messenger";
import ChatBox from "./page/ChatBox";
import Sample from "./page/Sample";

function App() {
  return (
    <div className="layout" style={{ height: "100vh",display: "flex", flexDirection: "column"  }}>
        <BrowserRouter>
          <div className="container mt-2" style={{
            flex: 1,              
            overflowY: "auto",
            scrollbarWidth: "none"
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Main />} />
              <Route path="/home/transcription" element={<History />} />
              <Route path="/home/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/messenger" element={<Messenger />} />
              <Route path="/chat/:userId" element={<ChatBox />} />
              <Route path="/testing" element={<Sample />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
