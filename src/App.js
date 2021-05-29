import React,{useState,useEffect} from 'react'
import NavBar from './components/NavBar'
const App=()=>{
  const [toggle,setToggle]=useState(false)
  const handleNavBar=()=>{
    setToggle(!toggle)
  }
  useEffect(()=>{
    if(localStorage.length===1){
      handleNavBar()
    }
  },[])   
  return (
    <div>
     <NavBar handleNavBar={handleNavBar} toggle={toggle}/>
    </div>
  )
}
export default App;
