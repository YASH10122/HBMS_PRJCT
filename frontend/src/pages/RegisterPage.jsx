/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  console.log(formData);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    });
  };

    
  console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate()

  const handleSubmit = async (e)  => {
    e.preventDefault()
    try{
      const register_form = new FormData()
    
      for(var key in FormData) {
        register_form.append(key, formData[key])
      }
  
    const response = await fetch("http://localhost:1012/auth/register", {
      method: "POST",
      body : register_form
    })
  
    if(response.ok){
      navigate("/login")
    }
    } catch(err){
      console.log("regristration failed", err.message);
      
    }

    // if(formData.password === formData.confirmPassword) {
    //   setPasswordMatch(true)
    // }else {
    //   setPasswordMatch(false)
    // }
  }


  /*const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.confirmPassword, formData.password]);

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const register_form = new FormData();

      for (let i in FormData) {
        register_form.append(i, formData[i]);
      }

      const response = await fetch("http://localhost:4546/auth/register", {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  };*/

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
}
///ok
export default RegisterPage;
