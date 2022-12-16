import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import SideNav from "./components/SideNav";
import Pages from "./screens/Pages/Pages";
import Page from "./screens/Pages/Page";

 
const App = () => {
 return (
   <div>
     <SideNav />
     <Routes>
       <Route path="/pages" element={<Pages />} />
       <Route path="/pages/:id" element={<Page />} />
     </Routes>
   </div>
 );
};
 
export default App;