import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'; 


// We import all the components we need in our app
// import "bootstrap/dist/css/bootstrap.css";
import SideNav from "./components/SideNav";
import Pages from "./screens/Pages/Pages";
import PageConfigure from "./screens/Pages/PageConfigure";
import PageEdit from "./screens/Pages/PageEdit";

 
const App = () => {
 return (
   <main className="d-flex vh-100">
      <Box height="100vh" sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
          <SideNav />
          <Container maxWidth="lg" sx={{
            overflowY: "scroll",
            paddingTop: '50px',
            paddingBottom: '50px'
          }}>
            <Routes>
              <Route path="/pages" element={<Pages />} />
              <Route path="/pages/configure/:id" element={<PageConfigure />} />
              <Route path="/pages/edit/:id" element={<PageEdit />} />
              <Route path="/posts" element={<Pages />} />
            </Routes>
          </Container>

        
      </Box>
   </main>
 );
};
 
export default App;