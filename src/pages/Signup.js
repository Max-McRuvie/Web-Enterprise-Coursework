import React, {useState} from "react";
import axios from 'axios';

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
      })
    
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    
    const handleSubmit = (e) => {
            e.preventDefault();
            console.log("Signing up")
            let data = {"name": values.name, "email": values.email, "password" : values.password}
            var requestURI = "http://localhost:3000/api/users"
            console.log(requestURI)
            axios.post(requestURI, data)

    }

    return (
      <div id="signup">
        <form>
        <label>
            name:
            <input type="text" name="name" onChange={handleChange('name')}/>
          </label>
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