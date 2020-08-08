import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const User = ({match}) => {
    const [user,setUser] = useState({})
    const [slotBooked,setSlotBooked] = useState(false)
    const [selectedDate,setSelectedDate] = useState(new Date())
    const [modalShow, setModalShow] = useState(false)
    const [userName,setUserName] = useState('')
    const [filterSlotsByName,setFilterSlotsByName] = useState([])
    const  id=match.params.id

    useEffect(() => {
        const getUsers = async() => {
            await axios.get(`https://reqres.in/api/users/${id}`)
                .then(res => {
                    // console.log(`${res.data.data.first_name} ${res.data.data.last_name}`)
                    setUserName(`${res.data.data.first_name} ${res.data.data.last_name}`)
                    setUser(res.data.data)
                    
                })
        }
        getUsers();

        // gets slots
        const getSlots = async() => {
            await axios.get('/api/slot')
                .then(res => {
                    // console.log(res.data)
                    setFilterSlotsByName(res.data)
                })
        }
        getSlots();
    },[id])

    // filter names
    let filterNames = filterSlotsByName.filter(user => {

       return  user.name === userName  
    })
    // console.log(filterNames.map(user => console.log(user._id)))

    const onSubmit = (e) => {
        e.preventDefault();
        
        const slot = {
            name:`${user.first_name} ${user.last_name}`,
            email:`${user.email}`,
            date:selectedDate
        }
        // console.log(slot);

        axios.post('/api/slot/book', slot)
            .then(res => {
                // console.log(res.data)
                if(res.data === 'slot booked!') alert('Your slot is booked')
                setSlotBooked(true)
            })
    }
    

    const doubleBooking = (e) => {
        e.preventDefault();
        alert('OOPS! Your slot is already booked!')
    }

    
    const idOfUser = filterNames.map(user => user._id)
    // console.log(idOfUser)
    const onDeleteClick = () => {
         axios.delete(`/api/slot/${idOfUser[0]}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
   
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'40px'}}>
            <img src={user.avatar} alt={user.first_name}/>
            <Form onSubmit={slotBooked ? doubleBooking : onSubmit}>
            <h5> Name: {`${user.first_name} ${user.last_name}`} </h5>   
            <h5>Email: {user.email}</h5>
            <DatePicker className='ml-5' selected={selectedDate} minDate={new Date()} isClearable showYearDropdown scrollableMonthYearDropdown onChange={date => setSelectedDate(date)}/><br />
            <button className={slotBooked ? 'btn btn-primary mt-3 ml-5 disabled' : 'btn btn-primary mt-3 ml-5'} type='submit'>Book Slot</button>
            </Form>

            <Button variant={slotBooked ? 'primary' : 'secondary'} onClick={() => setModalShow(true)} className='mt-3'>
            View slot details
         </Button>
         <Modal
    //   {...props}
    show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Slot details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Slot is booked on:</h4>
            <div>
          {filterNames.map(user => (
              <h1 key={user._id}>{`${user.date}`.substring(0,10)}<span className='btn btn-danger float-right' onClick={onDeleteClick}>X</span></h1>
          ))}
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}
