import React,{useEffect,useState} from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Divider, Tag } from 'antd';

export default function Profilescreen() {

  const user = JSON.parse(localStorage.getItem('currentUser'))
  
  useEffect(()=>{ 
      if(!user){
         window.location.href='/login'
      }
  })


  return (
    <div>
      <Tabs
    defaultActiveKey="1"
    
    items={[
      {
        label: `Profile`,
        key: '1',
        children: <>
           <div className='bs mx-3 col-md-6'>
            <h1>My Profile</h1>
         
         <br />

        <h4>Name : {user.name}</h4>
        <h4>Email  : {user.email}</h4>
        <h4>IsAdmin : {user.isAdmin ? 'Yes' : 'No'}</h4>
               
        </div>
        </>

      },
      {
        label: `Bookings`,
        key: '2',
        children: (<MyBookings/>),
      }
    ]}
  />
    </div>
  )
}



 export function MyBookings(){

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [loading, setloding] = useState(false);
    const [error, seterror] = useState(false);




    const[bookings,setbookings]  = useState([]);

 


         const mechanicalwedssonia = async()=>{
            try {
                setloding(true);
              const data = (await axios.post('/api/bookings/getbookingsbyuserid' , {userid : user._id})).data
              console.log(data);
              setbookings(data);
              setloding(false);
              console.log(loading)

            } catch (error) {

                console.log(error)
                setloding(false);
                seterror(true);
            }
         }

            
             useEffect(()=>{

            mechanicalwedssonia();
              
             },[]);


    async function cancelBooking(bookingid,roomid){
        try {
            setloding(true)
            const result = await (await axios.post('/api/bookings/cancelbooking' , { bookingid,roomid} )).data
            console.log(result)
            setloding(false)
        } catch (error) {
            console.log(error)
            setloding(false)
        }
     }


    return (
   <div>
    <div className='row '>
        <div className='col-md-6'>
                {loading && (<Loader/>)}
                {bookings && (bookings.map(booking=>{
                     return <div className='mx-3 bs'>
                        <h3>{booking.room}</h3>
                        <p><b>BookingId :</b> {booking._id}</p>
                        <p><b>Check In : </b> {booking.fromdate}</p>
                        <p><b>Check Out :</b> {booking.todate}</p>
                        <p><b>Amount :</b>{booking.totalamount}</p>
                        <p><b>Status :</b> {booking.status === "cancelled" ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                        </p>


                        {booking.status !== 'cancelled' && 
                                 (  <div style={{display:"flex", alignItems:"right" , justifyContent:"right"}}>

                                   <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}> Cancel Booking</button>

                             </div>)
                             }
                    </div>
                }))}
        </div>
    </div>
   </div>
    )
}





