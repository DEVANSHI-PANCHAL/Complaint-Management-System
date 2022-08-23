import axios from 'axios';

const API_URL = "http://localhost:5000";

async function registerUser(data) {

    return axios.post(API_URL + '/users/register', data)
}

async function signin(data) {
    return await axios.post(API_URL + '/users/login', data)
}

async function createUser(data) {
    return await axios.post(API_URL + '/users/createUser', data)
}

async function getUser() {
    return await axios.get(API_URL + '/users/getUser')
}

async function editUser(formData) {
    const userId = formData._id;
    return await axios.put(API_URL + `/users/editUser/${userId}`, formData)
}

async function deleteUser(userId) {
    return await axios.delete(API_URL + `/users/deleteUser/${userId}`)
}

export {
    signin, registerUser, createUser,getUser, deleteUser, editUser
}