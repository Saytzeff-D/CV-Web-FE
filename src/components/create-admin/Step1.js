import { useFormik } from "formik";
import React, { useState } from "react";
import { createAdminSchema } from "../../schemas";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Step1 = (props) => {
  const [fileSize, setFileSize] = useState('');
  const {setStep} = props;
  const [isLoading, setIsLoading] = useState(false);
  const uri = useSelector(state=>state.UriReducer.uri)
  const [error, setError] = useState('');

  const {handleBlur, handleChange, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        username: '',
        password: '',
        confirmPassword: '',
        avatar: ''
    },
    validationSchema: createAdminSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios.post(`${uri}auth/admin/register`, values).then((res)=>{        
        sessionStorage.setItem('adminEmail', values.email);
        setStep(2);
        console.log("Admin created successfully:", res.data);
      }).catch((err) => {
        setIsLoading(false);
        err ? setError(err.response.data.message) : setError('An error occurred while creating admin');
      });
      // Handle form submission
    }
  })

  const processAvatar = (e)=>{
      let file = e.target.files[0]
      if (!file) {
          console.log('No file selected')
      } else {
        if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
            JSON.stringify(file.size).length >= 7 ? setFileSize(`${Math.ceil(file.size/1000000)}MB`) : setFileSize(`${Math.ceil(file.size/1000)}KB`)
            const fs = new FileReader()
            fs.readAsDataURL(file)
            fs.onload = ()=>{
                values.avatar = fs.result
            }
        } else {
            alert('File format not supported')
        }        
      }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-create-admin"
    >
      <div className="bg-opacity-75 p-4 rounded-4" style={{ width: "100%", maxWidth: "600px" }}>
        {/* Header */}
        <div className="mb-4">
          <h5 className="fw-bold text-success mb-1">Create Account For Administrator</h5>
          <p className="text-muted small mb-0">Fill in the information to get started</p>
        </div>

        {/* Step Progress */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="bg-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
        </div>
        <p className="text-center text-success small fw-semibold mb-4">Step 1 of 3</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error" className="mb-3">{error}</Alert>}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label small fw-semibold">First Name</label>
              <input type="text" name="firstname" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.firstname && touched.firstname ? ' is-invalid' : '')} placeholder="Temi" />
            </div>
            <div className="col">
              <label className="form-label small fw-semibold">Last Name</label>
              <input type="text" name="lastname" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.lastname && touched.lastname ? ' is-invalid' : '')} placeholder="Ayeni" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label small fw-semibold">Email Address</label>
              <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="falanayemi@gmail.com" />
            </div>
          </div>

          <div className="row mb-3">            
            <div className="col">
              <label className="form-label small fw-semibold">Phone Number</label>
              <input type="text" name="phone_number" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.phone_number && touched.phone_number ? ' is-invalid' : '')} placeholder="080" />
            </div>
            <div className="col">
              <label className="form-label small fw-semibold">Username</label>
              <input type="text" name="username" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.username && touched.username ? ' is-invalid' : '')} placeholder="Eg Petgreen" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label small fw-semibold">Password</label>
              <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3" + (errors.password && touched.password ? ' is-invalid' : '')} />
            </div>
            <div className="col">
              <label className="form-label small fw-semibold">Confirm Password</label>
              <input type="password" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} className={"form-control bg-transparent rounded-3 " + (errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : '')} />
            </div>
          </div>

          {/* Upload Profile Picture */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">Profile Picture</label>
            <div
              className="border border-success border-2 rounded-4 p-4 text-center bg-transparent"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("avatarUpload").click()}
            >
              <i className="fa fa-cloud-arrow-up fs-4 text-success mb-2"></i>
              <p className="mb-0 small text-muted">Upload profile picture</p>
              {
                fileSize == '' 
                ? 
                <i className="fa fa-info-circle text-success small"></i>
                : 
                <p className="small text-success my-0">{fileSize}</p>
              }
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                className="d-none"
                onChange={(e) => processAvatar(e)}
              />
            </div>
          </div>

          {/* Checkbox */}
          {/* <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" id="agree" />
            <label className="form-check-label small text-muted" htmlFor="agree">
              Agree to Our Teams & Policies
            </label>
          </div> */}

          {/* Button */}
          <button disabled={isLoading} type="submit" className="btn btn-success w-100 rounded-3 py-2 fw-semibold">
            {isLoading ? 'Please wait...' : 'CONTINUE'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Step1;