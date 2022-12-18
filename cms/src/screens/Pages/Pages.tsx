import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreatePage from '../../components/Pages/CreatePage';
import PagesList from '../../components/Pages/PagesList';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Pages = () => {
    const [pages, setPages] = useState([]);
 
    // This method fetches the records from the database.
    useEffect(() => {
      getPages();
      return;
    }, [pages.length]);

    
    async function getPages() {
      const response = await fetch(`http://localhost:3000/pages`);
      console.log(response);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const pages = await response.json();
      setPages(pages);
    }
  
   return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" gutterBottom>Pages</Typography>
      <CreatePage
        pages={pages}
        setPages={setPages}
        getPages={getPages}
         />
      <PagesList 
        pages={pages} 
        setPages={setPages} />
    </Box>
   )
}

export default Pages;