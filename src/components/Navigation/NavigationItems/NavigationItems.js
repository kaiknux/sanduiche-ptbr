import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>Ingredientes de hambúrguer</NavigationItem>
    <NavigationItem link='/orders'>Pedido</NavigationItem>
    </ul>

);

export default navigationItems;