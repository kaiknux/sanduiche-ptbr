import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
    // esse objeto tem estrutura diferente pra poder colocar
    // um condicional css pra animação
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }


    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo1a}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>

            </nav>

        </div>
        </Aux>

    );
}

export default sideDrawer;
//const sideDrawer = (props) => {
    // esse objeto tem estrutura diferente pra poder colocar
    // um condicional css pra animação
//     let attachedClasses = [classes.SideDrawer, classes.Close];
//     if (props.open) {
//         attachedClasses = [classes.SideDrawer, classes.Open];
//     }


//     return (
//         <Aux>
//         <Backdrop show={props.open} clicked={props.closed}/>
//         <div className={attachedClasses.join(' ')}>
//             <div className={classes.Logo1a}>
//             <Logo/>
//             </div>
//             <nav>
//                 <NavigationItems/>

//             </nav>

//         </div>
//         </Aux>

//     );
// }