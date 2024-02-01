import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();
// import { useAuth } from './AuthContext';

function ModalEdt() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    
    // const { currentUser } = useAuth();

    // useEffect(() => {
    //     if (currentUser) {
    //       setDisplayName(currentUser.displayName || '');
    //       setPhotoURL(currentUser.photoURL || '');
    //     }
    //   }, []);
    const [modalShow, setModalShow] = useState(false); 
    const handleShowModal = (i) => {
        setModalShow(true);
      }
      const handleCloseModal = () => {
        setModalShow(false);
      }
      const handleCommentChange = (event) => {
        setModalInputComment(event.target.value);
      }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.username || '');
                setEmail(user.email || '');
            }
        });
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Edit
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body text-start">
                            <form>
                                <div class="mb-3">
                                    <label htmlFor="username" class="form-label">Username</label>
                                    <input type="text" class="form-control" name="username" value={username} onChange={(e) => setName(e.target.value)}/>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="" placeholder="name@example.com" />
                                </div>

                                {/* <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="" />
                                </div> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick="window.location.reload()">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalEdt;