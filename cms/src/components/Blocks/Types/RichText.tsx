import React, { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
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
import Typography from '@mui/material/Typography';



const RichText = (props) => {
    const { block, updateBlock } = props;
    const { name, slug, _id, content } = block;
    const [ text, setText ] = useState(content.text);
    
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setText(editorRef.current.getContent());
        }
    };

    const handleChange = (newValue, editor) => {
        const value = editor.getContent();
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
                    <Editor
                        onEditorChange={(newValue, editor) => {
                            handleChange(newValue, editor)
                            // setText(editor.getContent());
                        }}
                        tinymceScriptSrc={'https://cdn.tiny.cloud/1/tnfqkpguqtbaejyzpbstbgltb6afvguotxp7enppjb3lebpg/tinymce/6/tinymce.min.js'}
                        onInit={(evt, editor) => editorRef.current = editor}
                        // initialValue={text}
                        value={text}
                        init={{
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor code | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            skin: "oxide-dark",
                            content_css: "dark"
                        }}
                    />
                </FormControl>
            </CardContent> 
        </Card>
    );
};

export default RichText;