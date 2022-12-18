import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

export default function Loginscreen() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloding] = useState(false);
    const [error, seterror] = useState( );
    const [success,setsuccess] =useState();
  

     async function login(){
    
        const user={
          email,
          password,
            }
            try {
              setloding(true);
              const result = (await axios.post('/api/users/login' ,user)).data
              setloding(false);

              localStorage.setItem('currentUser', JSON.stringify(result));
              window.location.href='/home';
           } catch (error) {
               console.log(error)
               setloding(false);
               seterror(true);
   
           }
         

    
     
    }
  return (
    <div>
    {loading && (<Loader/>)}
      <div className='row justify-content-center mt-5' >
        <div className='col-md-6 text-centerA'>
          {error && (<Error message='Invalid Credentionals'/>)}
           
            <div className='bs'>
                <h1>Login</h1>
                
                <input type='email' className='form-control' placeholder='Email'
                value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
                <input type='password' className='form-control' placeholder='Password'
                value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
                <button className='btn btn-primary mt-3' onClick={login}>Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}
