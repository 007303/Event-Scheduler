import React, { useEffect } from 'react'
import Pulse from 'react-reveal/Pulse'
import 'bootstrap/dist/css/bootstrap.min.css'
import home from "../home.PNG"
const Home=(props)=>{
    return(
        <div >
          <div >
           <Pulse>
             <div class="container">
               <div class="mt-5"></div>
          <img src={home}/>
          </div>
        </Pulse>
        </div>
        </div>
    )
}
export default Home