import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'


class App extends Component  {
  render () {

  return (
    <div>
      <Layout>
        <BurgerBuilder/>
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