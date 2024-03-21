
import Post from "./Post";
import firebaseApp from './FirebaseConfig';
import { imageDb } from "./FirebaseConfig";
import {ref, uploadBytes} from 'firebase/storage';
import { v4 } from "uuid";
import { getFirestore, addDoc, collection, Timestamp, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Style/Home.css';

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
        <main className="d-flex flex-column min-vh-100" id="main">

            <div className="d-flex">
            <marquee behavior="" direction="right" className='fs-1'>Interbasket Feed</marquee>
            <button className="btn ms-auto" id="logOut" onClick={Logout}>Log out</button>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <div className="container-fluid p-3 ms-1 mb-2" id="followContainer">

                        <div className="container-fluid shadow rounded p-3 mb-5" id="userContainer">
                            <h5> @{userProfile.username}</h5>
                            <small className="text-secondary">{userProfile.email}</small>

                        </div>

                        <h5 className="mb-4">Suggested people:</h5>

                        <div className="d-flex mb-2">
                            <img className="dp1" src="https://pyxis.nymag.com/v1/imgs/847/0f7/504c63a03d8a751a5cbeda0bc064306bb4-lebron-james.rsquare.w400.jpg" alt="" />
                            <p className="mt-1 ms-1">@kingjames</p>
                            <button className="btn btn-primary pt-0 pb-0 ms-auto">Follow +</button>
                        </div>

                        <div className="d-flex mb-2">
                            <img className="dp1" src="https://i.pinimg.com/736x/f2/b5/09/f2b50985a0a995b8d99e528c66ba4d05.jpg" alt="" />
                            <p className="mt-1 ms-1">@DBook</p>
                            <button className="btn btn-primary pt-0 pb-0 ms-auto">Follow +</button>
                        </div>

                        <div className="d-flex">
                            <img className="dp1" src="https://www.proballers.com/media/cache/resize_300/ul/player/backup/68582-1-5d7810ec49a88p.jpg" alt="" />
                            <p className="mt-1 ms-1">@babesbolick</p>
                            <button className="btn btn-primary pt-0 pb-0 ms-auto">Follow +</button>
                        </div>

                        <h5 className="mt-5 mb-3">Hot Topics 🔥</h5>
                        <div className="container-fluid">
                            <h6>#MarchMadness</h6>
                            <small className="text-secondary">76.8k people are talking about this</small>
                            <h6 className="mt-2">#Lakers</h6>
                            <small className="text-secondary">21.8k people are talking about this</small>
                            <h6 className="mt-2">Lebron GOAT</h6>
                            <small className="text-secondary">17.2k people are talking about this</small>
                            <h6 className="mt-2">NCAA Season 100</h6>
                            <small className="text-secondary">3.2k people are talking about this</small>
                        </div>

                    </div>
                </div>

                <div className="col-md-8">
                    <div className="container-fluid  p-3 mb-3" id="postContainer">
                        <input type="text" className="form-control" placeholder="Talk about something..."
                            onChange={(e) => setpost(e.target.value)} value={post}

                        />

                        <button className="btn" id="postButton" onClick={createpost}><span className="material-symbols-outlined mt-2">
                            send
                        </span></button>
                    </div>


               {
                showposts.length > 0
                ?
                (
                    (
                        showposts.map((postRecord) => (
                            <Post
                                key={postRecord.id}
                                body={postRecord.body}
                                email={postRecord.user_email}
                                username={postRecord.username}
                                date_posted={postRecord.date_posted.toDate().toLocaleTimeString('en-GB', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                postID={postRecord.postID}
                                deletePost={deletePost}
                                userProfile={userProfile}
                                
                            />
                        ))
                    )
                )

                :
                (
                    <h1 className="text-center mt-5 text-secondary">There are no current posts from other users.</h1>
                )
               }

                </div>
            </div>

            <footer className="text-center p-3 mt-auto" id="footerSection">
                <h5 className="fw-bold">Social Media Application</h5>
                <small className="fw-light">A project by Neil Martin Gamboa</small>
                <div><small className="fw-light">BASE404™</small></div>


            </footer>
        </main>




    )
}

export default Home;