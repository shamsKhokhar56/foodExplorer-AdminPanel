import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { ProductService } from '../service/ProductService';

import firebase from '../firebase';

import Loading from './Loading'

import './Dashboard.css'
import RestaurantsChart from './RestaurantsChart';

export const Dashboard = () => {

    const [loading, setLoading] = useState(true)
    const [FaisalabadCount, setFaisalabadCount] = useState()
    const [IslamabadCount, setIslamabadCount] = useState()
    const [KarachiCount, setKarachiCount] = useState()
    const [LahoreCount, setLahoreCount] = useState()
    const [RawalpindiCount, setRawalpindiCount] = useState()
    const [restCount, setRestCount] = useState()
    const [userCount, setUserCount] = useState()

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await firebase.firestore().collection('RestaurantFaisalabad').get()
            .then(function (querysnapshot) { setFaisalabadCount(querysnapshot.size) })
        await firebase.firestore().collection('RestaurantIslamabad').get()
            .then(function (querysnapshot) { setIslamabadCount(querysnapshot.size) })
        await firebase.firestore().collection('RestaurantKarachi').get()
            .then(function (querysnapshot) { setKarachiCount(querysnapshot.size) })
        await firebase.firestore().collection('RestaurantLahore').get()
            .then(function (querysnapshot) { setLahoreCount(querysnapshot.size) })
        await firebase.firestore().collection('RestaurantRawalpindi').get()
            .then(function (querysnapshot) { setRawalpindiCount(querysnapshot.size) })
        await firebase.firestore().collection('Restaurant').get()
            .then(function (querysnapshot) { setRestCount(querysnapshot.size) })
        await firebase.firestore().collection('User').get()
            .then(function (querysnapshot) { setUserCount(querysnapshot.size) })
        setLoading(false)
    }
    const basicData = {
        labels: ['Faisalabad', 'Islamabad', 'Karachi', 'Lahore', 'Rawalpindi'],
        datasets: [
            {
                label: 'Restaurants',
                backgroundColor: 'orange',
                data: [
                    FaisalabadCount, IslamabadCount, KarachiCount,
                    LahoreCount, RawalpindiCount
                ],
            },
        ]
    };
    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return {
            basicOptions,
        }
    }

    const { basicOptions } = getLightTheme();

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0 carClass">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Restaurants</span>
                            <div className="text-900 font-medium text-xl">{restCount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '4rem', height: '4rem' }}>
                            <i className="pi pi-building text-blue-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0 carClass" >
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Cities</span>
                            <div className="text-900 font-medium text-xl">5</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '4rem', height: '4rem' }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0 carClass">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Users</span>
                            <div className="text-900 font-medium text-xl">{userCount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '4rem', height: '4rem' }}>
                            <i className="pi pi-user text-cyan-500 text-xl" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card chartCard">
                    <h5>Restaurants Data</h5>
                    {
                        loading ?
                            <Loading />
                            :
                            <Chart className="charts" type="bar" data={basicData} options={basicOptions} />

                    }
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card chartCard">
                    <h5>Users</h5>
                    {loading ?
                        <Loading />
                        :
                        <RestaurantsChart />
                    }
                </div>
            </div>
        </div>
    );
}
