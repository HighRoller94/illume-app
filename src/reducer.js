export const initialState = {
    basket: [],
    user: null,
    following: [],
}

export const actionTypes = {
    SET_USER : "SET_USER",
    USER_FOLLOWING: "USER_FOLLOWING",
};

export const getBasketTotal = (basket) => 
    basket?.reduce((total, item) => item.price + total, 0);
    
const reducer = (state, action) => {
    
    switch(action.type) {
            case 'ADD_TO_BASKET':
                return {
                    ...state,
                    basket: [...state.basket, action.item],
                };
            case "EMPTY_BASKET":
                return {
                    ...state,
                    basket: []
                }
            case "REMOVE_FROM_BASKET":
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );
                let newBasket = [...state.basket];
                if (index >= 0) {
                    newBasket.splice(index, 1);
                }
                
                return {
                    ...state,
                    basket: newBasket
                }
                
            case actionTypes.USER_FOLLOWING:
                return {
                    ...state,
                    following: action.following
                }

            case actionTypes.SET_USER:
                return {
                    ...state,
                    user: action.user
                }
                
            default:
                return state;
    }

};

export default reducer;