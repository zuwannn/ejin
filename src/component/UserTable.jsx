import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import myFunctions from '../config/myFunctions';
const db = getFirestore();
import { VirtualPet } from '../config/VirtualPet ';
import ModalEdt from './ModalEdt';
function UserTable() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userRef = collection(db, 'users');
        getDocs(userRef)
            .then((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push(doc.data());
                });
                setUserData(users);
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }, []);

    const handleEdit = (id) => {
        <ModalEdt/>
    };

    const handleDelete = (id) => {
        const userRef = doc(db, 'users', id);
        deleteDoc(userRef)
            .then(() => {
                console.log('User successfully deleted!');
                // Optionally, update the userData state to reflect the deletion
            })
            .catch((error) => {
                console.error('Error deleting user: ', error);
            });
    };

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>role</th>
                    <th>status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {userData.map((user) => (
                    
                    <tr key={user.uid}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                        <td>{myFunctions.convertTimestampToString(user.created)}</td>
                        {/* <td><button type='button' className='btn btn-success' onClick={() => handleEdit(user.uid)}>edit</button></td> */}
                        <td><ModalEdt/></td>
                        <td><button type='button' className='btn btn-danger' onClick={() => handleDelete(user.uid)}>delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserTable;