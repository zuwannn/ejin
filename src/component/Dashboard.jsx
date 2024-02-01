import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
const auth = getAuth();
const db = getFirestore();

import UserTable from './UserTable';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUserData(user);
        const userRef = collection(db, 'users');
        getDocs(userRef)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().uid === user.uid) {
                setUserData(doc.data());
              }
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      } else {
        // User is signed out.
        setUserData(null);
      }
    });
  }, []);

  // const handleLogout = () => {
  //   auth.signOut().then(() => {
  //     // window.location.reload();

  //   })
  // }


  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/ejin/login');
  };


  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          <p>User ID: {userData.uid}</p>
          {/* Display other user data as needed */}

          <UserTable/>
          <button type="button" className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}

export default Dashboard;