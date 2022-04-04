import React, { useState, useEffect, Fragment } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import data from "../../data.json";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import { nanoid } from "nanoid";
import { MDBBtn } from "mdbreact";

function Form() {
  const [list, setList] = useState([]);
  const [addData, setAddData] = useState({
    Nazwa: "",
    Opis: "",
    Kategoria: "",
    Cena: "",
  });

  const [editFormData, setEditFormData] = useState({
    Nazwa: "",
    Opis: "",
    Kategoria: "",
    Cena: "",
  });
  const [editProdcutID, setProductID] = useState(null);

  const handleAddForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();

    const newList = {
      id: nanoid(),
      Nazwa: addData.Nazwa,
      Opis: addData.Opis,
      Kategoria: addData.Kategoria,
      Cena: addData.Cena,
    };
    const newLists = [...list, newList];
    setList(newLists);
  };

  const handleEditFormSumbit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProdcutID,
      Nazwa: editFormData.Nazwa,
      Opis: editFormData.Opis,
      Kategoria: editFormData.Kategoria,
      Cena: editFormData.Cena,
    };
    const newProduct = [...list];

    const index = list.findIndex((product) => product.id === editProdcutID);

    newProduct[index] = editedProduct;

    setList(newProduct);
    setProductID(null);
  };

  const handleEdit = (event, product) => {
    event.preventDefault();
    setProductID(product.id);

    const formValues = {
      Nazwa: product.Nazwa,
      Opis: product.Opis,
      Kategoria: product.Kategoria,
      Cena: product.Cena,
    };

    setEditFormData(formValues);
  };

  const handleCancel = (event) => {
    setProductID(null);
  };

  const handleDelete = (productID) => {
    const newList = [...list];

    const index = list.findIndex((product) => product.id === productID);
    newList.splice(index, 1);

    setList(newList);
  };
  useEffect(() => {
    const json = localStorage.getItem("data2");
    const savedList = JSON.parse(json);
    if (savedList) {
      setList(savedList);
    }
  }, []);
  useEffect(() => {
    const json = JSON.stringify(list);
    localStorage.setItem("data2", json);
  }, [list]);

  const result = list.reduce(
    (total, currentValue) => (total = total + parseInt(currentValue.Cena)),
    0
  );

  return (
    <>
      <section id="hero">
        <div className="containter">
          <div className="info">
            <form className="formularz" onSubmit={handleAddSubmit}>
              <label>
                Nazwa
                <input
                  type="text"
                  name="Nazwa"
                  required="required"
                  placeholder="Wprowadź nazwę..."
                  onChange={handleAddForm}
                  className="form-control"
                />
              </label>
              <label>
                Opis
                <input
                  type="text"
                  name="Opis"
                  required="required"
                  placeholder="Wprowadź opis..."
                  onChange={handleAddForm}
                  className="form-control"
                />
              </label>
              <label>
                Kategoria
                <select
                  name="Kategoria"
                  onChange={handleAddForm}
                  className="browser-default custom-select"
                >
                  <option>Wybierz kategorię</option>
                  <option value="Podzespoły komputera">
                    Podzespoły komputera
                  </option>
                  <option value="Urządzenia peryferyjne">
                    Urządzenia peryferyjne
                  </option>
                  <option value="Oprogramowanie">Oprogramowanie</option>
                  <option value="Inne">Inne</option>
                </select>
              </label>
              <label>
                Cena
                <input
                  type="text"
                  name="Cena"
                  required="required"
                  placeholder="Wprowadź cenę..."
                  className="form-control"
                  onChange={handleAddForm}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </label>
              <button type="submit">Dodaj</button>
            </form>
            <Link to="/">
              <button id="btn">Essa!</button>
            </Link>
          </div>

          <form onSubmit={handleEditFormSumbit}>
            <div className="table-cont">
              <table>
                <thead>
                  <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((product) => (
                    <Fragment>
                      {editProdcutID === product.id ? (
                        <EditRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancel={handleCancel}
                        />
                      ) : (
                        <ReadRow
                          product={product}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      )}
                    </Fragment>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Suma:</td>
                    <td>{result}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Form;
