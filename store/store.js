import {applyMiddleware, combineReducers, createStore} from "redux";
import cart from "./cart/reducer";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        const { logger } = require("redux-logger");
        return composeWithDevTools(applyMiddleware(...middleware, logger))
    }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    cart,
    // include more reducers in future
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore, {debug: true})