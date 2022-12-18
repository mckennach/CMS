import React, { useEffect, useState } from "react";
import ImageUploading from 'react-images-uploading';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const ImageBlock = (props) => {
    const { block } = props;
    const { name, slug } = block;
    const [ text, setText ] = useState(name);
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    return (
        <Card raised={true} sx={{ marginBottom: '20px' }}>
            <CardContent >
                <Typography variant="h5" gutterBottom>{name}</Typography>

                <FormControl fullWidth margin="dense">
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={['jpg', 'gif', 'png']}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            >
                            Click or Drop here
                            </Button>
                            &nbsp;
                            <Button onClick={onImageRemoveAll}>Remove all images</Button>
                            {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </ImageUploading>
                </FormControl>
                {/* <label className="d-block" htmlFor={slug}>{name}</label>
                <input name={slug} type="text" value="" placeholder="" /> */}
            </CardContent> 
        </Card>
    );
};

export default ImageBlock;