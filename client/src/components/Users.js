import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Media from 'react-bootstrap/Media'

export const Users = () => {
    const [users,setUsers]  = useState([])
    const [search,setSearch] = useState('')
    
    
   
    useEffect(() => {
        const getUsers = async() => {
            await axios.get('https://reqres.in/api/users')
                .then(res => {
                    // console.log(res.data.data)
                    setUsers(res.data.data)
                })
        
        }
        getUsers();
    },[])

// filtering users
    let filteredUsers = users.filter((user) => {
         return (
             user.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
             user.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
             )
    });
    
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search users'
            style={{margin:'50px 0',height:'37px',width:'300px',borderRadius:'5px',outline:'none'}}></input>
            <ul className="list-unstyled">
            {filteredUsers.map(user => (
                    <div key={user.id} style={{display:'flex',flexDirection:'column'}}>
                        <Link to ={`/users/${user.id}`} key={user.id}>
                        <Media as="li" className='mb-5' key={user.first_name}>
                    <img src={user.avatar} width='50' height='50' alt={user.first_name}/>
                    <Media.Body className='ml-3' key={user.id}>
                   <h5 key={user.first_name}> {`${user.first_name} ${user.last_name}`} </h5>
                   </Media.Body>
                   </Media>
                   <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>
                    </Link>
                   <li key={user.id}>{`${user.first_name} ${user.last_name}`}</li>

                 </div>
            ))}
            <Media.Body>This is working but not that</Media.Body>
            <li>this is a li list</li>
            </ul>
    
        </div>
    )
}
