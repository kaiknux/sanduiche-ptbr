import React from 'react';
import classes from '../BuildControl/BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>
            Menos :(
            </button>
        <button
            className={classes.More}
            onClick={props.added}>
            Mais!
        </button>
        
    </div>


);

export default buildControl;