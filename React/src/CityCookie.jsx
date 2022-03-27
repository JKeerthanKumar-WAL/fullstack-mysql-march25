import { useState, useEffect } from 'react';
import axios from 'axios';
const CityCookie = () => {
    const createCookie = (event) => {
        event.preventDefault();
        let setCity = event.target.city.value;
        axios
            .get(`/citycookie/setcookie/city/${setCity}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="container-fluid text-center">
            <h1 className="mt-3">City</h1>
            <form onSubmit={createCookie}>
                <b className="subHeading">City : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="text"
                    name="city"
                    placeholder="Enter City Name"
                />
                <br />
                <button className="btn btn-outline-primary">
                    <b>Add Cookie</b>
                </button>
            </form>
        </div>
    );
};
export default CityCookie;
