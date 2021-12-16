import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown';

import './AddRestaurant.css'
import firebase from 'firebase';
// import { Redirect } from 'react-router-dom';

const AddRestaurant = (props) => {
    const [restaurantName, setRestaurantName] = useState()
    const [restaurantRating, setRestaurantRating] = useState()
    const [restaurantAddress, setRestaurantAddress] = useState()
    const [restaurantImage, setRestaurantImage] = useState()
    const [openingTime, setOpeningTime] = useState()
    const [closingTime, setClosingTime] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [cityName, setCityName] = useState()

    const cities = [
        { name: 'Faisalabad', code: 'FSD' },
        { name: 'Islamabad', code: 'ISL' },
        { name: 'Karachi', code: 'KHI' },
        { name: 'Lahore', code: 'LHR' },
        { name: 'Rawalpindi', code: 'RWP' }
    ];

    const handleSubmit = async () => {
        const ref = firebase.firestore().collection(`Restaurant${cityName}`).doc()
        const restaurantId = ref.id
        await firebase.firestore().collection(`Restaurant${cityName}`).doc().set({
            city: cityName,
            cityCode: cityName.slice(0, 1).toLowerCase(),
            closingTime: closingTime,
            latitude: latitude,
            linkNumber: '',
            longitude: longitude,
            openingTime: openingTime,
            restaurantAddress: restaurantAddress,
            restaurantId: restaurantId,
            restaurantImage: restaurantImage,
            restaurantName: restaurantName,
            restaurantRating: restaurantRating,
        })
        alert('Changes saved.')
        props.loading()
        props.onClose()
        // return <Redirect to="/restaurants" />
    }
    const handleCityChange = (e) => {
        setCityName(() => e.value.name)
    }

    return (
        <div>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="firstname1">Location</label>
                    <Dropdown value={cityName} options={cities} optionLabel="name" onChange={handleCityChange} placeholder="Select City" />
                </div>
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
                    <label htmlFor="firstname1">Restaurant Banner Link</label>
                    <InputText id="firstname1" type="text" value={restaurantImage} onChange={(e) => setRestaurantImage(e.target.value)} />
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
                <Button label="Add" icon="pi pi-check" autoFocus onClick={handleSubmit} className="p-button-warning" />
            </div>
        </div>
    )
}

export default AddRestaurant;