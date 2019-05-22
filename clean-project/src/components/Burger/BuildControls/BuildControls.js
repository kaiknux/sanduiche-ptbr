import React from 'react';
import classes from  '../BuildControls/BuildControls.css';

import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label: 'Salada', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Queijo muçarela', type: 'cheese'},
    {label: 'Carne 120g', type: 'meat'},
    {label: 'Batata-Palha', type: 'batatapalha'},


];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Preço Atual: <strong>R${props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
        <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} 

            />
    ))}
    <button 
    className='OrderButton'
    disabled={!props.purchasable}
    onClick={props.ordered}>
    FECHAR PEDIDO</button>

    </div>
);

export default buildControls;