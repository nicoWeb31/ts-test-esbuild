import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

import { ActionType } from "./action-types";

const initialState = {};

const middleware = [thunk];
export const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))



//test 


// store.dispatch({
// type: ActionType.INSERT_CELL_BEFORE,
// payload: {
//     id: null,
//     type: "code"
// }
// })



// store.dispatch({
//     type: ActionType.INSERT_CELL_BEFORE,
//     payload: {
//         id: null,
//         type: "text"
//     }
//     })