import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const BlockItem = (props) => {
    const { block, deleteBlock } = props;
    const { name, type, _id }  = block;
    const [ blockName, setBlockName] = useState(name);
    const [ blockType, setBlockType] = useState(type);

    const update = async (updatedBlock) => {
        await fetch(`http://localhost:3000/blocks/update/${_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlock),
        })
        .then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((d) => {
                console.log(d);
                setBlockType(d.type);
            });
        })
        .catch(error => {
            window.alert('Try again!');
            return;
        });;
    };

   

    const handleSelectChange = async (event) => {
        const { value } = event.target;
        setBlockType(value);
        
        const getContent = () => {
            switch(value) {
                case 'Plain Text':
                    return {text: ''}
                case 'Rich Text':
                    return {text: ''}
                case 'Image':
                    return {
                        images: []    
                    }
                default:
                    return {text: ''}
            } 
        }

        const updatedBlock = {
            type: value,
            content: getContent()
        };
        
        update(updatedBlock); 
    };

    // const handleInputChange = async (event) => {
    //     const { key } = event;
    //     const { value } = event.target;
    //     setBlockName(value);
    // };

    const handleKeyPress = async (event) => {
        const { key } = event;
        const { value } = event.target;
        const updatedBlock = {
            name: value,
            slug: value.toLowerCase().replace(/\s/g, '-')
        };
        
       
        // update(updatedBlock); 
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const updatedBlock = {
            name: blockName,
            slug: blockName.toLowerCase().replace(/\s/g, '-')
        };
        update(updatedBlock); 

    }


    return (
        <Box 
            component="form"
            noValidate
            autoComplete="off"
            id={`block-form-${_id}`} 
            onSubmit={onSubmit}
            >
            <Card raised={true} sx={{ marginBottom: '20px' }}>
           
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <FormControl fullWidth margin="dense">
                            <TextField
                                    variant="outlined"
                                    label="Name"
                                    type="text" 
                                    name="name"
                                    value={blockName} 
                                    onKeyDown={handleKeyPress}
                                    onBlur={onSubmit}
                                    // onFocus={e => e.target.select()} 
                                    onChange={e => setBlockName(e.target.value)} />
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel id="demo-simple-select-label">Block Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Block Type"
                                value={blockType} onChange={e => handleSelectChange(e)}
                            >
                                <MenuItem value="Plain Text">Plain Text</MenuItem>
                                <MenuItem value="Rich Text">Rich Text</MenuItem>
                                <MenuItem value="Link">Link</MenuItem>
                                <MenuItem value="Image">Image</MenuItem>
                                <MenuItem value="Image Gallery">Image Gallery</MenuItem>
                                <MenuItem value="Video">Video</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            color="error"
                            onClick={() => {
                                deleteBlock(block._id);
                            }}>
                            Delete
                        </Button>
                    </Box>
                   
                </CardContent> 
          
                {/* <Link className="btn btn-link" to={`/pages/${block._id}`}>Configure</Link> | */}
               
            </Card>
        </Box>
        
    );
};



export default BlockItem;