import { useState, useEffect } from 'react';
import axios from 'axios';
const Category = () => {
    const [category, setCategory] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateCategory, setUpdateCategory] = useState({});
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
        getCategories();
    }, []);
    const createCategory = (event) => {
        event.preventDefault();
        const categoryObject = {
            id: event.target.id.value,
            name: event.target.name.value,
            description: event.target.description.value,
        };
        axios
            .post('/category', categoryObject)
            .then((res) => {
                getCategories();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteCategory = (id) => {
        axios
            .delete('/category/' + id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getCategories();
    };
    const deleteAll = () => {
        axios
            .get('/category/deleteall')
            .then((res) => {
                getCategories();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const editCategory = (id) => {
        setEdit(true);
        setUpdateCategory(id);
    };
    const saveCategory = (event) => {
        event.preventDefault();
        const categoryObject = {
            name: event.target.name.value,
            description: event.target.description.value,
        };
        axios.put(`/category/${updateCategory}`, categoryObject).then((res) => {
            getCategories();
            setEdit(false);
            console.log(res.data);
        });
    };
    return (
        <div className="container-fluid text-center">
            {edit ? (
                <div>
                    <h1 className="mt-3">Update Category</h1>
                    <form className="form-group" onSubmit={saveCategory}>
                        <b className="subHeading">Category Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="name"
                            placeholder="Enter Category Name"
                        />
                        <br />
                        <b className="subHeading">Description : </b>
                        <textarea
                            className="form-control d-inline-flex w-50"
                            name="description"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Update Category</b>
                        </button>
                        <br />
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="mt-3">Category</h1>
                    <form className="form-group" onSubmit={createCategory}>
                        <b className="subHeading">Category Id : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="number"
                            name="id"
                            placeholder="Enter Category Id"
                        />
                        <br />
                        <b className="subHeading">Category Name : </b>
                        <input
                            className="form-control d-inline-flex w-50"
                            type="text"
                            name="name"
                            placeholder="Enter Category Name"
                        />
                        <br />
                        <b className="subHeading">Description : </b>
                        <textarea
                            className="form-control d-inline-flex w-50"
                            name="description"
                        />
                        <br />
                        <button className="btn btn-outline-primary">
                            <b>Add Category</b>
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
                                <th>Description</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                            {category.map((val, index) => {
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.description}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteCategory(val.id);
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
                                                    editCategory(val.id);
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
export default Category;
