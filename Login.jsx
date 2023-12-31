import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../firebase'
import { getDoc, doc  } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      if(auth.currentUser) {
        const snapshot = await getDoc(doc(db, "users", auth.currentUser.uid))
        console.log('userData: ' + JSON.stringify(snapshot.data()))
        navigate('/')
      }
    })
    .catch(err => setError(err.message))
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have and account? 
          <Link to='/create-account'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login