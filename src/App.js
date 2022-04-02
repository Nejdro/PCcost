import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Form from "./components/pages/Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/form" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
