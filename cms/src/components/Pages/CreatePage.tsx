import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';


const CreatePage = (props) => {
  
  const { pages, setPages, getPages } = props;
  
    
 

    // return 'new-page';
  

  // const generateSlug = (req, res, next) => {
  //   var slug = req.body.slug
  //           .replace(/[^\w\s]/gi, "")
  //           .trim()
  //           .replace(/\s+/g, "-")
  //           .toLowerCase();
  
  //   // check if there is existing release with same slug
  //   Release.find({ slug: new RegExp("^" + slug, "i") }, (err, results) => {
  //     if (results == null) {
  //       next();
  //     } else {
  //       var count = results.length + 1;
  //       req.body.slug = `${slug}-${count}`;
  //       next();
  //     }
  //   });
  // };

  const [form, setForm] = useState({
    title: "New Page",
    meta_title: `Site | New Page`,
    meta_canonical: ""
  });

 
 
  const navigate = useNavigate();
  
  // These methods will update the state properties.
  //  function updateForm(value) {
  //    return setForm((prev) => {
  //      return { ...prev, ...value };
  //    });
  //  }
  
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPage = { ...form };
      console.log(newPage);
    await fetch("http://localhost:3000/pages/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPage),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ 
          title: "New Page",
          meta_title: `Site | New Page`,
          meta_canonical: ""
      });
    // navigate("/pages");
    getPages();
  }
  
  // This following section will display the form that takes the input from the user.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
      <Typography variant="h5">Create New Record</Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Box className="form-group">
          <Button variant="contained"  type="submit" startIcon={<PostAddIcon />}  children="New Page" />
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePage;