import React from "react";

import Chat from "./pages/Chat/Chat";
import Join from "./pages/Join/Join";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Join />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
    </Router>
  );
};

export default App;
