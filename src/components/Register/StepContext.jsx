import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const multiStepContext = createContext();
const StepContext = ({children}) => {
  const navigate = useNavigate();
    const [currentStep,setCurrentStep]=useState(1); 
    const [userData,setUserData]=useState([]);
    const [finalData,setFinalData]=useState([]);
    const [isLoggedIn,setIsLoggedIn]=useState(false)
 
    
    const editData = (id)=>{
      if(userData.firstname){
        axios.put("http://localhost:3001/contacts/"+id,userData)
        .then((res)=>{alert("Updated Successfully...!");navigate('/listing')})
        .catch(err=>console.log(err))
      }else{
        alert("Please fill the details")
      } 

    
    
    }
    const deleteData = (id)=>{
      // console.log(id);
      if (window.confirm("Do you want to Delete ?")) {
        fetch("http://localhost:3001/contacts/"+id,{
          method:"DELETE"
        }).then((data)=>alert("REmoved Success")).catch((err)=>{
          console.log(err);
          window.location.reload();
          navigate('/listing')
        })
      }else{
        
      }
    }
    
    
    // function submitData(){
    //   if(userData.firstname&&userData.email){
    //     setFinalData(finalData=>[...finalData,userData]);
    //     axios.post('http://localhost:3001/contacts',userData)
    //     setUserData('');
    //     setCurrentStep(1);
    //     navigate("/listing");
    //     window.location.reload();
    //   }else{
    //     window.alert("Please enter all the fields..!")
    //   }
    // }

    async function submitData() {
      try {
        if (userData?.firstname && userData.email && userData.password) {
          var alreadyExists = false;
          fetch('http://localhost:3001/contacts')
            .then((res) => res.json()).then((datas) => {
              datas.forEach((data) => {
                if (data.email===userData.email) {
                  alreadyExists = true;
                  alert("Email Already Exists")
                } else {
                  sessionStorage.setItem('email', userData.email);
                  if (!alreadyExists) {
                    console.log(alreadyExists);
                    
                    axios.post('http://localhost:3001/contacts', userData).catch((err)=>console.log(err));
                    sessionStorage.setItem('email', userData.email)
                    setUserData({ firstname: '', lastname: '', email: '', country: '', city: '', landmark: '', pincode: '', contact: '', password: '' });
                    setCurrentStep(1);
                    navigate("/listing");
                    // window.location.reload();
                  }
                }
              });
            })
        } else {
          window.alert("Please enter all the fields..!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <multiStepContext.Provider value={{currentStep,isLoggedIn,setIsLoggedIn,setCurrentStep,userData,finalData,setFinalData,setUserData,editData,deleteData,submitData}}>
        {children}
    </multiStepContext.Provider>
  )
}

export default StepContext;