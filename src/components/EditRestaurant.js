import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'

import './EditRestaurant.css'
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

const EditRestaurant = (props) => {
    const cityname = props.city
    const [restaurantName, setRestaurantName] = useState(props.data.restaurantName)
    const [restaurantRating, setRestaurantRating] = useState(props.data.restaurantRating)
    const [restaurantAddress, setRestaurantAddress] = useState(props.data.restaurantAddress)
    const [openingTime, setOpeningTime] = useState(props.data.openingTime)
    const [closingTime, setClosingTime] = useState(props.data.closingTime)
    const [latitude, setLatitude] = useState(props.data.latitude)
    const [longitude, setLongitude] = useState(props.data.longitude)
    const [image, setImage] = useState(props.data.restaurantImage)

    const handleSubmit = async () => {
        await firebase.firestore().collection(`Restaurant${cityname}`).doc(props.data.id).update({
            restaurantName: restaurantName,
            restaurantRating: restaurantRating,
            restaurantAddress: restaurantAddress,
            restaurantImage: image,
            openingTime: openingTime,
            closingTime: closingTime,
            latitude: latitude,
            longitude: longitude,
        })
        alert('Changes saved.')
        props.loading()
        props.onClose()
        return <Redirect to="/restaurants" />
    }

    return (
        <div>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="firstname1">Restaurant Name</label>
                    <InputText id="firstname1" type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Rating</label>
                    <InputText id="lastname1" type="text" value={restaurantRating} onChange={(e) => setRestaurantRating(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="firstname1">Address</label>
                    <InputText id="firstname1" type="text" value={restaurantAddress} onChange={(e) => setRestaurantAddress(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="firstname1">Restaurant Banner</label>
                    <InputText id="firstname1" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Opening Time</label>
                    <InputText id="lastname1" type="text" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Closing Time</label>
                    <InputText id="lastname1" type="text" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Latitude</label>
                    <InputText id="lastname1" type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Longitude</label>
                    <InputText id="lastname1" type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                </div>
            </div>
            <div className="footer-buttons">
                <Button label="Cancel" icon="pi pi-times" onClick={props.onClose} className="p-button-danger p-button-text" />
                <Button label="Update" icon="pi pi-check" autoFocus onClick={handleSubmit} className="p-button-warning" />
            </div>
        </div>
    )
}

export default EditRestaurant;