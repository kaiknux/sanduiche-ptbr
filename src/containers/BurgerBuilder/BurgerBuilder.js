import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'




class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount () {

    }
    //esse .json lembrar que só funciona pro Firebase da Google
    purchaseContinuedHandler = () => {

        this.props.history.push('/checkout');
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
        return sum > 0;

    }


    render() {

        const disabledInfo = { // pra desativar o botao vou usar dentro do render
            ...this.props.ings 
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = null;
        let burger = this.state.error ? <p>Não consigo carregar os ingredientes!</p> : <Spinner />;
        if (this.props.ings) {
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                                         purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinuedHandler}
                                         price={this.props.price}
                            />
            burger = ( 
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/><br/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo} 
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        />
                 </Auxiliary>
                    )
                }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                    {burger}
            </Auxiliary>
        )

    }


}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));