
// *******ffor func
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(<App />);





import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './Quill/Editor';
function App() {
  return (
    <div className="App">
      <Editor/>
    </div>
    
  );
  
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
