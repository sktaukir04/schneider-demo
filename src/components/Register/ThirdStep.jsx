import React, { useContext } from 'react'
import { Button, TextField } from '@material-ui/core'
import { multiStepContext } from './StepContext'
import axios from 'axios'
const ThirdStep = () => {
    const { setCurrentStep, userData, setUserData,submitData } = useContext(multiStepContext)
    // const submitData =()=>{
    //     setUserData({...userData,userData,"id":Date.now()});
    //     axios.post("http://localhost:3001/contacts",userData);
    // }
    return (
        <div className='app-header'>
            <div style={{width:'70%'}}>
                <TextField label="City" margin='normal' fullWidth value={userData.city} onChange={(e)=>{setUserData({...userData,"city":e.target.value})}} variant='outlined' color='secondary' />
            </div>
            <div style={{width:'70%'}}>
                <TextField label="Landmark" margin='normal' fullWidth value={userData.landmark} onChange={(e)=>{setUserData({...userData,"landmark":e.target.value})}} variant='outlined' color='secondary' />
            </div>
            <div style={{width:'70%'}}>
                <TextField label="Postal Code" margin='normal' fullWidth value={userData.pincode} onChange={(e)=>{setUserData({...userData,"pincode":e.target.value})}} variant='outlined' color='secondary' />
            </div>
            <div style={{display:'flex',gap:'10px',width:'70%'}}>
                <Button variant='contained' onClick={() => setCurrentStep(2)} color='secondary'>Back</Button>
                <Button variant='contained' onClick={submitData} color='primary'>Submit</Button>
            </div>
        </div>
    )
}

export default ThirdStep