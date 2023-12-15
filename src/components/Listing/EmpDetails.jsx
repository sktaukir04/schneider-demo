import { Box, Button, Container, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./EmpDetail.css"
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { multiStepContext } from '../Register/StepContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const EmpDetails = () => {
  const navigate = useNavigate();
  const {deleteData}=useContext(multiStepContext)
  const { id } = useParams();
  const [data, setdata] = useState({})
  useEffect(() => {
    axios("http://localhost:3001/contacts/" + id).then((data) => {
      setdata(data.data);
    }).catch((err) => console.log(err))
  }, [])



  return (
    <div>
      <Link style={{margin:"100px",marginTop:'40px',padding:"50px"}} to={'/listing'}><ArrowBackIcon/></Link>
      <h3 style={{textAlign:'center'}}>Employee Detail for ID - <span style={{color:'red',textDecoration:'underline'}}>{id}</span></h3>
      <Container className='empdetail'>
        <div>
          <label>FirstName : </label> <span>{data.firstname}</span>
        </div>
        <div>
          <label>LastName : </label> <span>{data.lastname}</span>
        </div>
        <div>
          <label>Contact : </label> <span>{data.contact}</span>
        </div>
        <div>
          <label>Email : </label> <span>{data.email}</span>
        </div>
        <div>
          <label>Country : </label> <span>{data.country}</span>
        </div>
        <div>
          {/* <label>password : </label> <span>{data.password}</span> */}
        </div>
        <div>
          <label>City : </label> <span>{data.city}</span>
        </div>
        <div>
          <label>Landmark : </label> <span>{data.landmark}</span>
        </div>
        <div>
          <label>Pin code : </label> <span>{data.pincode}</span>
        </div>
      </Container>
      <div className='detailbtncontainer'>
        <Button startIcon={<EditIcon />} onClick={() => { navigate('/edit/' + data.id,{ state: { data: data } }) }} color='primary' variant='outlined'> Edit </Button>
        <Button startIcon={<DeleteIcon />} onClick={() =>{ deleteData(data.id); navigate('/listing')}} color='secondary' variant='outlined'>Delete </Button>
      </div>
    </div>
  )
}

export default EmpDetails