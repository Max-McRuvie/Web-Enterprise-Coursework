import React, { useEffect, useState } from 'react'
import {getProfile} from '../features/user/user-api'


const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        getProfile()
            .then(response => {
                setProfile({
                    name: response.name,
                    email: response.email,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>

        </div>
    )
}


export default Profile