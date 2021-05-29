import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {eventTypes,newEvent,events} from '../Actions/regsiterActions'
import Modal from "react-bootstrap/Modal";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import SlotPicker from 'slotpicker'
import "bootstrap/dist/css/bootstrap.min.css"
import moment from 'moment'
const Events=(props)=>{
    const [toggle,setToggle]=useState(false)
    const [event,setEvent]=useState("")
    const [eventName,setEventName]=useState("")
    const [date,setDate]=useState("")
    const [startTime,setStartTime]=useState("")
    const [endTime,setEndTime]=useState("")
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
    const options=eventType.map((ele)=>{
        return(
              {label:ele,
                value:ele}
        )
    })
    const handleEventType=(e)=>{
        setEventName(e.value)
    }
    const handleData=()=>{
        const data={
            id:Math.round(Math.random()*100),
            name:event,
            event_type:eventName,
            start:(`${date}T${(Number(Math.floor(startTime)))}:00:00.000Z`),
            end:(`${date}T${(Number(Math.ceil(startTime)))}:30:00.000Z`)
        }
        console.log(data)
        dispatch(newEvent(data))
        setToggle(!toggle)
        setEvent("")
        setDate("")
    }
    const handleTime=(e)=>{
        setStartTime(e/60)
        setEndTime((e/60)+0.5)
    }
    const handleDate=(e)=>{
        setDate(e.target.value)
    }
    return(
        <div class="container">
        <div>
            <h2>Events</h2>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Event title</th>
                        <th>Event type</th>
                        <th>Start-Time</th>
                        <th>End-Time</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allEvents&&allEvents.map((ele)=>{
                        return(<tr>
                            <td>{ele.name}</td>
                            <td>{ele.event_type}</td>
                            <td>{ele.start.slice(-9)}</td>
                            <td>{ele.end.slice(-9)}</td>
                            <td>{moment(ele.start.slice(0,10)).format('MMMM Do YYYY')}</td>
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
                <input type="text" value={event} onChange={handleEvent} placeholder="Event Name" className="form-control"/><br/>
                <Select 
                    options={options}
                    placeholder="Event Type"
                    theme={makeAnimated}
                    onChange={(e)=>{handleEventType(e)}}
                    isSearchable/><br/>
                    <div  class="form-control">
                   <input type="text" value={date} onChange={handleDate} placeholder="YYYY-DD-MM" class="form-control"/> 
                    <SlotPicker 
                        interval={30}
                        unavailableSlots={[]}
                        selected_date={date}
                        from={1*60} 
                        to={24*60} 
                        lang={'en'}
                        onSelectTime={(e) => {handleTime(e)}}

                        />
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