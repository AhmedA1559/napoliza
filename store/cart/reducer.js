import { cartActionTypes } from './action'

const countInitialState = []

export default function reducer(state = countInitialState, action) {
    switch (action.type) {
        case cartActionTypes.ADD_TO_CART:
            return [...state, action.payload.item]
        case cartActionTypes.REMOVE_FROM_CART:
            return [...state.slice(0, action.payload.index), ...state.slice(action.payload.index + 1)]
        case cartActionTypes.CHANGE_ITEM:
            return [...state.slice(0, action.payload.index), action.payload.item, ...state.slice(action.payload.index + 1)]
        default:
            return state
    }
}