import axios from 'axios'
export const registerUser=(data)=>{
    return(dispatch)=>{
        axios.post("https://ik-react-task.herokuapp.com/accounts/register/",data.data)
             .then((response)=>{
                 const result=response.data
                 alert(result.message)
                 data.props.history.push('./Login')
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const loginUser=(data)=>{
    return(dispatch)=>{
        axios.post("https://ik-react-task.herokuapp.com/accounts/login/",data.data)
             .then((response)=>{
                 localStorage.setItem("token",response.data.token)
                 data.handleNavBar()
                 alert("You have successfully Logged In")
                 data.props.history.push("./events")
                 dispatch(eventTypes())
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const eventTypes=()=>{
    return(dispatch)=>{
        axios.get("https://ik-react-task.herokuapp.com/events/event_types/",{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
             .then((response)=>{
                 dispatch(validEvents(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const validEvents=(data)=>{
    return({
        type:"EVENT_TYPES",
        payload:data
    })
}
export const newEvent=(data)=>{
    console.log(data)
    return(dispatch)=>{
        axios.post("https://ik-react-task.herokuapp.com/events/",data,{
            headers:{
                "Authorization":`Bearer  ${localStorage.getItem("token")}`
            }
        })
            .then((response)=>{
                console.log(response.data)
                dispatch(newEve(response.data))
            })
            .catch((error)=>{
                alert(error.message)
            })
    }
}
export const newEve=(data)=>{
    return({
        type:"ADD_EVENT",
        payload:data
    })
}
export const events=()=>{
    return(dispatch)=>{
        axios.get("https://ik-react-task.herokuapp.com/events/",{
            headers:{
                "Authorization":`Bearer  ${localStorage.getItem("token")}`
            }
        })
             .then((response)=>{
                 console.log(response.data)
                 dispatch(allEvents(response.data))
             })
             .catch((error)=>{
                 alert(error.message)
             })
    }
}
export const allEvents=(data)=>{
    return({
        type:"ALL_EVENTS",
        payload:data
    })
}