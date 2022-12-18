import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {

  const [rooms, setRooms] = useState([]);
  const [loading, setloding] = useState();
  const [error, seterror] = useState();
  const [tdate,settdate] = useState(null);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const [searchkey , setsearchkey] = useState('');
  const [type,settype ] = useState('all');


  const test = async () => {
    try {
      setloding(true);
      const data = (await axios.get("/api/rooms/getallrooms")).data;
      console.log(data);
      setRooms(data.rooms);
      setduplicaterooms(data.rooms);
      setloding(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloding(false);
    }
  };

  useEffect(() => {
    // console.log("use effect called here");
  

    test();
  }, []);
  
  
  // let tdate =  null;

  function filters(tdate)
  {
    // console.log(dates)
    var temprooms = [];
    var availability = false;
      // console.log(duplicaterooms)

    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        // console.log('aaaa')
        for (const booking of room.currentbookings) {
          
          console.log("i am called here");
          console.log(fromdate);
          console.log(todate);
          console.log(booking.fromdate)
          console.log(booking.todate)
          // var beforeTime=moment(booking.fromdate);
          // var afterTime=moment(booking.todate);

          var first = moment(fromdate ,"DD-MM-YYYY").isAfter(booking.fromdate)

          var second = moment(todate, "DD-MM-YYYY").isBetween(booking.fromdate,booking.todate)

             console.log(first)
             console.log(second)

          if(!first && !second)
          { 
              availability = true;
              console.log(availability);
          }else{
            setRooms(duplicaterooms)
          }

        }

      }
          
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
     }
        
      setRooms(temprooms);
    }

    settdate(null)
  }

  

  function filterByDate(dates) {

    setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
    settodate(moment(dates[1].$d).format("DD-MM-YYYY"));
    settdate(dates)  
  }

  // console.log("bhaangbhosra")
  // console.log(fromdate);
  // console.log(todate);

  if(fromdate!=null && todate!=null && tdate!=null)
  {
    //  console.log(tdate);
     filters(tdate);

    // filterByDate()
  }
  function  filterbysearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setRooms(temprooms)
  }


  function filterByType(e){
    settype(e)
   if (e!=='All') {
    const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temprooms)
    
   } else {
    setRooms(duplicaterooms)
    
   }
  }



  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3 ">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className=" col-md-5">
          <input type='text' className="form-control" placeholder="Search rooms" value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterbysearch} ></input>
        </div>
        <div className="col-md-3 " > 

        <select className="" value={type} onChange={(e)=>{
          filterByType(e.target.value)
        }}>
          <option value='onlyshow'> Type of room </option>
          <option value='All'>All</option>
          <option value='delux'>Delux</option>
          <option value='non-delux'>Non-Delux</option>
        </select>
        
        </div>

      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) :  (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) 
          
        }
      </div>
    </div>
  );
}
export default Homescreen;
