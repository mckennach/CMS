import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Block = (props) => {
    const { block } = props;
    return (
        <li>
            {block.name}
            {/* <Link className="btn btn-link" to={`/pages/${block._id}`}>Configure</Link> | */}
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteBlock(block._id);
                }}>
                Delete
            </button>
        </li>
    );
};

const BlockList = (props) => {
    const { navigate, setData, data, setBlocks, blocks } = props;
    // This method will delete a record
    async function deleteBlock(id) {
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

    const blockList = () => {
        console.log(blocks);
        return blocks.map((block, i) => {
          return (
            <Block
              block={block}
              deleteBlock={() => deleteBlock(block._id)}
              key={block._id}
            />
          );
        });
    }

    return (
        <div>
            <ul>
                {blockList()}
            </ul>
        </div>
    )
}

export default BlockList;