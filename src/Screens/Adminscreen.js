import React, { useState, useEffect, Component } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default function Adminscreen() {

    useEffect(()=>{

        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin)
        { window.location.href='/home'
    }
},[])
  return (
    <div className="mt-3 ml-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Bookings`,
            key: "1",
            children: <Bookings />,
          },
          {
            label: `Rooms`,
            key: "2",
            children: <Rooms />,
          },
          {
            label: `Add Rooms`,
            key: "3",
            children: <Addroom/>,
          },
          {
            label: `Users`,
            key: "4",
            children: <Users />,
          },
        ]}
      />
    </div>
  );
}

// Booking list Component........


export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloding] = useState(true);
  const [error, seterror] = useState();

  const getbookings = async () => {
    try {
      setloding(true);
      const data = await (await axios.get("/api/bookings/getallbookings")).data;
      setbookings(data);
      setloding(false);
    } catch (error) {
      console.log(error);
      setloding(false);
      seterror(false);
    }
  };

  useEffect(() => {
    getbookings();
  }, []);

  return (
    <div className="row">
      <div className="col- 10">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>

                    <td>{booking.userid}</td>

                    <td>{booking.room}</td>

                    <td>{booking.fromdate}</td>

                    <td>{booking.todate}</td>

                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Rooms list Component........


export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloding] = useState(false);
  const [error, seterror] = useState();

  const getrooms = async () => {
    try {
      setloding(true);
      const data = await (await axios.get("/api/rooms/getallrooms")).data;
      setrooms(data.rooms);
      setloding(false);
    } catch (error) {
      console.log(error);
      setloding(false);
      seterror(false);
    }
  };

  useEffect(() => {
    getrooms();
  }, []);

  return (
    <div className="row">
      <div className="col- 10">
        <h1>Rooms</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>

                    <td>{room.name}</td>

                    <td>{room.type}</td>

                    <td>{room.rentperday}</td>

                    <td>{room.maxcount}</td>

                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// Users list Component........

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloding] = useState(true);
  const [error, seterror] = useState();

  const getusers = async () => {
    try {
      setloding(true);
      const data = await (await axios.get("/api/users/getallusers")).data;
      setusers(data);
      setloding(false);
    } catch (error) {
      console.log(error);
      setloding(false);
      seterror(false);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="row">
      <div className="col- 10">
        <h1>Users</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>IsAdmin</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td> 
                    <td>{user.name}</td>
                    <td>{user.email}</td> 
                    <td>{user.isAdmin? `Yes` : `No`}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//ADD room components.....

export function Addroom() {
    const[name, setname] = useState('')
    const[rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const[description, setdescription] = useState()
    const [phonenumber, setphonenumber] = useState()
    const[type, settype]=useState()
    const[imageurl1, setimageurl1] = useState()

    const[imageurl2, setimageurl2] = useState()

    const[imageurl3, setimageurl3] = useState()
    const [loading, setloding] = useState(false);
  const [error, seterror] = useState();

   async function addRoom(){

        const newroom ={
        
        name,
        
        rentperday,
        
        maxcount,
        
        description, phonenumber,
        
        type,
        
        imageurls: [imageurl1, imageurl2, imageurl3]
        
        }
        
        try {
            setloding(true)
            const result = await(await axios.post('/api/rooms/addroom',newroom)).data
            console.log(result)
            setloding(false)

        } catch (error) {
           
             console.log(error)
             setloding(false)
             seterror(true)
        }
        
        }




    return (
            

    <div className="row">{loading && <Loader/>}
    
    <div className="col-md-5">
    <input type="text" className="form-control" placeholder='room name'
value={name} onChange={(e)=>{setname(e.target.value)}}/>

<input type="text" className="form-control" placeholder='rent per day'
value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>

<input type="text" className="form-control" placeholder="max count"
value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>

<input type="text" className='form-control' placeholder="description"
value={description} onChange={(e)=>{setdescription(e.target.value)}}/>

<input type="text" className="form-control" placeholder='phone number' I
value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
    </div>
    <div className="col-md-5">
    <input type="text" className="form-control" placeholder='type'
value={type} onChange={(e)=>{settype(e.target.value)}}/>

<input type="text" className="form-control" placeholder="Image URL 1"
value={imageurl1} onchange={(e)=>{setimageurl1(e.target.value)}}/>

<input type="text" className="form-control" placeholder="Image URL 2"
value={imageurl2} onchange={(e)=>{setimageurl2(e.target.value)}}/>

<input type="text" className="form-control" placeholder="Image URL 3"
value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}/>

   <div style={{display:"flex", alignItems:"right" , justifyContent:"right"}} >
      
      <button className="btn btn-primary mt-2" onClick={addRoom}> Add Room</button> 

   </div>
    </div>
    </div>)
    }


