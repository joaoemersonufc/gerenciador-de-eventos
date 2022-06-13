import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Booking from './components/booking/booking';
import Event from './components/event/event';
import Footer from './components/footer/footer';
import EventForm from './components/handleEvent/handleEvent';
import Header from './components/header/header';
import Home from './components/home/home';
import Login from './components/login/login';
import Report from "./components/report/report";
import Ticket from './components/ticket/ticket';
import { Providers } from './routes/providers';

function App() {
  return (
    <div className="App">
      <Router> 
        <ToastContainer />
        <Providers>
          <Header/>
          <Switch>
            <Route path="/reports">
              <Report />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/event/:event_id">
              <Event />
            </Route>
            <Route path="/new">
              <EventForm />
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
