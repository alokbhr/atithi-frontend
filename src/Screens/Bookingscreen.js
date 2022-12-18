import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";


export default function Bookingscreen({ match }) {
  const [loading, setloding] = useState(false);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();
  const badmashchora = async () => {
   
    
    try {
      setloding(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", {
          roomid: match.params.roomid,
        })
      ).data;
      settotalamount(data.rentperday * totaldays);
      setroom(data);
      setloding(false);
    } catch (error) {
      setloding(false);
      seterror(true);
    }
  };

  useEffect(() => {
    if(!localStorage.getItem('currentUser')){
      window.location.href='/login'
    }
    badmashchora();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
    } catch (error) {

    }
  }

           



  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                className="bigimg"
                alt="Loading..."
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>
                  <strong>Booking Details</strong>
                </h1>
                <hr />
                <p>
                  <strong>
                    Name :{JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                  </strong>
                </p>
                <p>
                  <strong>From Date : {match.params.fromdate}</strong>
                </p>
                <p>
                  <strong>To Date : {match.params.todate}</strong>
                </p>
                <p>
                  <strong>Max Count :{room.maxcount} </strong>
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>
                  <strong>Amount</strong>
                </h1>
                <hr />
                <p>
                  <strong>Total Days : {totaldays}</strong>
                </p>
                <p>
                  <strong>Rent PerDays : {room.rentperday} </strong>
                </p>
                <p>
                  <strong>Total Amount: {totalamount}</strong>
                </p>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Pay Now
                </button>

                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
