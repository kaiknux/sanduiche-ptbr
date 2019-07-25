import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active>Ingredientes de hambúrguer</NavigationItem>
    <NavigationItem link='/'>CheckOut</NavigationItem>
    </ul>

);

export default navigationItems;