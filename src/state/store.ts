import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistMiddlware } from '../state/middleware/persisteMiddleware';

// import { ActionType } from "./action-types";

const initialState = {};

const middleware = [thunk, persistMiddlware];
export const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))



//test 


// store.dispatch({
// type: ActionType.INSERT_CELL_AFTER,
// payload: {
//     id: null,
//     type: "code"
// }
// })



// store.dispatch({
//     type: ActionType.INSERT_CELL_AFTER,
//     payload: {
//         id: null,
//         type: "text"
//     }
//     })