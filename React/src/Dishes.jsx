import { useState, useEffect } from 'react';
import axios from 'axios';
const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateDish, setUpdateDish] = useState({});
    const [category, setCategory] = useState([]);
    const getDishes = () => {
        axios
            .get('/dishes')
            .then((res) => {
                setDishes(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getCategories = () => {
        axios
            .get('/category')
            .then((res) => {
                setCategory(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getDishes();
        getCategories();
    }, []);
    const createDish = (event) => {
        event.preventDefault();
        const dishObject = {
            id: event.target.id.value,
            name: event.target.name.value,
            description: event.target.description.value,
            cid: event.target.cid.value,
            price: event.target.price.value,
        };
        axios
            .post('/dishes', dishObject)
            .then((res) => {
                getDishes();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteDish = (id) => {
        axios
            .delete('/dishes/' + id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getDishes();
    };
    const deleteAll = () => {
        axios
            .get('/dishes/deleteall')
            .then((res) => {
                getDishes();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editDish = (id) => {
        setEdit(true);
        setUpdateDish(id);
    };
    const saveDish = (event) => {
        event.preventDefault();
        const dishObject = {
            name: event.target.name.value,
            description: event.target.description.value,
            cid: event.target.cid.value,
            price: event.target.price.value,
        };
        axios.put(`/dishes/${updateDish}`, dishObject).then((res) => {
            getDishes();
            setEdit(false);
            console.log(res.data);
        });
    };
    return (
        <div className="container-fluid text-center">
            {edit ? (
                <div>
                    <h1 className="mt-3">Update Dish</h1>
                    <form className="form-group" onSubmit={saveDish}>
                        <b className="subHeading">Dish Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="name"
                            placeholder="Enter Category Name"
                        />
                        <br />
                        <b className="subHeading">Price : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                        />
                        <br />
                        <b className="subHeading">Description : </b>
                        <textarea
                            className="form-control d-inline-flex w-50"
                            name="description"
                        />
                        <br />
                        <b className="subHeading">Select Category : </b>
                        <select
                            name="cid"
                            className="form-select d-inline-flex w-50"
                        >
                            <option selected>Select</option>
                            {category.map((val) => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                );
                            })}
                        </select>
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Update Dish</b>
                        </button>
                        <br />
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Dishes</h1>
                    <form className="form-group" onSubmit={createDish}>
                        <b className="subHeading">Dish Id : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="id"
                            placeholder="Enter Category Id"
                        />
                        <br />
                        <b className="subHeading">Dish Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="name"
                            placeholder="Enter Category Name"
                        />
                        <br />
                        <b className="subHeading">Price : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="price"
                            placeholder="Enter Price"
                        />
                        <br />
                        <b className="subHeading">Description : </b>
                        <textarea
                            className="form-control d-inline-flex w-50"
                            name="description"
                        />
                        <br />
                        <b className="subHeading">Select Category : </b>
                        <select
                            name="cid"
                            className="form-select d-inline-flex w-50"
                        >
                            <option selected>Select</option>
                            {category.map((val) => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                );
                            })}
                        </select>
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Add Dish</b>
                        </button>
                        <br />
                    </form>
                    <button
                        className="btn btn-outline-danger"
                        onClick={deleteAll}
                    >
                        <b>Delete All</b>
                    </button>
                    <br />
                    <div className="table table-bordered table-striped text-center">
                        <table className="text-center ">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category Id</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                            {dishes.map((val, index) => {
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.price}</td>
                                        <td>{val.description}</td>
                                        <td>{val.cid}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteDish(val.id);
                                                }}
                                            >
                                                <b> Delete</b>
                                            </button>
                                            <br />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    editDish(val.id);
                                                }}
                                            >
                                                <b> Edit</b>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Dishes;
