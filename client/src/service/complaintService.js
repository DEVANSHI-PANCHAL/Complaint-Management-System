import axios from 'axios';

const API_URL = 'http://localhost:5000';

async function addComplaint(data) {
    return await axios.post(API_URL + '/complaint/addComplaint', data)
}

async function getComplaint() {
    return await axios.get(API_URL + '/complaint/getComplaint')
}


async function editComplaint(formData) {
    const userId = formData._id;
    return await axios.put(API_URL + `/complaint/editComplaint/${userId}`, formData)
}

async function deleteComplaint(complaintId) {
    return await axios.delete(API_URL + `/complaint/deleteComplaint/${complaintId}`)
}



// async function complaintStatus(_id) {
//     return await axios.get(API_URL + `/complaint/status/${_id}`, {
//         params: {
//             _id:_id
//         },
//         headers: {'authorization': 'Bearer ' + localStorage.getItem("token")}
//     })
// }


export {
    addComplaint, editComplaint, getComplaint,deleteComplaint
}