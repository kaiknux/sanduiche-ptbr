import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients ).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>
            
    });
return (
    <Auxiliary>
        <h3>Seu pedido:</h3>
        <p>Um delicioso hambúrger com os ingredientes:</p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Preço: {props.price}</strong></p>
        <p>Seguir para o check-out?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancelar</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>Continuar</Button>
    </Auxiliary>

)
};
export default orderSummary;