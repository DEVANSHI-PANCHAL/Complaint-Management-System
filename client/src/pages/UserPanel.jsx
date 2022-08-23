import React, { useEffect, useState } from "react";
import { addComplaint, getComplaint, editComplaint, deleteComplaint } from "../service/complaintService";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const UserPanel = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState("");
    const [complaints, setComplaints] = useState([]);
    const [mode, setMode] = useState("submit");

    const editBtn = (cell, row, rowIndex, formatExtraData) => {
      return (
        <Button className="outline-primary"  onClick={() => handleEdit(row)}>
          Edit
        </Button>
      );
    };

    const deleteBtn = (cell, row, rowIndex, formatExtraData) => {
      return (
        <Button className="outline-danger" onClick={() => handleDelete(row)}>
          Delete
        </Button>
      );
    };

    const columns = [
      {dataField: "username",text: "User Name", sort: true}, 
      {dataField: "area",text: "Area", sort: true},
      {dataField: "type",text: "Type", sort: true},
      {dataField: "description",text: "Description", sort: true},
      {
        dataField: "edit",
        text: "Edit",
        formatter: editBtn,
        sort: true
      },
      {
        dataField: "delete",
        text: "Delete",
        formatter: deleteBtn,
        sort: true
      },
    ]

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userInfo = JSON.parse(localStorage.getItem("user"));

    const handleOnChange = (e) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          username: userInfo.username
        });
      };

    const createComplaint = async(e) => {
        e.preventDefault();
        try {
            console.log(formData);
            if(mode === 'submit') {
              const { data } = await addComplaint(formData);
              console.log(data);
            } 
            else {
                const { data } = await editComplaint(formData);
                console.log(data);
            }
            handleClose();
            getComplaints();
            setFormData("");
          } catch (error) {
            console.log(error);
          }
    }


    const getComplaints = async () => {
        try {
          const { data } = await getComplaint();
          console.log(data);
          setComplaints(data);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getComplaints();
      }, []);


      const handleDelete = async (complaint) => {
        try {
          const complaintId = complaint._id;
          console.log(complaintId);
          const { data } = await deleteComplaint(complaintId);
          console.log(data);
          getComplaints();
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleEdit = async (complaint) => {
        try {
          handleShow();
          setFormData(complaint);
          setMode("edit");  
        } catch (error) {
          console.log(error);
        }
      };
  return (
      <>
      <Row>
        <Col md={{ span: 2, offset: 5 }} className="text-center">
          <Button onClick={handleShow}>Add Complaint</Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createComplaint}>
            <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter User Name"
                name="username" 
                value={userInfo?.username} disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Select aria-label="Default select example" name="type" value={formData?.type} onChange={handleOnChange}>
                <option>Complaint Type</option>
                <option value="road">Road</option>
                <option value="building">Building</option>
                <option value="drainage">Drainage</option>
                <option value="watersupply">Water Supply</option>
                <option value="drainage">Drainage</option>
                </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter area"
                name="area" value={formData?.area} onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                placeholder="Enter description"
                name="description" value={formData?.description} onChange={handleOnChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    
     <Row>
      <Col md={{ span: 10, offset: 1 }}>
      <h2 className="text-center my-3">Complaints Table</h2>
      <BootstrapTable
        keyField='name'
        data={complaints}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}/>
      </Col>
     </Row>
      </>
    
  )
}

export default UserPanel