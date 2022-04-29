import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import './Styles/styles.scss';

import ScrollToTop  from './ScrollToTop';
import MyListings from './Components/SearchJobs/MyListings/MyListings';
import SearchJobs from './Components/SearchJobs/SearchJobs';
import JobDetails from './Components/SearchJobs/JobDetails/JobDetails';
import ListingReplies from './Components/SearchJobs/ListingReplies/ListingReplies';
import Footer from './Components/Layout/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Explore from './Components/Explore/Explore';
import FollowingPage from './Pages/FollowingPage';
import FollowersPage from './Components/FollowersPage/FollowersPage';
import Home from './Pages/Home';
import AccountDetails from './Components/AccountDetails/AccountDetails';
import Auth from './Pages/Auth';
import Gallery from './Components/Gallery/Gallery';
import Store from './Components/Store/StorePage/Store';
import StorePostInfo from './Components/Posts/StorePost/StorePostInfo/StorePostInfo';
import Checkout from './Components/Store/Checkout/Checkout';
import Payment from './Components/Store/Payment/Payment';
import OrderHistory from './Components/Store/OrderHistory/OrderHistory';
import Profile from './Pages/Profile';
import Inbox from './Pages/Inbox';
import Dashboard from './Components/Dashboard/Dashboard';
import BigCalendar from './Components/BigCalendar/BigCalendar';
import Marketplace from './Pages/Marketplace';

const promise = loadStripe(
  "pk_test_51JRx82AWnX2oR3avXWJruHDLY6m31mD1Sq9FbBdW2XT4lhyOS1mRdrz84Kh9S7ONfCWPXWZU3u8kPxH1cJJ2Yk9300FSmjz5MS"
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  
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
      <div className="app">
          
      {user && 
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
          <Route path="/explore">
              <Navbar />
              <Explore />
          </Route>
            <Route path="/calendar">
              <Navbar />
              <BigCalendar />
            </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
              <Footer />
            </Route>
            <Route path="/checkout">
              <Navbar />
              <Checkout />
              <Footer />
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
              <Footer />
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
              <Footer />
            </Route>
            <Route path="/details/:uid/:storePostId">
              <Navbar />
              <StorePostInfo />
              <Footer />
            </Route>
            <Route path="/gallery/:uid">
              <Navbar />
              <Gallery />
              <Footer />
            </Route>    
            <Route path="/photos">
              <Navbar />
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
            <Route path="/home">
              <Navbar />
              <Home />
              <Footer />
            </Route>
          </Switch>
        </AnimatePresence>
      }
      {!user && 
        <Route path="/">
          <Auth />
        </Route>
      }
      </div>
    </Router>
  );
}

export default App;
