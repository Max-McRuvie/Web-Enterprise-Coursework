import React from "react";

export default function Logoff() {
    sessionStorage.removeItem("auth")
    return (
      <>
        <div >
          <h1>Logged off now! </h1>
        </div>
      </>
    );
}
