import React, { useContext } from 'react'
import { Button, TextField } from '@material-ui/core'
import { multiStepContext } from './StepContext'


const SecondStep = () => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    return (
        <div className='app-header'>
            <div style={{width:'70%'}}>
                <TextField label="Email Address" fullWidth value={userData.email} onChange={(e) => { setUserData({ ...userData, "email": e.target.value }) }} margin='normal' variant='outlined' color='secondary' />
            </div>
            <div style={{width:'70%'}}>
                <TextField label="Password"  fullWidth margin='normal' value={userData.password} onChange={(e) => { setUserData({ ...userData, "password": e.target.value }) }} variant='outlined' color='secondary' />
            </div>
            <div style={{width:'70%'}}>
                <TextField label="Country" fullWidth margin='normal' value={userData.country} onChange={(e) => { setUserData({ ...userData, "country": e.target.value }) }} variant='outlined' color='secondary' />
            </div>
            <div style={{ display: 'flex', gap: '10px',width:'70%' }}>
                <Button variant='contained' onClick={() => setCurrentStep(1)} color='secondary'>Back</Button>
                <Button variant='contained' onClick={() => setCurrentStep(3)} color='primary'>Next</Button>
            </div>
        </div>
    )
}

export default SecondStep