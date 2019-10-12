import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';


class Checkout extends Component {

        //antes era componentDidMount, passei pra conponentWillMount pq tá tendo métodos com ingredientes null
        //pq o componentDidMount busca o state na hora que renderiza o componente 
        // pra isso muda pro componentWillMount pra ele ter acesso aos props ANTES disso

    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render () {
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = ( <>
            {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkOutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                path={this.props.match.path + '/contact-data'} 
                component={ContactData} />
                </>
            )
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
};


export default connect(mapStateToProps)(Checkout);