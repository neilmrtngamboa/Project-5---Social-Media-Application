import { useState } from "react";

function Post({ username, body, date_posted, postID, deletePost, userProfile }) {

    const [deleteState, setDeleteState] = useState()

    const handleDelete = () => {
        if(userProfile.username !== username){
            setDeleteState(true)
        }else{
            setDeleteState(false)
        }
    }
    
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div className="d-flex">
                    <img src="https://static-00.iconduck.com/assets.00/person-icon-950x1024-fy2qylik.png" className="img-fluid"
                        style={{ height: '2rem', width: '2rem' }}
                    />
                    <h6 className="card-title ms-3 my-auto fw-bold">@{username}</h6>
                    <div className="dropdown">
                        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleDelete}>
                            ...
                        </button>
                        <ul class="dropdown-menu">
                            <li><button className="btn" onClick={() => deletePost(postID)} disabled={deleteState}>Delete</button></li>
                        </ul>
                    </div>
                </div>

                <p className="fs-6"><small>{date_posted}</small></p>
                <p className="card-text">{body}</p>

            </div>

        </div>
    )
}

export default Post;