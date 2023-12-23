import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import joi from 'joi'
import axios from 'axios'
import Style from './Login.module.css'
import { Helmet } from 'react-helmet'
export default function Login({SaveUserData}) {
  let navigate = useNavigate();
  const [User, setUser] = useState({
    
    email: "",
    password: ""
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


  let sendDataToApi = async () => {
    let { data } = await axios.post(`https://movies-api.routemisr.com/signin`, User)
    console.log(data);
    if (data.message === "success") {
      localStorage.setItem("token", data.token)
      SaveUserData()
      setisLoading(false)
      navigate("/")
    }
    else {
      seterorrFApi(data.message)
      setisLoading(false)

    }

  }

  let validationFromJoi = () => {
    let schema = joi.object({
      email: joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password: joi.string().pattern(/^[A-Z][1-9]{3,8}/).required(),


    })
    return schema.validate(User, { abortEarly: false })
  }


  let submitData = (e) => {
    e.preventDefault();
    setisLoading(true)
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

    <Helmet>
      <title>
       Login
      </title>
    </Helmet>
    <div className="container my-5">
      <h2 className='text-center'><span className={`${Style.R}`}>L</span>ogin Now</h2>
      <div className={`${Style.register} `}>
        <form onSubmit={submitData}>
          {erorrFApi ?
            <div className='alert alert-primary my-2'>
              {erorrFApi}
            </div>
            : ""}
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
          <button className='btn btn-primary float-end my-4'>{isLoading? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
          <div className="clearfix"></div>

        </form>
      </div>
    </div>

  </>
}
