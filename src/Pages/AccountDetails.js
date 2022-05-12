import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useStateValue } from '../StateProvider';

function AccountDetails() {
  const [{ user }, dispatch] = useStateValue();
  const [userdata, setUserData] = useState('');

  useEffect(() => {
    db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
          const data = doc.data()
          setUserData({ ...data })
      })
  }, [])
  
  const updateDisplayName = () => {

  }

  const updatePassword = () => {

  }

  const updateEmail = () => {

  }

  return (
    <div className="accounts__page">
        <h1>Account Details</h1>
        <ul className="account__details">
          <div className="details">
            <h3>Name</h3>
            <p>{userdata.firstName}</p>
            <button>Edit</button>
          </div>
          <div className="details">
            <h3>Display Name</h3>
            <p>{user.displayName}</p>
            <button>Edit</button>
          </div>
          <div className="details">
            <h3>Contact</h3>
            <p>Primary:<span>{user.email}</span></p>
            <button>Edit</button>
          </div>
          <div className="details">
            <h3>Email Address</h3>
            <p>{user.email}</p>
            <button>Edit</button>
          </div>
          
        </ul>
    </div>
  )
}

export default AccountDetails