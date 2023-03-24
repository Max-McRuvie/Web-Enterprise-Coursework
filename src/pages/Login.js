import React, {useState} from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthBool, unsetAuthBool } from '../state/user/userReducer';
import store from '../state/store';

export default function Login() {
    const [values, setValues] = useState({
        password: '',
        email: '',
        authorised: false,
        token: ''
      })
    
    const dispatch = useDispatch();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Logging In")
            let data = {"email": values.email, "password" : values.password}
            var requestURI = "http://localhost:3000/auth.signin"
            console.log(requestURI)
            axios.post(requestURI, data)
            .then(response => {
            console.log("Setting JWT in storage")
            sessionStorage.setItem('auth', JSON.stringify(response.data));
            setValues({ ...values, 'authorised': true })
            setValues({ ...values, 'token': JSON.stringify(response.data) })
            dispatch(setAuthBool())
            })
            .catch(err => {
            console.log(err)
            });
    }

    return (
      <div id="signup">
        <form>
          <label>
            e-mail:
            <input type="text" name="email" onChange={handleChange('email')}/>
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" name="password" onChange={handleChange('password')}/>
          </label>
          <br></br>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
    );
}