import React, {useEffect, useState} from 'react'
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';



const EditModal = ({current}) => {

    const initialState = {
        id: null,
        name: '',
        bio: ''
    }

    const [user, setUser] = useState(initialState); 
    useEffect( () => {

        setUser(current);

    },[current]);
    
     
    const {name, bio, id} = user;

    
    const handleChange = (e) => {
        e.preventDefault();
        setUser( {
            ...user,
            [e.target.name]: e.target.value
      

        })
        
    }

   
    

    // const handleClick = e => {

    //     setRestaurant({
    //         ...restaurant,
    //         stamped: e.target.value
    //     })
    // }
    const onSubmit= (e) => {
        e.preventDefault();
        axios.put(`https://node-project1-test.herokuapp.com/api/users/${id}`, user)
        .then( res => { 
            M.toast({html: `${res.data.name} is updated`})
            console.log(res.data);
        } )
        
        .catch(err =>{
             console.log('error', err.response.data.errorMessage);
             M.toast({html: `${err}`})
        }
           

        )


        setUser({});
        

        
    }

    // if (isFetching) {
    //     return <Preloader />
        
    // }


    return (
        <div id='EditModal' className='modal' style={modalStyle} >
            <div className="modal-content">
                <h4>Add Member</h4>
                <div className="row">
                    <div className="input-field">
                        
                        <input type='text' name="name" value={ name } onChange = {handleChange} />
                        <label htmlFor="name">Your Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <label htmlFor="bio">Your Bio</label>
                        <input type='text' name="bio" value={bio}  onChange = {handleChange} />

                    </div>
                </div>
             
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} style={{ marginRight: '10px',marginBottomt: '10px',backgroundColor: '#ee6e73'}} className="modal-close btn waves-effect waves-light">Edit</a>
            </div>
        

        </div>
    )
}

const modalStyle = {
    width: '50%',
    height: '100%',
    padding: '20px'
}

export default EditModal;