import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CompatRouter } from 'react-router-dom-v5-compat';

import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PrivateRoute from './Components/PrivateRoute';

import './Styles/styles.scss';

import ScrollToTop  from './ScrollToTop';
import MyListings from './Pages/MyListings';
import SearchJobs from './Pages/SearchJobs';
import JobDetails from './Pages/JobDetails';
import ListingReplies from './Pages/ListingReplies';
import Footer from './Components/Layout/Footer';
import Navbar from './Components/Layout/Navbar';
import FollowingPage from './Pages/FollowingPage';
import FollowersPage from './Pages/FollowersPage';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import ForgotPassword from './Pages/ForgotPassword';
import AccountDetails from './Pages/AccountDetails';
import Gallery from './Pages/Gallery';
import Store from './Pages/Store';
import StorePostInfo from './Pages/StorePostInfo';
import Checkout from './Pages/Checkout';
import Payment from './Pages/Payment';
import OrderHistory from './Pages/OrderHistory';
import Profile from './Pages/Profile';
import Inbox from './Pages/Inbox';
import Dashboard from './Pages/Dashboard';
import Marketplace from './Pages/Marketplace';

import SideBar from './Components/Layout/LeftSidebar/SideBar';

const promise = loadStripe(
  "pk_test_51JRx82AWnX2oR3avXWJruHDLY6m31mD1Sq9FbBdW2XT4lhyOS1mRdrz84Kh9S7ONfCWPXWZU3u8kPxH1cJJ2Yk9300FSmjz5MS"
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  
  console.log(user)
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  }, [])

  return (
    <Router>
      <CompatRouter>
        <AnimatePresence exitBeforeEnter>
          <ScrollToTop />
          <Switch>
          <Route path="/jobs">
              <Navbar />
              <SearchJobs />
              <Footer />
          </Route>
          <Route path="/jobdetails/:uid/:listingId">
              <Navbar />
              <JobDetails />
          </Route>
          <Route path="/myjobs">
              <Navbar />
              <MyListings />
          </Route>
          <Route path="/listingreplies/:listingId">
              <Navbar />
              <ListingReplies />
          </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
            </Route>
            <Route path="/checkout">
              <Navbar />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Navbar />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/orders">
              <Navbar />
              <OrderHistory />
            </Route>
            <Route path="/inbox/:uid">
              <Navbar />
              <Inbox />
            </Route>
            <Route path="/messages/:uid">
              <Navbar />
              <Inbox />
            </Route>
            <Route path="/store/:uid">
              <Navbar />
              <Store />
              <Footer />
            </Route>
            <Route path="/marketplace">
              <Navbar />
              <Marketplace />
            </Route>
            <Route path="/details/:uid/:storePostId">
              <Navbar />
              <StorePostInfo />
            </Route>
            <Route path="/gallery/:uid">
              <Navbar />
              <Gallery />
              <Footer />
            </Route>     
            <Route path="/profile/:uid">
              <Navbar />
              <Profile />
              <Footer />
            </Route>
            <Route path="/followers/:uid">
              <Navbar />
              <FollowersPage />
            </Route>
            <Route path="/following/:uid">
              <Navbar />
              <FollowingPage />
            </Route>
            <Route path="/account">
              <Navbar />
              <AccountDetails />
            </Route>
            <PrivateRoute exact path="/home">
              <Navbar />
              <Home />
              <Footer />
            </PrivateRoute>
          <Route path="/forgot-password" component={ForgotPassword}/>
          <Route path="/login" component={Auth} />
          </Switch>
        </AnimatePresence>
      </CompatRouter>
    </Router>
  );
}

export default App;
