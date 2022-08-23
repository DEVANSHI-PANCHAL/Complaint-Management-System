import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap'

import { signin } from "../service/authService";

const LoginPage = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType,setUserType] = useState("");
  const [roles] = useState([
    {
      label: "admin",
      value: "admin"
    },
    { label: "user", 
    value: "user" },
  ]);


  const handleLogin = (e) => {
    e.preventDefault();
   
    const data = {
        username: username,
        password: password,
        userType: userType
      };
    console.log("hi")
    
    console.log(data)
    signin(data).then((response) => {
       
        if(response.data.result.userType === "citizen") {
          localStorage.setItem("user", JSON.stringify(response.data.result));
        }
        else {
          localStorage.setItem("admin", JSON.stringify(response.data.result));
        }
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard", { replace: true });
      });
    
}

  return (
    <>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <h2 className="text-center my-3">Complaint management system</h2><hr/>
          <h4 className="text-center my-3">Login</h4>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" >
                Password
              </label>
              <input
          
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <select className="form-select mb-3" aria-label="Default select example" onChange = {(event) => setUserType(event.target.value)}>
              <option>Login as</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          
          {/* <select onChange = {(event) => setUserType(event.target.value)}>
            {roles.map(({ label, value }) => (
              <option key={value} value={value}  >
          {label}
              </option>
            ))}
          </select> */}
            <button type="submit" className="btn btn-primary"  >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
