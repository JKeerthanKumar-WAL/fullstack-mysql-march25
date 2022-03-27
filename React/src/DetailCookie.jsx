import { useState, useEffect } from 'react';
import axios from 'axios';
const DetailCookie = () => {
    const createCookie = (event) => {
        event.preventDefault();
        axios
            .get(
                `/detailcookie/setcookieswithtime/${event.target.name.value}/${event.target.namevalue.value}/${event.target.time.value}`
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="container-fluid text-center">
            <h1 className="mt-3">Details</h1>
            <form onSubmit={createCookie}>
                <b className="subHeading">Name : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                />
                <br />
                <b className="subHeading">Value : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="text"
                    name="namevalue"
                    placeholder="Enter value"
                />
                <br />
                <b className="subHeading">Time : </b>
                <input
                    className="form-control d-inline-flex w-50"
                    type="number"
                    name="time"
                    placeholder="Enter Time"
                />
                <br />
                <button className="btn btn-outline-primary">
                    <b>Add Cookie</b>
                </button>
            </form>
        </div>
    );
};
export default DetailCookie;
