import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Booking from './components/booking/booking';
import Event from './components/event/event';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
import Login from './components/login/login';
import Ticket from './components/ticket/ticket';
import { Providers } from './routes/providers';

function App() {
  return (
    <div className="App">
      <Router>
        <Providers>
          <Header/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/event/:event_id">
              <Event />
            </Route>
            <Route path="/new">
              <Event />
            </Route>
            <Route path="/booking/:event_id">
              <Booking />
            </Route>
            <Route path="/ticket/:booking_id">
              <Ticket />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Providers>
      </Router>
    </div>
  );
}



export default App;
