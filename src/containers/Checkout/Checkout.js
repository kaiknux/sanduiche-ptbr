import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';



class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }
        //antes era componentDidMount, passei pra conponentWillMount pq tá tendo métodos com ingredientes null
        //pq o componentDidMount busca o state na hora que renderiza o componente 
        // pra isso muda pro componentWillMount pra ele ter acesso aos props ANTES disso
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        console.log(query);
        let objetoDeIngredientes = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else if (param[0] === '/bacon') {
                param[0] = 'bacon'
                objetoDeIngredientes[param[0]] = +param[1];
            } else {
                objetoDeIngredientes[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: objetoDeIngredientes, totalPrice: price})
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkOutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                    />
            </div>
        )
    }
}

export default Checkout;