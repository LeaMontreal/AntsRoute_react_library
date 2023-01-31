import React from "react";
import "./App.css";
import { ExploreTopBooks } from "./layouts/HomePage/ExploreTopBooks";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
    </div>
  );
}

export default App;
