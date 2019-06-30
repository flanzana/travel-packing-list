import React from 'react';

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { data } from "./services/data";

function App() {
  return (
    <div className="App">
      <Header />
      <Main data={data} />
      <Footer />
    </div>
  );
}

export default App;
