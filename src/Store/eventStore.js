import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import eventReducer from '../Reducers/eventReducer'
import allEvents from '../Reducers/allEvents'
const Store=()=>{
    const configStore=createStore(combineReducers({
        events:eventReducer,
        allEvents:allEvents
    }),applyMiddleware(thunk))
    return configStore
}
export default Store