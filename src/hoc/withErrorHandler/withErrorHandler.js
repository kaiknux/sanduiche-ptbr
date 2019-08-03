import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';



const withErrorHandler = ( WrappedComponent, axios ) => {
return class extends Component {
    state = {
        error: null,
    }

    componentWillMount () { // interceptor pra ver se vai dar merda antes de rodar o componente.
        this.nomeDoInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        }) 
        this.nomeDoResponseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
        });
    }
    componentWillUnmount () {
        axios.interceptors.request.eject(this.nomeDoInterceptor);
        axios.interceptors.response.eject(this.nomeDoResponseInterceptor);
    } // pra retirar o interceptor. prestar atenção no lifecycle hook dele.

    errorConfirmedHandler = () => {
        this.setState({error: null})
    }

    render () {

    return (
        <Auxiliary>
            <Modal modalClosed={this.errorConfirmedHandler} 
                   show={this.state.error}
                   >
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
        </Auxiliary>
    )}
}}

export default withErrorHandler;
