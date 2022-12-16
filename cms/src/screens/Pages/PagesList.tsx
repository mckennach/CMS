import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Page = (props) => (
    <tr>
      <td>{props.page.title}</td>
      <td>{props.page.position}</td>
      <td>{props.page.level}</td>
      <td>
        <Link className="btn btn-link" to={`/pages/${props.page._id}`}>Configure</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deletePage(props.page._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
);

const PagesList = (props) => {
    
    const { pages, setPages } = props;
    // This method will delete a record
    async function deletePage(id) {
      await fetch(`http://localhost:3000/pages/delete/${id}`, {
        method: "DELETE"
      });
    
      const newPages = pages.filter((el) => el._id !== id);
      setPages(newPages);
    }
    
    // This method will map out the records on the table
    function pageList() {
      return pages.map((page) => {
        return (
          <Page
            page={page}
            deletePage={() => deletePage(page._id)}
            key={page._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
      <div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{pageList()}</tbody>
        </table>
      </div>
    );
}

export default PagesList;