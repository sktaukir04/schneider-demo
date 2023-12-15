import React, { useContext } from 'react'
import { Button, Paper, TextField } from '@material-ui/core'
import { multiStepContext } from './StepContext'
import { Container } from '@material-ui/core';
import './Register.css';

const FirstStep = () => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    return (
            <div className='app-header'>
                <div style={{width:'70%'}}>
                    <TextField label="First Name" fullWidth={true} value={userData.firstname} required onChange={(e) => { setUserData({ ...userData,"id":Date.now(), "firstname": e.target.value }) }} margin='normal' variant='outlined' color='secondary' />
                </div>
                <div style={{width:'70%'}}>
                    <TextField label="Last Name" fullWidth={true} value={userData.lastname} margin='normal' onChange={(e) => { setUserData({ ...userData, "lastname": e.target.value }) }} variant='outlined' color='secondary' />
                </div>
                <div style={{width:'70%'}}>
                    <TextField label="Contact Number" fullWidth value={userData.contact} onChange={(e) => { setUserData({ ...userData, "contact": e.target.value }) }} margin='normal' variant='outlined' color='secondary' />
                </div>
                <div style={{width:'70%'}}>
                    <Button variant='contained' onClick={() => setCurrentStep(2)} color='primary'>Next</Button>
                </div>
            </div>
    )
}

export default FirstStep