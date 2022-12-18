import React,{useState} from 'react';
import DotLoader from "react-spinners/DotLoader";

export default function Loader() {
    let [loading, setLoading] = useState(true);
    
  return (
    <div style={{height:"100vh", width:"100vw", marginTop:"20%"}}>
      <div className="sweet-loading" style={{display:"flex", alignItems:"center" , justifyContent:"center"}}>
      
      <DotLoader color='#000' loading={loading} css='' size={80}/>
    </div>
    </div>
    
  )
}
