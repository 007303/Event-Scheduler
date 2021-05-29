import React from 'react'
import {Link,Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Events from './Events'
import Home from './Home'
import {withRouter} from 'react-router'
const NavBar=(props)=>{
    const {handleNavBar,toggle}=props
    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear()
        handleNavBar()
        props.history.push("./Home")
    }
    return(
        toggle?(
            <div>
                <nav class="navbar navbar-light" style={{backgroundColor: "#62B1F6"}}>
                <div class="col-md-11">
                 </div>
                <Link to="/events" class="text-decoration-none" style={{color:'white'}}>Events</Link>
                <Link onClick={handleLogout} class="text-decoration-none" style={{color:'white'}}>Logout</Link>
                
                </nav>
                <Route path="/events" component={Events}/>
            </div>
        ):(
        <div>
        <nav class="navbar navbar-light" style={{backgroundColor: "#62B1F6"}}>
        <div class="col-md-10">
        </div>
        <Link to="/Home" class="text-decoration-none" style={{color:'white'}}>Home</Link>
        <Link to="/register" class="text-decoration-none" style={{color:'white'}}>Register</Link>
        <Link to='/login' class="text-decoration-none" style={{color:'white'}}>Login</Link>
        </nav>
        <Route path="/register" component={Register} exact={true}/>
        <Route path="/Home" component={Home} exact={true}/>
        <Route path="/login"render={(props)=>{
            return(
                <Login
                {...props}
                handleNavBar={handleNavBar}/>
            )
        }} exact={true}/>
        </div>
        )
        
    )
}
export default withRouter(NavBar)