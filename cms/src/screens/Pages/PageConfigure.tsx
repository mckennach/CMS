import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import AddBlock from '../../components/Blocks/AddBlock';
import BlockList from '../../components/Blocks/BlockList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PageConfigure = () => {
 const [form, setForm] = useState({
   name: "",
   position: "",
   level: "",
   records: [],
 });
 const [ blocks, setBlocks ] = useState([]);
 const [data, setData] = useState(null);
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
  
   fetchData();
   return;
 }, [params.id, navigate]);


  async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3000/pages/configure/${params.id.toString()}`);
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const page = await response.json();
     if (!page) {
       window.alert(`Page with id ${id} not found`);
       navigate("/");
       return;
     }
     setForm(page);
     setData(page);
     if(page.content.length > 0) {
      setBlocks(page.content);
     }
   }
 
//  // These methods will update the state properties.
//  function updateForm(value) {
//    return setForm((prev) => {
//      return { ...prev, ...value };
//    });
//  }
 
//  async function onSubmit(e) {
//    e.preventDefault();
//    const editedPerson = {
//      name: form.name,
//      position: form.position,
//      level: form.level,
//    };
 
//    // This will send a post request to update the data in the database.
//    await fetch(`http://localhost:3000/update/${params.id}`, {
//      method: "POST",
//      body: JSON.stringify(editedPerson),
//      headers: {
//        'Content-Type': 'application/json'
//      },
//    });
 
//    navigate("/");
//  }

if(data === null) return null;
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <Box>
      <Box className="d-flex justify-content-between align-items-center pb-5 pt-2">
        <Typography variant="h2" gutterBottom>Configure <u>{data.title}</u></Typography>
        <AddBlock navigate={navigate} data={data} setData={setData} setBlocks={setBlocks} fetchData={fetchData} />   
      </Box>
  
      <Box>
        <BlockList navigate={navigate} data={data} setData={setData} blocks={blocks} setBlocks={setBlocks} fetchData={fetchData} route={`configure`}  />
      </Box>
   </Box>
 );
}

export default PageConfigure;