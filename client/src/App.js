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
  const [order, setOrder] = useState({pizzasOrdered: [], orderTotal: 0.00, orderTip: 0.00})
  // const [nextEvents, setNextEvents] = useState({events:[]})
  // useEffect(()=>{
  //   fetch('https://www.googleapis.com/calendar/v3/calendars/doughboyswoodfiredpizza@gmail.com/events?key=' + process.env.REACT_APP_GOOGLE_API_KEY + '&timeMin=' + moment().hour(0).format() + '&timeMax=' + moment().hour(23).format())
  // .then((response)=>{
  //     return response.json();
  // }).then((data)=>{
  //     setNextEvents({events: data.items});
  // })
  // },[])
  return (
    <ApplicationContext.Provider value={{order, setOrder}}>
      <Layout>
        <Switch>
          <Route path="/order-now">
            {(moment().isBefore(moment('2020-04-26T18:15:00'))) ? <OrderNow/> : 
            <div class="container" style={{height: '100vh'}}>
              <div class="box">
                <h1 class="subtitle" style={{textAlign: 'center'}}>Sorry, we aren't currently taking online orders. Please check back soon!</h1>
              </div>
            </div>}
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
