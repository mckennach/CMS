import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const PlainText = (props) => {
    const { block, updateBlock } = props;
    const { name, slug, content, _id } = block;
    const [ text, setText ] = useState(content.text);

    const handleChange = (e) => {
        const { value } = e.target;
        const updatedBlock = {
            content: {
                text: value
            }
        }
        setText(value);
        updateBlock(_id, updatedBlock, false);
    }


    return (
        <Card raised={true} sx={{ marginBottom: '20px' }}>
            <CardContent >
                <Typography variant="h5" gutterBottom>{name}</Typography>
                <FormControl fullWidth margin="dense">
                    <TextField
                        variant="outlined"
                        label={name}
                        type="text" 
                        name={name}
                        value={text} 
                        placeholder={name}
                        onChange={handleChange}
                    />
                </FormControl>
                {/* <label className="d-block" htmlFor={slug}>{name}</label>
                <input name={slug} type="text" value="" placeholder="" /> */}
            </CardContent> 
        </Card>
    );
};

export default PlainText;