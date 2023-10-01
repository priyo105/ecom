import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_QUANTITY
} from '../Constants';

const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem !== action.payload)
        case CLEAR_CART:
            return state = []
        case UPDATE_QUANTITY:

                // console.log('reducerstate'+JSON.stringify(state));
                // console.log('payloadqty',action.payload)
             updateditems= state.map(item=>{
                    if(item.product.name===action.payload.product.product.name){
                        item.product.quantity=action.payload.quantity         
                    }1
                    return item;
                })
                // console.log("ip"+JSON.stringify(updateditems))
            
             return updateditems
               
    }
    return state;
}

export default cartItems;