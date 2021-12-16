import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import './Login.css'

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import AuthContext from '../contexts/AuthContext'
import firebase from '../firebase';


import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


export default function Login() {
	const [details, setDetails] = useState({ email: "", password: "" })
	const [error, setError] = useState("")
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!details.email.includes('admin')) {
			setError('Invalid Credentials')
		}
		else {
			try {
				setError("")
				await firebase.auth().signInWithEmailAndPassword(details.email, details.password)
				history.push("/dashboard")
			} catch {
				setError("Failed to log in")
			}
		}

	}

	return (
		<div className="container">
			<div className="form-main">
				<div className="p-text-center heading-text">Food Explorer</div>
				<div className="form-inner">
					<div className="error-inner">
						{(error !== "") ? (
							<div className="error">
								{error}
							</div>
						) : (
							<div className="error">
							</div>)
						}
					</div>
					<div className="form-group">
						<span className="p-float-label">
							<InputText id="email" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} />
							<label htmlFor="email">Email</label>
						</span>
					</div>
					<div className="form-group">
						<span className="p-float-label">
							<Password value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} feedback={false} />
							<label htmlFor="password">Password</label>
						</span>
					</div>
				</div>
				<div className="signin-button">
					<Button label="SIGN IN" onClick={handleSubmit} className="p-button-rounded p-button-warning" />
				</div>
			</div>
		</div>
	)

}
