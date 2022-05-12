import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PrivateRoute from './Components/PrivateRoute';

import './Styles/styles.scss';

// PAGES

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
      <AnimatePresence exitBeforeEnter>
        <ScrollToTop />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={
            <PrivateRoute>
              <Navbar />
            </PrivateRoute>
            }>
            <Route path="home" element={<Home />} />
            <Route path="jobs" element={<SearchJobs />} />
            <Route path="jobdetails/:uid/:listingId" element={<JobDetails />} />
            <Route path="myjobs" element={<MyListings />} />
            <Route path="listingreplies/:listingId" element={<ListingReplies />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            } />
            <Route path="inbox/:uid" element={<Inbox />} />
            <Route path="inbox/:uid" element={<Inbox />} />
            <Route path="message/:uid" element={<Inbox />} />
            <Route path="store/:uid" element={<Store />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="details/:uid/:storePostId" element={<StorePostInfo />} />
            <Route path="gallery/:uid" element={<Gallery />} />
            <Route path="profile/:uid" element={<Profile />} />
            <Route path="followers/:uid" element={<FollowersPage />} />
            <Route path="following/:uid" element={<FollowingPage />} />
            <Route path="account" element={<AccountDetails />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
