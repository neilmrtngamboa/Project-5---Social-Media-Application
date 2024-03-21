import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../FirebaseConfig';
import { getAuth, updateProfile, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../Style/Register.css'

function Register() {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName !== null) {
          setUserName(user.displayName)
        } else {

        }
        navigate('/')
      } else {

      }
    });

  }, [])


  const handleRegistration = () => {

    if (username !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {

      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: username
          })
          window.location.reload().then((navigate('/')));



        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      Swal.fire({
        title: 'Account creation successful!',
        icon: 'success',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#1DA1F2'
      })
    } else {
      Swal.fire({
        title: 'Account creation failed!',
        text: 'There are empty fields or your password does not match',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1DA1F2'
      })
    }

  }

  return (
    <section className='registrationSection'>
      <h1 className='text-center mt-5'>Interbasket</h1>
      <h5 className='text-secondary text-center mb-5 ms-1'>Talk hoops and have fun.</h5>
      <h2 className='text-center'>Create your account</h2>
      <div className="row">
        <div className="col-md-4">

        </div>

        <div className="col-md-4">
          <div className="card d-flex mx-auto" id='registrationCard'>
            <div className="card-body">
              <input type="text" placeholder='Username' className='form-control mb-2'
                onChange={(e) => setUserName(e.target.value)} value={username}
              />
              <input type="email" placeholder='Email' className='form-control mb-2'
                onChange={(e) => setEmail(e.target.value)} value={email}
              />
              <input type="password" placeholder='Password' className='form-control mb-2'
                onChange={(e) => setPassword(e.target.value)} value={password}
              />

              <input type="password" placeholder='Confirm Password' className='form-control mb-2'
                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
              />
              <button className="btn btn-primary d-flex mx-auto" id='createAccount' onClick={handleRegistration}>Create an account</button>
              <p className='mt-3 text-center'>Already have an account? <Link to='/login' id='loginLink'>Log in here</Link></p>

            </div>
          </div>
        </div>

        <div className="col-md-4">

        </div>

      </div>

    </section>

  )

}
export default Register;