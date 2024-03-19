
import Post from "./Post";
import firebaseApp from './FirebaseConfig';
import { getFirestore, addDoc, collection, Timestamp, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    let navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [userProfile, setUserProfile] = useState({})
    const [post, setpost] = useState('');
    const [showposts, setShowposts] = useState([]);

    useEffect(() => {

        //Authentication
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserProfile({
                    email: user.email,
                    username: user.displayName
                })
            } else {
                navigate('/login');
            }
        });

        //Retrieve posts

        onSnapshot(collection(db, 'posts'), snapshot => {
            const newShowposts = [];

            snapshot.forEach(userpost => {
                let postID = userpost.data();
                postID['postID'] = userpost.id
                newShowposts.push(postID)
            })
            setShowposts(newShowposts)


        });


    }, [])

    const Logout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })

    }

    const createpost = () => {

        if (post !== '') {
            const postData = {
                body: post,
                user_email: userProfile.email,
                username: userProfile.username,
                date_posted: Timestamp.now()

            }

            addDoc(collection(db, 'posts'), postData).then(() => {
                setpost('');

            })

        } else {
            alert('Error! Your postbox is empty!').then(() => {

            })
        }


    }

    const deletePost = (postID) => {
        const deletePost = doc(db, 'posts', postID)
        deleteDoc(deletePost)


    }


    return (
        <main className="d-flex flex-column min-vh-100">

            <div className="d-flex mb-3">
                <h1>Y</h1>
                <button className="btn btn-primary" onClick={Logout}>Log out</button>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <div className="container-fluid border bg-light p-3">
                        <h5>{userProfile.username}</h5>
                        <h6>{userProfile.email}</h6>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="container-fluid border bg-light p-3 mb-3">
                        <input type="text" className="form-control" placeholder="Talk about something..."
                            onChange={(e) => setpost(e.target.value)} value={post}

                        />
                        <button className="btn btn-primary mt-3" onClick={createpost}>Post</button>
                    </div>


                    {
                        showposts.map((postRecord) => (
                            <Post
                                key={postRecord.id}
                                body={postRecord.body}
                                email={postRecord.user_email}
                                username={postRecord.username}
                                date_posted={postRecord.date_posted.toDate().toLocaleTimeString('en-GB', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                postID={postRecord.postID}
                                deletePost={deletePost}
                            />
                        ))
                    }

                </div>
            </div>

            <footer className="text-center text-light p-3 mt-auto bg-dark">
                <h5 className="fw-bold">Social Media Application</h5>
                <small className="fw-light">A project by Neil Martin Gamboa</small>
                <div><small className="fw-light">BASE404™</small></div>


            </footer>
        </main>




    )
}

export default Home;