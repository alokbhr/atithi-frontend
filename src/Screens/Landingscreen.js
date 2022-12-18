import React from 'react' 
import {Link} from 'react-router-dom'

function Landingscreen() {

    return(
    
    <div className='row landing justify-content-center'>
    
    <div className="col-md-9 my-auto text-center" style={{borderRight : '8px solid white'}}>
    
    <h3 style={{color : 'white' ,fontSize : '130px'}}>अतिथि</h3>
    
    <h1 style={{color : 'white' }}>"अतिथि देवो भवः"</h1>
    
    <Link to='/home'>

     <button className='btn landingbtn' >Get Started</button>
    
    </Link>
    
    </div> 
    
    </div>
    )
    
}
    
    export default Landingscreen