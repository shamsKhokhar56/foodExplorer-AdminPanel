import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { ProductService } from '../service/ProductService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';


import firebase from '../firebase';

import Loading from './Loading'

import './RestaurantsScreen.css'
import EditRestaurant from './EditRestaurant'
import AddRestaurant from './AddRestaurant';

const RestaurantsScreen = () => {

    useEffect(() => {
        getData(cityName)
    }, []);

    const getData = async (cityName) => {
        const ref = firebase.firestore().collection(`Restaurant${cityName}`)
        try {
            await ref.get().then((item) => {
                const items = item.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setResData(items);
                setLoading(false);
            })
        } catch (error) {
            alert(error.message)
        }

    }

    const [resData, setResData] = useState()
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState(null)

    const [modalCheck, setModalCheck] = useState(false)
    const [addModalCheck, setAddModalCheck] = useState(false)

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
    }
    const handleModal = () => {
        setModalCheck(false)
    }
    const handleAddModal = () => {
        setAddModalCheck(false)
    }

    const deleteData = async (data) => {
        await firebase.firestore().collection('RestaurantDeleted').doc(data.id).set(data)
            .catch(e => console.log(e.message))
        await firebase.firestore().collection(`Restaurant${cityName}`).doc(data.id).delete()
            .then(() => alert('successfully deleted'))
            .then(() => getData(cityName))
            .catch(e => console.log(e.message))
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
                                <div className="row">
                                    <Button label="Add New Restaurant" icon="pi pi-plus" className="p-button-success mr-3"
                                        onClick={() => setAddModalCheck(true)}
                                    />
                                    <Dropdown value={cityName} options={cities} onChange={handleCityChange} optionLabel="name" placeholder="Select City" />
                                </div>
                            </div>
                            <DataTable value={resData} className="p-datatable-customers datatable" rows={7} paginator>
                                <Column header="Image" body={(data) => <img src={data.restaurantImage} width="50" />} />
                                <Column field="name" body={(data) => <p>{data.restaurantName}</p>} header="Name" />
                                <Column field="rating" body={(data) => <p>{data.restaurantRating}</p>} header="Rating" />
                                <Column field="edit"
                                    body={(data) => <Button icon="pi pi-pencil" type="button" className="p-button-warning"
                                        onClick={() => { setModalCheck(true); setValues(data) }} />
                                    }
                                    header="Edit"
                                />
                                <Column field="delete"
                                    body={(data) => <Button icon="pi pi-trash" type="button" className="p-button-danger"
                                        onClick={() => deleteData(data)} />
                                    }
                                    header="Delete"
                                />

                            </DataTable>
                        </div>
                }
            </div>
            <Dialog
                header="Edit Restaurant" visible={modalCheck} style={{ width: '70vw' }}
                onHide={() => setModalCheck(false)}
            // footer={renderFooter(modalCheck)}
            >
                <EditRestaurant loading={() => { setLoading(true); getData(cityName) }} data={values} city={cityName} onClose={handleModal} />
            </Dialog>
            <Dialog
                header="Add New Restaurant" visible={addModalCheck} style={{ width: '70vw' }}
                onHide={() => setAddModalCheck(false)}
            // footer={renderFooter(modalCheck)}
            >
                <AddRestaurant loading={() => { setLoading(true); getData(cityName) }} onClose={handleAddModal} />
            </Dialog>
        </div>
    );
}

export default RestaurantsScreen;
