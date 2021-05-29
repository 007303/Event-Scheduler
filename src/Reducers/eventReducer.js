const initialState=[]
const eventReducer=(state=initialState,action)=>{
    switch(action.type){
        case "EVENT_TYPES":{
            return([...action.payload])
        }
        default:{
            return state
        }
    }
}
export default eventReducer