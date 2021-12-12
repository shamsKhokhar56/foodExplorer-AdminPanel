import firebase from 'firebase'
import { useHistory } from "react-router-dom"

const Logout = () => {
    const history = useHistory()
    firebase.auth().signOut()
    return history.push('/login')
}

export default Logout
