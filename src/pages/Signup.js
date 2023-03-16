import React from "react";

export default function Signup() {
    return (
      <div id="signup">
        <form>
          <label>
            e-mail:
            <input type="text" name="email" />
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
}
