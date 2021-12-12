import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { ProductService } from '../service/ProductService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';


import firebase from '../firebase';

import Loading from './Loading'

import './RestaurantsScreen.css'
import RestaurantsChart from './RestaurantsChart';

const RestaurantsScreen = () => {

    useEffect(() => {
        getData(cityName)
    }, [cityName]);

    const getData = async (cityName) => {
        const ref = firebase.firestore().collection(`Restaurant${cityName}`)
        try {
            await ref.get().then((item) => {
                const items = item.docs.map((doc) => doc.data());
                setResData(items);
                setLoading(false);
            })
        } catch (error) {
            alert(error.message)
        }

    }

    const [resData, setResData] = useState()
    const [loading, setLoading] = useState(true)

    const [cityName, setCityName] = useState('Islamabad')

    const cities = [
        { name: 'Faisalabad', code: 'FSD' },
        { name: 'Islamabad', code: 'ISL' },
        { name: 'Karachi', code: 'KHI' },
        { name: 'Lahore', code: 'LHR' },
        { name: 'Rawalpindi', code: 'RWP' }
    ];

    const handleCityChange = (e) => {
        setLoading(true)
        setCityName(e.value.name);
        getData(e.value.name)
        // setLoading(true)

    }






    return (
        <div className="grid">
            <div className="col-12 xl:col-12">
                {
                    loading ?
                        <Loading /> :
                        <div className="card">
                            <div className="row">
                                <h5>{cityName}</h5>
                                <Dropdown value={cityName} options={cities} onChange={handleCityChange} optionLabel="name" placeholder="Select City" />
                            </div>
                            <DataTable value={resData} className="p-datatable-customers datatable" rows={7} paginator>
                                <Column header="Image" body={(data) => <img src={data.restaurantImage} width="50" />} />
                                <Column field="name" body={(data) => <p>{data.restaurantName}</p>} header="Name" />
                                <Column field="rating" body={(data) => <p>{data.restaurantRating}</p>} header="Rating" />
                                <Column field="edit"
                                    body={(data) => <Button icon="pi pi-pencil" type="button" className="p-button-warning"  onClick={() => console.log(data)} />}
                                    header="Edit"
                                />
                                <Column field="delete"
                                    body={(data) => <Button icon="pi pi-trash" type="button" className="p-button-danger" onClick={() => console.log(data)} />}
                                    header="Delete"
                                />

                            </DataTable>
                        </div>
                }
            </div>
        </div>
    );
}

export default RestaurantsScreen;
