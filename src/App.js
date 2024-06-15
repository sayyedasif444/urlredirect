import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import URLShortener from "./component/URLShortner";
import Redirect from "./component/Redirect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:shortId" element={<Redirect />}></Route>
          <Route path="/" element={<URLShortener />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
