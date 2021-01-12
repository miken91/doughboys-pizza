import React, { useState, useEffect } from 'react';
import Layout from './layout/layout';
import HomePage from './pages/home';
import OrderNow from './pages/order-now';
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import ApplicationContext from './ApplicationContext';
import Checkout from './pages/checkout';
import Contact from './pages/contact';
import Admin from './pages/admin';

function App() {
  const [order, setOrder] = useState({ itemsOrdered: [], orderTotal: 0.00, orderTip: 0.00})
  const [events, setEvents] = useState([]);
  const location = useLocation();
  useEffect(() => {
    async function getEvents() {
      let response = await fetch('/get-events-for-the-day')
      if (response) {
        setEvents(await response.json());
      }
    }
    getEvents();
  }, [location])
  return (
    <ApplicationContext.Provider value={{ order, setOrder, events }}>
      <Layout>
        <Switch>
          <Route path="/order-now">
            {events.length !== 0 ? <OrderNow /> :
              <div class="container" style={{ height: '100vh' }}>
                <div class="box">
                  <h1 class="subtitle" style={{ textAlign: 'center' }}>Sorry, we aren't currently taking online orders. Please check back soon!</h1>
                </div>
              </div>}
          </Route>
          <Route path="/checkout">
            {order.orderTotal !== 0 ?
              <Checkout events={events} /> : <Redirect to="/order-now" />}
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/">
            <HomePage events={events} />
          </Route>
        </Switch>
      </Layout>
    </ApplicationContext.Provider>

  );
}

export default App;

