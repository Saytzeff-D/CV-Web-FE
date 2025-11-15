import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const GoogleAuth = () => {
    const location = useLocation()
      const [err, setErr] = useState('')
      const navigate = useNavigate()
      const uri = useSelector(state=>state.uri)
    
      useEffect(() => {    
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');    
        if (tokenParam) {
          axios.get(`${uri}auth/me`, {
                headers: { Authorization: `Bearer ${decodeURIComponent(tokenParam)}` }
            })
            .then((res)=>{                
                console.log(res.data);
            })
            .catch((err)=>{
                navigate(`/login?error=${err.response.data.message}`)
            })
        }else navigate('/login?error=Authentication failed')
      }, [location.search]);
  return (
    <Fragment>
        <Navbar />
        <Footer />
    </Fragment>
  )
}

export default GoogleAuth;