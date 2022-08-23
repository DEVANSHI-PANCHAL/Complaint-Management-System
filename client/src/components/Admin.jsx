import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useNavigate } from "react-router-dom";

import {
  createUser,
  deleteUser,
  editUser,
  getUser,
} from "../service/authService";
import { deleteComplaint, getComplaint } from "../service/complaintService";

const Admin = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [mode, setMode] = useState("submit");
  const [formData, setFormData] = useState();
  const [sortUserName, setSortUserName] = useState(false);
  const [sortArea, setSortArea] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchField, setSearchField] = useState("");

  const navigate = useNavigate();

  const adminInfo = localStorage.getItem("admin");

  useEffect(() => {
    console.log(adminInfo)
    if(adminInfo) {
      navigate("/dashboard")
    }
},[adminInfo, navigate])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userType: "citizen",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (mode === "submit") {
        const { data } = await createUser(formData);
        console.log(data);
      } else {
        const { data } = await editUser(formData);
        console.log(data);
      }
      handleClose();
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getUser();
      console.log(data.users);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };
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
    getAllUsers();
    getComplaints();
  }, []);

  const handleDelete = async (user) => {
    try {
      const userId = user._id;
      console.log(userId);
      const { data } = await deleteUser(userId);
      console.log(data);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplaint = async (complaint) => {
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

  const handleEdit = async (user) => {
    try {
      handleShow();
      setFormData(user);
      setMode("edit");
    } catch (error) {
      console.log(error);
    }
  };

  const sortByName = () => {
    setSortUserName(!sortUserName);

    if (sortUserName) {
      console.log(sortUserName);

      const sortedcomplaints = [...complaints].sort((a, b) =>
        a.userName < b.userName ? -1 : 1
      );

      console.log(sortedcomplaints);

      setComplaints(sortedcomplaints);
    } else {
      console.log(sortUserName);

      const sortedcomplaints = [...complaints].sort((a, b) =>
        a.userName < b.userName ? 1 : -1
      );

      console.log(sortedcomplaints);

      setComplaints(sortedcomplaints);
    }
  };

  const sortByArea = () => {
    setSortArea(!sortArea);

    if (sortArea) {
      console.log(sortArea);

      const sortedcomplaints = [...complaints].sort((a, b) =>
        a.area < b.area ? -1 : 1
      );

      console.log(sortedcomplaints);

      setComplaints(sortedcomplaints);
    } else {
      console.log(sortArea);

      const sortedcomplaints = [...complaints].sort((a, b) =>
        a.area < b.area ? 1 : -1
      );

      console.log(sortedcomplaints);

      setComplaints(sortedcomplaints);
    }
  };

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };
  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 2, offset: 5 }} className="text-center">
          <Button onClick={handleShow}>Add User</Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>UserType</Form.Label>
              <Form.Control
                type="text"
                name="userType"
                value="citizen"
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={handleOnChange}
                value={formData?.username}
                name="username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                onChange={handleOnChange}
                value={formData?.fullName}
                name="fullName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleOnChange}
                value={formData?.password}
                name="password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Row className="mt-3">
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className="text-center mb-3">Users Table</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>
                  User Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-sort-alpha-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                    />
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                  </svg>
                </th>
                <th>User Type</th>
                <th>Full Name</th>
                <th>Edit User</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.userType}</td>
                      <td>{user.fullName}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className="text-center mb-3">Complaints Table</h1>
          <Form.Group className="d-flex justify-content-center my-3">
            <Form.Control
              type="text"
              placeholder="search"
              style={{ maxWidth: "20%" }}
              onChange={handleSearchKeyword}
            />
            <Form.Select
              aria-label="Default select example"
              style={{ maxWidth: "20%" }}
              name="searchField"
              onChange={handleSearch}
            >
              <option>select serach field</option>
              <option value="username">username</option>
              <option value="area">area</option>
              <option value="type">type</option>
              <option value="description">complaint</option>
            </Form.Select>
          </Form.Group>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-success me-2"
            table="table-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export To Excel"
          />
          <Table id="table-xls" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={sortByName}>
                  User Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-sort-alpha-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                    />
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                  </svg>
                </th>
                <th onClick={sortByArea}>
                  Area of Complaint
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-sort-alpha-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
                    />
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                  </svg>
                </th>
                <th>Type of Complaint</th>
                <th>Complaint</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {complaints &&
                complaints.filter((complaint) => {
                    if (searchKeyword === "") {
                      return complaint;
                    } else if (
                      searchField === "username" &&
                      complaint.username
                        .toLowerCase()
                        .includes(searchKeyword.toLocaleLowerCase())
                    ) {
                      return complaint;
                    } else if (
                      searchField === "area" &&
                      complaint.area.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
                    ) {
                      return complaint;
                    } else if (
                      searchField === "type" &&
                      complaint.type

                        .toLowerCase()

                        .includes(searchKeyword.toLocaleLowerCase())
                    ) {
                      return complaint;
                    } else if (
                      searchField === "complaint" &&
                      complaint.description
                        .toLowerCase()
                        .includes(searchKeyword.toLocaleLowerCase())
                    ) {
                      return complaint;
                    }
                    return false;
                  })
                  .map((complaint, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{complaint.username}</td>
                        <td>{complaint.area}</td>
                        <td>{complaint.type}</td>
                        <td>{complaint.description}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleComplaint(complaint)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Admin;
