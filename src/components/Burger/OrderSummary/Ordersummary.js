import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients ).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {props.ingredients[igKey]}</li>
            
    });
return (
    <Aux>
        <h3>Seu pedido:</h3>
        <p>Um delicioso hambúrger com os ingredientes:</p>
        <p>{ingredientSummary}</p>
        <p><strong>Preço: {props.price}</strong></p>
        <p>Seguir para o check-out?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancelar</Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>Continuar</Button>
    </Aux>

)
};
export default orderSummary;