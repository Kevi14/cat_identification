import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAccessToken,setRefreshToken } from '../store/authSlice'
import axios from 'axios';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = import.meta.env.VITE_API_GOOGLE_SECRET

    loadScript(src)
      .then(() => {
      
        /*global google*/
        
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current,
          { theme: 'outline', size: 'large' }
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])


  function handleCredentialResponse(response) {
    if (response.credential) {
      const data = { auth_token: response.credential }
      axios.post(`${import.meta.env.VITE_API_URL}/auth/google/`, data, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then((response) => {
          const responseData = response.data.data;
          console.log(responseData)
          dispatch(setAccessToken(responseData.access));
          dispatch(setRefreshToken(responseData.refresh));
          navigate("/"); // Redirect to the home page after successful login
        })
        .catch((error) => {
          console.error('Error authenticating with Google:', error);
          // Handle authentication error and show an error message to the user
        });
    }
  }
  

  return (
    <div id='google-login-btn'>
    <div ref={googleButton} id='google-ref'></div>
    </div>
    
  )
}

export default GoogleAuth