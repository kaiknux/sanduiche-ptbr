import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
            },
                rua: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Rua, número e complemento',
                    },
                    value: '',
                },
                cep: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'CEP',
                    },
                    value: '',
                },
                pais: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'País',
                    },
                    value: '',
                },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Seu e-mail',
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
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault(); // evine que envie uma request e reloade a pagina
        console.log(this.props.ingredients);
        console.log('acima foi props dentro do orderHandler')
                this.setState({loading: true});
                // alert('Continue!');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price }
        axios.post( '/orders.json' , order )
        .then(response => {
            this.setState({loading: false});
           this.props.history.push('/'); // NAO PODE USAR PELO JEITO QUE INSERIU O OBJETO!!!
  //          AÍ TEM Q VOLTAR LÁ E BOTAR PROPS, ESTRANHAMENTE JOGAR {...PROPS}... aí funciona
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
    });
    }
    componentDidMount () {
        console.log(this.state)
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
                <form>
                    {formElementsArray.map(formElement => (
                        <Input  key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                />
                    ))}
                    <Button btnType='Success' clicked={this.orderHandler}>Pedir</Button>
                </form>
        );
        if (this.state.loading) {
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


export default ContactData;