import React from "react";
import {Routes, Route} from 'react-router-dom'
import Collaborators from "./Collaborators";
import Repositories from "./Repositories";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Repositories />} />
        <Route path="/collaborators" element={<Collaborators />} />
      </Routes>
    </div>
  );
}

export default Router
