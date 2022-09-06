import React, {useState } from "react";
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { Navigate } from 'react-router-dom';
import axios from "axios";



export default function Login() {
    const [isSignedIn, setSignedin] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); 
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const registerUser = (uname, uemail) => {
      console.log("Calling register", uname, uemail);
      var userfound = false;
      axios.get("http://localhost:5001/login")
      .then((res) => {
            res.data.find(users => {
              if (users.email === uemail) {
                userfound = true;
                console.log(userfound);
                console.log("A match email:", users.email )
                localStorage.setItem("userId", users._id);
                setisLoggedIn(true);
              } else {
                console.log("Not a match email:", users.email)
              }
            });
      })
      .finally(() => {
            console.log("after Call", userfound);
            if (userfound) {
              console.log("User Email already Exists: ",uemail);
            } else {
              const newUser = {
                username: uname,
                email: uemail,
              }
              console.log(newUser);
              axios.post("http://localhost:5001/login/register", newUser)
              .then((res) => {
                console.log("CAlled post")
                console.log(res.data)
                localStorage.setItem("userId", res.data);
                setisLoggedIn(true);
              });
            }
        });

    }

    useGoogleOneTapLogin ({
      onError: (error) => console.log(error),
      onSuccess: (response) => {
          setName(response.given_name);
          setEmail(response.email);
          setSignedin(true);
          console.log(response)
          registerUser(response.given_name, response.email)},
          googleAccountConfigs: {
          client_id:"167615487514-ljttv9mpd42dj02g4dbmj2lvmua9tcmm.apps.googleusercontent.com",
        }
        
    })
  return(
      <>
       {isLoggedIn ? <Navigate to="/" /> : null}
       </>
    )
}