import React from 'react';
import { auth } from '../firebase/config';

const Account = () => {
  const user = auth.currentUser;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Account Info</h2>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => auth.signOut()}>Logout</button>
        </>
      ) : (
        <p>Not logged in.</p>
      )}
    </div>
  );
};

export default Account;
