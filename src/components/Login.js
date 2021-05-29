import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import Validator from 'validator'
import {loginUser} from '../Actions/regsiterActions'
const Login=(props)=>{
    const {handleNavBar}=props
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errors,setErrors]=useState({})
    const error={}
    const dispatch=useDispatch()
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }
    const errorValidation=()=>{
        if(email.length===0){
            error.email="Email feild cannot be Blank"
        }else if(!Validator.isEmail(email)){
            error.email="Inavlid email format"
        }
        if(password.length===0){
            error.password="Password feild cannot be Blank"
        }
    }
    const handleCancel=()=>{
        setEmail("")
        setPassword("")
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        errorValidation()
        if(Object.keys(error).length===0){
            const data={
                email:email,
                password:password
            }
            console.log(data)
            dispatch(loginUser({data,props,handleNavBar}))
        }else{
            setErrors(error)
        }
    }
    return(
        <div>
        <div class="mt-5"> 
              <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-4 align-center">
           <form onSubmit={handleSubmit}>
           <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-6 align-center">
               <h2>Login</h2>
               </div>
               </div>
               </div>
               <div class="col-md-10">
               <input type="text" value={email} onChange={handleEmail} placeholder="Email" class="form-control"/>
               {errors.email&&<span>{errors.email}</span>}<br/>
               </div>
               <div class="col-md-10">
               <input type="password" value={password} onChange={handlePassword} placeholder="Password" class="form-control"/>
               {errors.password&&<span>{errors.password}</span>}<br/>
               </div>
               <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-7 align-center">
                <div class="row">
                <div class="col-md-5">
               <input type="submit" value="Login" class="btn btn-primary"/>
               </div>
               <div class="col-md-5">
               <button class="btn btn-outline-primary" onClick={handleCancel}>Cancel</button>
               </div>
               </div>
               </div>
               </div>
               </div>
           </form>
           </div>
           </div>
           </div>
           </div>
           </div>
    )
}
export default Login