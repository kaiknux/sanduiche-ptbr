import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        nome: '',
        email: '',
        endereco: {
            rua: '',
            cep: '',
        }
    }
    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Insira suas informações de entrega:</h4>
                <form>
                    <input className={classes.Input} type='text' nome='nome' placeholder='Seu nome'/>
                    <input className={classes.Input} type='text' nome='email' placeholder='Seu e-mail'/>
                    <input className={classes.Input} type='text' nome='rua' placeholder='Seu endereço'/>
                    <input className={classes.Input} type='text' nome='cep' placeholder='Seu CEP'/>
                    <Button btnType='Success'>Pedir</Button>
                </form>
            </div>
        )
    }

}


export default ContactData