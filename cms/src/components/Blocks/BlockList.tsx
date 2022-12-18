import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import BlockItem from './BlockItem';
// Types
import PlainText from './Types/PlainText';
import RichText from './Types/RichText';
import ImageBlock from './Types/ImageBlock';



const BlockList = (props) => {
    const { setData, data, setBlocks, blocks, route } = props;
    const location = useLocation();

    // This method will delete a record
    const deleteBlock = async (id) => {
        const updatedPage = {
            _id: id
        }
        await fetch(`http://localhost:3000/pages/remove-block/${data._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPage),
        })
        .then(response => {
            const jsonPromise = response.json();
            jsonPromise.then((d) => {
                setData(d);
                fetch(`http://localhost:3000/blocks/delete/${id}`, {
                    method: "DELETE"
                })
                .then((resp) => {
                    const newBlocks = blocks.filter((el) => el._id !== id);
                    setBlocks(newBlocks);   
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


    const updateBlock = async (blockID, updatedBlock, setBlockType) => {
        await fetch(`http://localhost:3000/blocks/update/${blockID}`, {
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
                if(setBlockType) {
                    setBlockType(d.type);
                }
            });
        })
        .catch(error => {
            window.alert('Try again!');
            return;
        });;
      };

    const blockList = () => {
        
        if(route === 'edit') {
            return blocks.map((block) => {
                const { type } = block;
                console.log(block);
                switch(type) {
                    case 'Plain Text':
                      return <PlainText {...props} block={block} key={block._id} updateBlock={updateBlock} />
                    case 'Rich Text':
                      return <RichText {...props} block={block} key={block._id} updateBlock={updateBlock} />
                    case 'Image':
                      return <ImageBlock {...props} block={block} key={block._id} updateBlock={updateBlock} />
                    default:
                      return <RichText {...props} block={block} key={block._id} updateBlock={updateBlock} />
                }   
            });
        } 

        return blocks.map((block, i) => {
          return (
            <BlockItem
              block={block}
              deleteBlock={() => deleteBlock(block._id)}
              updateBlock={updateBlock}
              key={block._id}
            />
          );
        });
    }

    return (
        <Box>
            {blockList()}
        </Box>
    )
}

export default BlockList;