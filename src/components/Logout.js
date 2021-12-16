import React from 'react'
import firebase from 'firebase'
import { Redirect } from "react-router-dom"

const Logout = () => {
    firebase.auth().signOut()
    return <Redirect to="/login" />
}

export default Logout
