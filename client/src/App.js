import React, {useState} from 'react';
import Layout from './layout/layout';
import HomePage from './pages/home';
import OrderNow from './pages/order-now';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ApplicationContext from './ApplicationContext';
import Checkout from './pages/checkout';
import Contact from './pages/contact';

function App() {
  const [order, setOrder] = useState({pizzasOrdered: [], orderTotal: 0.00, orderSubTotal: 0.00, orderTax: 0.00, orderTip: 0.00})
  return (
    <ApplicationContext.Provider value={{order, setOrder}}>
      
      <Layout>
        <Switch>
          <Route path="/order-now">
            <OrderNow/>
          </Route>
          <Route path="/checkout">
            {order.orderTotal !== 0 ?
            <Checkout/> : <Redirect to="/order-now"/>}
          </Route>
          <Route path="/contact">
            <Contact/>
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
