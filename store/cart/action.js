export const cartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CHANGE_ITEM: 'CHANGE_ITEM',
}

export const cartAdd = (item) => ({
        type: cartActionTypes.ADD_TO_CART,
        payload: {
            item: item
        }
    });

export const cartRemove = (index) => ({
        type: cartActionTypes.REMOVE_FROM_CART,
        payload: {
            index: index,
        }
    });

export const cartItem = (index, item) => ({
        type: cartActionTypes.CHANGE_ITEM,
        payload: {
            index: index,
            item: item
        }
    });