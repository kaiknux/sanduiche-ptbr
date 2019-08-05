import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';

class App extends Component  {
  render () {

  return (
    <div>
      <Layout>
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}
}

export default App;


// A dúvida é a seguinte: a propriedade className não é a utilizada quando está se esti-
// lizando de maneira dinâmica. O button não está funcionando direito, mensagem de erro.
// Estou entre os vídeos 167 e 168 pra corrigir o erro e dar sequencia.
// Provavelmente o erro do OrderSummary.js vai estar no vídeo 168 e o do botão no 167.