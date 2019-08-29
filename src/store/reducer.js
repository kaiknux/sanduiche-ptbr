import * as actionTypes from './actions';

const initialState = {
    totalPrice: 4,
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        tomate: 0,
    }
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.0,
    meat: 1.5,
    tomate: 0.35,
    
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                    ...state, //isso não cria novos objetos específicos de cada um, por isso tem que criar
                    ingredients: { // o state.ingredients
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    },
                    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        default:
            return state;
    }
};

export default reducer;