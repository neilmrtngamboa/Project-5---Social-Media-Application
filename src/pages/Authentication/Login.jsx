import { Link, useNavigate } from 'react-router-dom';
import firebaseApp from '../FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../Style/Login.css'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
      } else {

      }
    });

  }, [])

  const Login = () => {

    if (email !== '' && password !== '') {

      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          Swal.fire({
            title: 'Log in successful!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1DA1F2'
          })
          navigate('/');
        })
        .catch((error) => {
          Swal.fire({
            title: 'Sign in failed!',
            text: 'Invalid email or password!',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1DA1F2'
          })
        });

    } else {
      Swal.fire({
        title: 'Sign in failed!',
        text: 'Fill out the empty fields!',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#1DA1F2'
      })
    }


  }


  return (
    <section className='loginSection'>
      <div className="row mt-5 my-auto">

        <div className="col-md-6">
          <img src="https://cdn4.iconfinder.com/data/icons/podcast-11/64/29-Sport-512.png" className='img-fluid mt-5 mx-auto' alt="" />
        </div>

        <div className="col-md-6 my-auto">
          <h1 className='display-2' id='headTag'>Interbasket</h1>
          <h5 className='text-secondary mb-5 ms-1'>Talk hoops and have fun.</h5>

          <div className="card me-5" id='formContainer'>
            <div className="card-body">

              <input type="email" className='form-control mb-2' placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} value={email}
              />

              <input type="password" className='form-control mb-2' placeholder='Password'
                onChange={(e) => setPassword(e.target.value)} value={password}
              />

              <button className="btn btn-dark" id='loginButton' onClick={Login}>Log in</button>
              <p className='mt-3'>Don't have an account? <Link to='/register' id='signUp' >Sign up here</Link></p>

            </div>

          </div>
        </div>

      </div>
    </section>


  )

}
export default Login;