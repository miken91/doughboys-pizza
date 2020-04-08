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

function App() {
  const [order, setOrder] = useState({orders: [], orderTotal: 0})
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/order-now">
            <OrderNow order={{order, setOrder}}/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
