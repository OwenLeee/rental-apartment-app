import * as React from 'react';
import ReactPlayer from 'react-player'; 



class ProfilePage extends React.Component {



    public render() {

        return (
            <>
            <div className="container-fluid p-3" style={{ display: "flex", justifyContent:"center"}}>
                <div className="col-4 p-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", width:"100%", height:"30vh"}}> 
                    <div style={{ width:"100%", borderRadius: "50%" }}>
                        <img src="" alt="hello"/>
                    </div>
                </div>
                <div className="col-8 p-3">
                    <div className="col-12 p-3"> Name: Owen</div>
                    <div className="col-12 p-3"> Email: Owen@owen.com</div>
                    <div className="col-12 p-3"> Gender: Male</div>
                    <div className="col-12 p-3"> Mobile Number: 65343431</div>
                </div>
            </div>
<div><ReactPlayer url='https://www.youtube.com/watch?v=jcvI-MAWc2U' playing={false} controls={true} width='100%'
           /> </div>
           
       
            </>
        )
    }





}

export default ProfilePage; 