import { redirect, useParams } from 'react-router-dom';
import { useState,useEffect,  } from 'react';
import plan  from '../plans';
import * as Yup from 'yup';
import {url, addUser,fetuser} from '../api';

const AddUser = () => {
    const { id } = useParams();
    let  heading = ""
    let errormessage =""
    if (id) {
        heading =  <h1>Edit User Details </h1>;
    } else {
        heading =  <h1>Add User Details</h1>;
    }

    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const schema = Yup.object().shape({
        username: Yup.string().required().min(3).max(25),
        email: Yup.string().email().required(),
        dob: Yup.string().required().matches(/^(([0-9]{2})\/([0-9]{2})\/([0-9]{4}))$/,'DOB is not in proper format.'),
        aadhar: Yup.string().required().min(10).max(10),
        mobile: Yup.string().required().min(10).max(10),
        plan_id: Yup.string().required(),
        active: Yup.string().required(),
      });

    useEffect(()=>{
        if (id) {
            fetch(url+"users"+"/"+id, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            })
            .then((response) => response.json())
            .then(res => { setInputs(res["data"]) } )
            .catch(error => {
                return {}
            });
        }
        else {
            setInputs({})
            setErrors({})
        }

    },[id])

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let message='';
      schema.validate(inputs,{ abortEarly: false }).then(setErrors([])).catch((err)=> setErrors(err.errors))
      if (errors.length == 0) {
        if (id) {
            inputs['id']=id
            message = addUser(inputs, "users/"+ id)
        } else {
            inputs['id']=9999
            message = addUser(inputs, "users")
        }      
        redirect("/alluser");
    
      }
    }
    if (errors.length > 0) {
        errormessage = errors.map((e) => {
        return (
            <div style={{ color: 'red' }} key={e}>
            {e}
            </div>
        );
        })
    }
    return (
        <>
        {heading}
        {errormessage}
        <form onSubmit={handleSubmit}>

            <div><label>Enter your username:
            <input  type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your DOB in format (dd/mm/yyyy):
            <input type="text" name="dob" value={inputs.dob || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your Email:
            <input type="text" name="email" value={inputs.email || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your Aadhar:
            <input type="text" onKeyPress={(e)=>{if(!/[0-9]/.test(e.key)){ e.preventDefault() } }} name="aadhar" value={inputs.aadhar || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Mobile Number :
            <input type="text" onKeyPress={(e)=>{if(!/[0-9]/.test(e.key)){ e.preventDefault() } }} name="mobile" value={inputs.mobile || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Choose Plan:
            <select name="plan_id" className="form-control" value={inputs.plan_id || ""} onChange={handleChange}>
                <option value="">---Please Select Plan---</option>
                {plan.map(p => (
                    <option value={p.name}>{p.name}</option>)
                )}
            </select>
            </label>
            </div>
            <div>
            <label>Activate Plan:
            <select name="active" className="form-control" value={inputs.active || ""} onChange={handleChange}>
                <option value="">---Please Select Activation---</option>
                <option value="active">Activate</option>
                <option value="deactive">Deactivate</option>
            </select>
            </label>
            </div>
            <input type="submit" />
        </form>
      </>
    )

};
  
export default AddUser;