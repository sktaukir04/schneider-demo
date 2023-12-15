import React, { useContext, useEffect, useState } from 'react'
import './Hero.css'
import { Link, useNavigate } from 'react-router-dom'
import { multiStepContext } from '../Register/StepContext';

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('shaikhtaukir0212@gmail.com');
  const [password, setPassword] = useState('')

  const {isLoggedIn,setIsLoggedIn}=useContext(multiStepContext);

  useEffect(()=>{
    sessionStorage.clear();
  },[])

  const validate = () => {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      alert("Please enter Email or username")
    }
    if (password === "" || password === null) {
      result = false;
      alert("Please Enter password")
    }
    return result;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:3001/contacts/").then(res => res.json()).then((datas) => {
        // console.log(data[0].email)
        var isFound = false;
        datas.forEach(data => {
          if (data.email === email && data.password === password) {
            console.log("Success....!");
            isFound = true;
            sessionStorage.setItem('email',email)
            setIsLoggedIn(true);
            navigate('/listing');
          } else {
            console.log("Not Found");
          }
          // console.log(datas.password);
        });
        if (!isFound) {

          alert("Invalid Username or Password...!")
        }

      }).catch((err) => console.log("Login Failed due to - " + err.message))
      // console.log("Proceed to login");
    }
  }
  return (
    <div>
      <div className='maindiv'>

      </div>
      <div className="hero-content">
        <div className="leftside">
          <h1>mySchneider</h1>
          <p>My Account. My personalized experience. mySchneider is your one destination which provides 24/7 access to all the content, software, tools, and services to help manage your business.</p>
        </div>
        <div className="rightside">
          <h3>Login or Register</h3>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Email || username' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="rememberbox">
              <input type="checkbox" id='checkbox' />
              <label htmlFor="checkbox" style={{ whiteSpace: 'nowrap' }}>Remember me</label> &nbsp;
              <img src="https://secureidentity.schneider-electric.com/identity/resource/1698631876000/IDMSUIV1/image/Remembe-me-icon.svg" alt="" />
            </div><br />
            <button type='submit' className='nextbtn'>Next</button>
          </form>
          <p>or continue with</p> <br />
          <a href="#" title='Schneider-Electric Employee Login' style={{ marginBottom: '25px' }}><img src={'https://companieslogo.com/img/orig/SCHNEIDER.NS-499a33a2.png?t=1604232067'} width={'30px'} alt="logo" /></a>
          <div className='newText' style={{ fontWeight: 'bold' }}>New to Schneider Electric?</div>
          <button className='registerbtn' onClick={() => navigate('/register')}>Register</button><br />
          <p style={{ fontStyle: 'normal', color: 'gray', fontSize: '15px', marginTop: '5px' }}>We process account registration information and connection logs for authentication and application access management.</p>
          <Link to="#">Privacy notice</Link>
        </div> 
      </div>
    </div>
  )
}

export default Hero