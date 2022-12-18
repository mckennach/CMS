import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

const PageItem = (props) =>  {
    const { page } = props;
    const  id = page._id;
  
    const [title, setTitle] = useState(props.page.title);
    const handleChange = async (event) => {
      const { key } = event;
      const { value } = event.target;
      const updatedPage = {
        title: value,
        slug: value.toLowerCase().replace(/\s/g, '-'),
  
      }
      await fetch(`http://localhost:3000/pages/update/${id}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedPage),
        })
        .then((response) => {
          const jsonPromise = response.json();
          jsonPromise.then((d) => {
            console.log(d);
          });
        });
    }
  
    return (
        <Box 
            component="form"
            noValidate
            autoComplete="off"
            >
            <Card raised={true} sx={{ marginBottom: '20px' }}>
            
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField id="outlined-basic" label="Title" variant="outlined" onFocus={e => e.target.select()} onKeyDown={handleChange} onBlur={handleChange} value={title} onChange={e => setTitle(e.target.value)} />
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button component={Link} to={`/pages/edit/${props.page._id}`}>Edit</Button>
                            <Button component={Link} to={`/pages/configure/${props.page._id}`}>Configure</Button>
                            <Button
                                color="error"
                                onClick={() => {
                                    props.deletePage(props.page._id);
                                }}>Delete</Button>
                        </ButtonGroup>
                        
                        {/* <div className="d-flex align-center">
                            <Link className="btn btn-link" to={`/pages/edit/${props.page._id}`}>Edit</Link> <span className="btn">|</span>
                            <Link className="btn btn-link" to={`/pages/configure/${props.page._id}`}>Configure</Link> <span className="btn">|</span>
                            <button className="btn btn-link"
                            onClick={() => {
                                props.deletePage(props.page._id);
                            }}
                            >
                            Delete
                            </button>
                        </div> */}
                    </CardContent>
            
            </Card>
        </Box>
      
    );
  }

  export default PageItem;
  