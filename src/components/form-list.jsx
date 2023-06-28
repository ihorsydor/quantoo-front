import React, { useEffect, useState } from "react";
import api from "../api/index";
import Form from "./form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "./../styles/form.module.scss";

const FormList = () => {
  const [formList, setFormList] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(selectedForm || {});

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.form.getAllForms();
        setFormList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (formId) => {
    try {
      await api.form.deleteForm(formId);
      setFormList((prevFormList) =>
        prevFormList.filter((form) => form._id !== formId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModalOpen = (form) => {
    setSelectedForm(form);
    setEditFormData({
      name: form.name,
      form2: form.form2,
      selectValue: form.selectValue,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.form.editForm(editFormData, selectedForm._id);
      console.log(response);
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Form ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Form 2</TableCell>
            <TableCell>Select Value</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formList.map((form, index) => (
            <TableRow key={index}>
              <TableCell>{form._id}</TableCell>
              <TableCell>{form.name}</TableCell>
              <TableCell>{form.form2}</TableCell>
              <TableCell>{form.selectValue}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(form._id)}
                >
                  Kasuj
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditModalOpen(form)}
                >
                  Edytuj
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      <Modal
        className={styles.modal}
        open={editModalOpen}
        onClose={handleEditModalClose}
      >
        <div className={styles.modalContent}>
          <h2>Edit Form</h2>
          <form className={styles.form} onSubmit={handleEditFormSubmit}>
            <div className={styles.modalContent}>
            <TextField
              label="Form"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              className={styles.modalElementWidth}
            />

            <TextField
              label="TextField 2"
              name="form2"
              value={editFormData.form2}
              onChange={handleEditFormChange}
              className={styles.modalElementWidth}
            />

            <Select
              value={editFormData.selectValue}
              onChange={handleEditFormChange}
              name="selectValue"
              label="Select"
              className={styles.modalElementWidth}
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>

            <Button 
            variant="contained" 
            type="submit"
            className={styles.modalElementWidth}>
              Save
            </Button>
            </div>
          </form>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default FormList;
