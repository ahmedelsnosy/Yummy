import React, {  useState } from 'react'
import Style from './Register.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'
export default function Register() {
  
  let navigate = useNavigate();
  const [User, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password:""
  })
const [isLoading, setisLoading] = useState(false)
  const [erorrFApi, seterorrFApi] = useState("")
  const [erorrValidate, seterorrValidate] = useState([])
  let getUserData = (e) => {
    let myUser = { ...User };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    // console.log(myUser);
  }

  
  let sendDataToApi =async () => {
    let { data } = await axios.post(`https://movies-api.routemisr.com/signup`, User)
    // console.log();
    if (data.message === "success") {
      
      navigate('/login')
      setisLoading(false)
    }
    else { 
      setisLoading(false)
      seterorrFApi(data.message)

    }

  }

  let validationFromJoi = () => {
    let schema = joi.object({
      first_name: joi.string().min(3).max(25).required(),
      last_name: joi.string().min(3).max(25).required(),
      age: joi.number().max(90).min(20).required(),
      email: joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password: joi.string().pattern(/^[A-Z][1-9]{3,8}/).required(),

      
    })
     return schema.validate(User,{abortEarly:false})
    }


  let submitData = (e) => {
    setisLoading(true)
    e.preventDefault();
    let validate = validationFromJoi();
    if (validate.error) {
      setisLoading(false)
      seterorrValidate(validate.error.details)

    }
    else {
      sendDataToApi()

    }
  }
  


return <>
    
  <div className="container my-5">
    <h2 className='text-center'><span className={`${Style.R}`}>R</span>egister Now</h2>
    <div className={`${Style.register} `}>
      <form onSubmit={submitData}>
      {erorrFApi ? 
        <div className='alert alert-primary my-2'>
          {erorrFApi}
        </div>
      :""}
        <label htmlFor="first_name">First Name</label>
        <input onChange={getUserData} type="text" name="first_name" id="first_name" className='form-control' />
        {erorrValidate.filter((err) =>
          err.context.label === "first_name")[0] ? <div className='alert alert-primary'>
          {erorrValidate.filter((err) =>
            err.context.label === "first_name")[0]?.message}
        </div> : ""}        <label htmlFor="last_name">Last Name</label>
        <input onChange={getUserData} type="text" name="last_name" id="last_name" className='form-control' />
        {erorrValidate.filter((err) =>
          err.context.label === "last_name")[0] ? <div className='alert alert-primary'>
          {erorrValidate.filter((err) =>
            err.context.label === "last_name")[0]?.message}
        </div> : ""} 
        <label htmlFor="age">Age</label>
        <input onChange={getUserData} type="number" name="age" id="age" className='form-control' />
        {erorrValidate.filter((err) =>
          err.context.label === "age")[0] ? <div className='alert alert-primary'>
          {erorrValidate.filter((err) =>
            err.context.label === "age")[0]?.message}
        </div> : ""} 
        <label htmlFor="email">Email</label>
        <input onChange={getUserData} type="email" name="email" id="email" className='form-control' />
        {erorrValidate.filter((err) =>
          err.context.label === "email")[0] ? <div className='alert alert-primary'>
          {erorrValidate.filter((err) =>
            err.context.label === "email")[0]?.message}
        </div> : ""} 
        <label htmlFor="password">Password</label>
        <input onChange={getUserData} type="password" name="password" id="password" className='form-control' />
        {erorrValidate.filter((err) =>
          err.context.label === "password")[0] ? <div className='alert alert-primary'>
          {erorrValidate.filter((err) =>
            err.context.label === "password")[0]?.message}
        </div> : ""} 
        <button className='btn btn-primary float-end my-4'>{isLoading?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
        <div className="clearfix"></div>

      </form>
    </div>
      </div>
  
  </>
}
