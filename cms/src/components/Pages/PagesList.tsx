import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageItem from './PageItem';
import Box from '@mui/material/Box';

const PagesList = (props) => {
    
    const { pages, setPages } = props;
    // This method will delete a record
    const deletePage = async (id) => {
      await fetch(`http://localhost:3000/pages/delete/${id}`, {
        method: "DELETE"
      })
      .then((response) => {
        console.log(response);
      });
    
      const newPages = pages.filter((el) => el._id !== id);
      setPages(newPages);
    }
    
    // This method will map out the records on the table
    function pageList() {
      return pages.map((page) => {
        return (
          <PageItem
            page={page}
            deletePage={() => deletePage(page._id)}
            key={page._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <Box>
          {pageList()}
      </Box>
    );
}

export default PagesList;