import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        nome: '',
        email: '',
        endereco: {
            rua: '',
            cep: '',
            pais: '',
        },
        deliveryMethod: '',
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
            price: this.props.price,
            customer: {
                nome: 'Eron Cardoso',
                endereco: {
                    rua: 'Rua Paissandu',
                    cep: '22210-220',
                    pais: 'Brasil',
                },
                email: 'eron.adco@gmail.com',
            },
            deliveryMethod: 'fastest',
        }
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

    render () {
        let form = (
                <form>
                    <input className={classes.Input} type='text' nome='nome' placeholder='Seu nome'/>
                    <input className={classes.Input} type='text' nome='email' placeholder='Seu e-mail'/>
                    <input className={classes.Input} type='text' nome='rua' placeholder='Seu endereço'/>
                    <input className={classes.Input} type='text' nome='cep' placeholder='Seu CEP'/>
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