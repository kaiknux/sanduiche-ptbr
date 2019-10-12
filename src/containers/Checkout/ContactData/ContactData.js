import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            nome: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Seu nome',
                },
                value: '',
                validation: {
                    required: true,
                },
            },
                rua: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Rua, número e complemento',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                },
                cep: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'CEP',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                },
                pais: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'País',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Seu e-mail',
                    validation: {
                        required: true,
                    },
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'rapido', displayValue: 'Mais rápido'},
                        {value: 'barato', displayValue: 'Mais barato'},
                        {value: 'naloja', displayValue: 'Retirar na loja'}
                    ]
                },
                value: '',
            },
        },
    }

    orderHandler = (event) => {
        event.preventDefault(); // evine que envie uma request e reloade a pagina
        // alert('Continue!');
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            cliente: formData
        }
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input  key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                />
                    ))}
                    <Button btnType='Success'>Pedir</Button>
                </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Insira suas informações de entrega:</h4>
                    {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));