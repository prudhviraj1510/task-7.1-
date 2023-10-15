import {useState} from 'react'
import './forms.css'
import {auth, db} from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'

function Register() {

  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
            const userCollection = collection(db, 'users');
            const userData = {
              "First Name": fName,
              "Last Name": lName,
              "Email": email,
            }
            await addDoc(userCollection, userData);
            navigate('/login')
          })
        .catch((err) => {
          alert(err.message)
          setError(err.message)
        })
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='fname' 
            value={fName}
            placeholder="Enter your first name"
            required
            onChange={e => setFname(e.target.value)}/>
          <input 
            type='lname' 
            value={lName}
            placeholder="Enter your last name"
            required
            onChange={e => setLname(e.target.value)}/>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div>
    </div>
  )
}

export default Register