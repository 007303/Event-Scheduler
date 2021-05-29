const initialState=[]
const allEvents=(state=initialState,action)=>{
    switch(action.type){
        case "ALL_EVENTS":{
            return [...action.payload]
        }
        case "ADD_EVENT":{
            return([...state,{...action.payload}])
        }
        default:{
            return state
        }
    }
}
export default allEvents