import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {eventTypes,newEvent,events} from '../Actions/regsiterActions'
import Modal from "react-bootstrap/Modal";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import "react-datepicker/dist/react-datepicker.css"
import DateTimePicker from 'react-datetime-picker'
import "bootstrap/dist/css/bootstrap.min.css"
import  { Inject,ScheduleComponent,Day,Week,Month,Agenda} from '@syncfusion/ej2-react-schedule'
import  { EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {DataManager,WebApiAdaptor } from '@syncfusion/ej2-data'
import moment from 'moment'
const Events=(props)=>{
    const [toggle,setToggle]=useState(false)
    const [event,setEvent]=useState("")
    const [eventName,setEventName]=useState("")
    const [date, setDate] = useState(new Date())
    const [startTime,setStartTime]=useState("")
    const [endTime,setEndTime]=useState("")
    const [errors,setErrors]=useState({})
    const error={}
    const unAvailable=[]
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(eventTypes())
    },[])
    const allEvents=useSelector((state)=>{
        return state.allEvents
    })
    useEffect(()=>{
        dispatch(events())
    },[allEvents])
    const eventType=useSelector((state)=>{
        return state.events
    })
    console.log(allEvents)
    const handleAddEvent=(e)=>{
        setToggle(!toggle)
    }
    const handleEvent=(e)=>{
        setEvent(e.target.value)
    }
    const errorValidation=()=>{
        if(event.length==0){
            error.event="Kindly Enter The Event"
        }
        if(eventName.length==0){
            error.eventName="Kindly enter the Event Type"
        }
        if(date.length==0){
            error.date="Kindly Enter the Date"
        }
    }
    const options=eventType.map((ele)=>{
        return(
              {label:ele,
                value:ele}
        )
    })
    const handleEventType=(e)=>{
        setEventName(e.value)
    }
    const handleData=(e)=>{
        e.preventDefault()
        errorValidation()
        if(Object.keys(error).length==0){
            const data={
                id:Math.round(Math.random()*100),
                name:event,
                event_type:eventName,
                start:(date),
                end:(date)
            }
            console.log(data)
            console.log(unAvailable)
            dispatch(newEvent(data))
            setToggle(!toggle)
            setEvent("")
            setDate("")
        }else{
            setErrors(error)
        }
        
    }
    const handleTime=(e)=>{
        setStartTime(e/60)
        setEndTime((e/60)+0.5)
        unAvailable.push(`${(e/60)}*60`)
        console.log(unAvailable) 
    }
   

    const handleDate=(e)=>{
        setDate(e)
    }
    console.log(date)
    let dat=""
    let data = allEvents&&allEvents.map((ele,i)=>{
         dat=(new Date(ele.start).toLocaleDateString())
            return({
                Id: i,
                Subject:ele.name,
                StartTime: new Date(new Date(2021,(dat.slice(-8,-7)=="/"?dat.slice(2,4):dat.slice(2,3)),dat.slice(2,3), `${ele.start.slice(11,13)},${ele.start.slice(14,16)})`)),
                EndTime: new Date(new Date(2021,(dat.slice(-8,-7)=="/"?dat.slice(2,4):dat.slice(2,3)),dat.slice(2,3),  `${ele.start.slice(11,13)},${ele.start.slice(14,16)})`))
            })
        })
      
       
       console.log(new Date(dat.slice(5),dat.slice(0,1),dat.slice(2,3)))
       console.log(dat)
       console.log(dat.slice(0,1))//6/17/2021 m 6/2/2021
       console.log(dat.slice(2,4))//d
       console.log(dat.slice(5))//y
       if(dat.slice(-8,-7)=="/"){
        console.log(dat.slice(2,4))
       }else{
        console.log(dat.slice(2,3))
       }
       if(dat.slice(-5,-7)=="/"){
        console.log(dat.slice(5))
       }else{
        console.log(dat.slice(-5,-7))
       }
       
    return(
        
        <div class="container">
        <div>
            <h2>Events</h2>
           <ScheduleComponent currentView='Month' selectedDate={new Date(2021,(dat.slice(-8,-7)=="/"?dat.slice(2,4):dat.slice(2,3)),dat.slice(2,3))} eventSettings={{ dataSource:data }}>
               <Inject services={[Day,Week,Month,Agenda]}/>
           </ScheduleComponent>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Event title</th>
                        <th>Event type</th>
                        <th>Start-Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allEvents&&allEvents.map((ele)=>{
                        return(<tr>
                            <td>{ele.name}</td>
                            <td>{ele.event_type}</td>
                            <td>{`${ele.start.slice(11,13)}${ele.start.slice(13,16)} ${ele.start.slice(11,13)>12?`PM`:`AM`}`}</td>
                            <td>{(ele.start.slice(0,10))}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-2 align-center">
            <button onClick={handleAddEvent} class="btn btn-primary">Add Event</button>
            </div>
            </div>
            </div>

        </div>
         <Modal show={toggle}>
         <Modal.Header><h4>Add Event</h4></Modal.Header>
         <Modal.Body>
            <form >
                <input type="text" value={event} onChange={handleEvent} placeholder="Event Name" className="form-control"/>
                {errors.event&&<span>{errors.event}</span>}<br/>
                <Select 
                    options={options}
                    placeholder="Event Type"
                    theme={makeAnimated}
                    onChange={(e)=>{handleEventType(e)}}
                    isSearchable/>
                    {errors.eventName&&<span>{errors.eventName}</span>}<br/>
                    <div  class="form-control">
                        <DateTimePicker
                            onChange={handleDate}
                            value={date}
                        />
                        {errors.date&&<span>{errors.date}</span>}
                    </div>
                    
            </form>
         </Modal.Body>
         <Modal.Footer>
            <button onClick={handleData} class="btn btn-primary">Save Event</button>
            <button onClick={()=>{setToggle(!toggle)}} class="btn btn-outline-primary">Cancel</button>
         </Modal.Footer>
         </Modal>
         
        </div>
    )
}
export default Events