import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import "./App.css";
import Blog from "./pages/editor/BlogEditor";
import Topics from "./pages/topics/Topics";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
