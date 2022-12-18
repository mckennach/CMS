import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const AddBlock = (props: any) => {

    const { data, navigate, setData, setBlocks, fetchData } = props;
    const { _id, content } = data;

  


    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database.
          const newBlock = { 
              name: "New Block",
              type: "Plain Text",
              content: {
                text: ''
              }
          };

          await fetch("http://localhost:3000/blocks/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(newBlock),
          })
          .then(response => {
            const jsonPromise = response.json();
            jsonPromise.then((d) => {
              const newPage = {
                _id: d._id
              }
              fetch(`http://localhost:3000/pages/add-block/${_id.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPage),
              })
              .then((resp) => {
                const jsonP = resp.json();
                jsonP.then((d1) => {
                 
                  fetchData();
                  

                  // setBlocks(d1.content);
                  // setData(d1);
                  navigate(`/pages/configure/${_id}`);
                });                
              })
              .catch(error => {
                  window.alert(error);
                  return;
              });
            });
          })
          .catch(error => {
              window.alert(error);
              return;
          });
 
    }

  

  
  
  // This following section will display the form that takes the input from the user.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
      <Typography variant="h5">Block List</Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Box className="form-group">
          <Box className="form-group">
            <Button variant="contained"  type="submit" startIcon={<AddIcon/>}  children="New Block" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddBlock;