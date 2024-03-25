import React, { useEffect, useState } from "react";
import {getAlluserdata} from '../api';
import { Link, redirect } from "react-router-dom";

const Alluser = () => {
    const [users, setUsers] = useState([])
    useEffect(function(){
        //const item = [{"id":123,"term":"term","description":"test description" }]
         fetch("http://localhost:5000/users", {
          method: 'GET',
          headers: {'Content-Type':'application/json'},
          })
          .then((response) => response.json())
          .then((result) => {console.log(result["data"]);setUsers( result["data"])})
          .catch(error => {
            setUsers({}) 
          });
        //console.log(item)
        
    },[])
    
    return (
        <table border={1}>
            <thead>
                <td>Name</td>
                <td>DOB</td>
                <td>Email</td>
                <td>Adhar</td>
                <td>Mobile</td>
                <td>Edit</td>
            </thead>
            <tbody>
          {
          users.map(item => (
            // Without the `key`, React will fire a key warning
            
            <React.Fragment key={item.id}>
              <tr>
              <td>{item.username}</td>
              <td>{item.dob}</td>
              <td>{item.email}</td>
              <td>{item.id}</td>
              <td>{item.mobile}</td>
              <td> <Link to={`/edituser/${item.id}`}>Edit User</Link></td>
              </tr>
            </React.Fragment>
              
          ))
          }
          </tbody>
        </table>
      );
  };
  
  export default Alluser;