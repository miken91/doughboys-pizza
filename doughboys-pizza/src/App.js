import React, {useState} from 'react';
import Layout from './layout/layout';
import HomePage from './pages/home';
import OrderNow from './pages/order-now';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ApplicationContext from './ApplicationContext';
import Checkout from './pages/checkout';

function App() {
  const [order, setOrder] = useState({pizzasOrdered: [], orderTotal: 0})
  return (
    <ApplicationContext.Provider value={{order, setOrder}}>
      <Layout>
        <Switch>
          <Route path="/order-now">
            <OrderNow/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Layout>
    </ApplicationContext.Provider>
  );
}

export default App;
