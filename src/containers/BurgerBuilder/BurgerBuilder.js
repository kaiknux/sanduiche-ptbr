import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 1.0,
    meat: 1.5,
    batatapalha: 0.35,
    
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            batatapalha: 0,
        },
        totalPrice: 4,
        purchasabale: false,
        purchasing: false,
        loading: false,
    };

    //esse .json lembrar que só funciona pro Firebase da Google
    purchaseContinuedHandler = () => {
        this.setState({loading: true});
                // alert('Continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Eron Cardoso',
                address: {
                    street: 'Rua Paissandu',
                    CEP: '22210-220',
                    country: 'Brasil',
                },
                email: 'eron.adco@gmail.com',
                deliveryMethod: 'fastest',
            }
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce ((sum, el) => {
            return sum + el
        }, 0);
        this.setState({purchasable: sum > 0})

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return; // truque pra evitar que o javascript de remover de bug quando ele nao tiver o ingrediente
        } // simplesmente evita que o resto da função seja executada
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    };

    render() {
        let orderSummary = <OrderSummary ingredients={this.state.ingredients} 
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinuedHandler}
        price={this.state.totalPrice}
        />
        const disabledInfo = { // pra desativar o botao vou usar dentro do render
            ...this.state.ingredients 
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/><br/>
            <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo} 
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                />
            </Auxiliary>
        )

    }


}
export default withErrorHandler(BurgerBuilder, axios);