import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
export default function Registerscreen() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword,setcpassword ] = useState('');
    const [loading, setloding] = useState(false);
    const [error, seterror] = useState();
    const [success,setsuccess] =useState();

    async function register(){
      if(password===cpassword){
        const user={
          name,
          email,
          password,
          cpassword
        }

        try {
          setloding(true);
           const result = await axios.post('/api/users/register' ,user).data
           setloding(false);
           setsuccess(true);
           setname('')
           setemail('')
           setpassword('')
           setcpassword('')
        } catch (error) {
            console.log(error)
            setloding(false);
            seterror(true);

        }
        
      }
      else{
        alert('Password Not Matched')
      }
    }
  return (
    <div>
    {loading && (<Loader/>)}
    {error && (<Error/>)}
      <div className='row justify-content-center mt-5' >
        <div className='col-md-6 text-centerA'>
          {success && (<Success message='Registration success'/>)}
            <div className='bs'>
                <h1>Register</h1>
                <input type='text' className='form-control' placeholder='Name'
                 value={name} onChange={(e)=>{setname(e.target.value)}}></input>
                <input type='email' className='form-control' placeholder='Email'
                value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
                <input type='text' className='form-control' placeholder='Password'
                value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
                <input type='text' className='form-control' placeholder='Confirm Password'
                value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}></input>
                <button className='btn btn-primary mt-3' onClick={register}>Register</button>
            </div>
        </div>
      </div>
    </div>
  )
}
