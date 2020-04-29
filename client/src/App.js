import React, {useState, useEffect} from 'react';
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
import moment from 'moment';

function App() {
  const [order, setOrder] = useState({pizzasOrdered: [], beverages: [], orderTotal: 0.00, orderTip: 0.00})
  const [event, setEvent] = useState();
    useEffect(() => {
        async function getEvent() {
            let response = await fetch('/next-event')
            if(response) {
                setEvent(await response.json());
            }
        }
        getEvent();
    }, [])
  return (
    <ApplicationContext.Provider value={{order, setOrder}}>
      <Layout>
        <Switch>
          <Route path="/order-now">
            {event && Object.entries(event).length !== 0 ? <OrderNow/> : 
            <div class="container" style={{height: '100vh'}}>
              <div class="box">
                <h1 class="subtitle" style={{textAlign: 'center'}}>Sorry, we aren't currently taking online orders. Please check back soon!</h1>
              </div>
            </div>}
          </Route>
          <Route path="/checkout">
            {order.orderTotal !== 0 ?
            <Checkout event={event}/> : <Redirect to="/order-now"/>}
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>
          <Route path="/">
            <HomePage event={event}/>
          </Route>
        </Switch>
      </Layout>
    </ApplicationContext.Provider>
  );
}

export default App;
