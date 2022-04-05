import React, { useState, useEffect, Fragment } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import { nanoid } from "nanoid";

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
  const [order, setOrder] = useState("ASC");
  const [filterData, setFilterData] = useState("");

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...list].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setList(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...list].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      setList(sorted);
      setOrder("ASC");
    }
  };

  const sortingNumber = (col) => {
    if (order === "ASC") {
      const sorted = [...list].sort((a, b) =>
        parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
      );

      setList(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...list].sort((a, b) =>
        parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
      );

      setList(sorted);
      setOrder("ASC");
    }
  };

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

  const result = list
    .filter((val) => {
      if (filterData === "") {
        return val;
      } else if (
        val.Kategoria.toLowerCase().includes(filterData.toLowerCase())
      ) {
        return val;
      }
    })
    .reduce(
      (total, currentValue) => (total = total + parseInt(currentValue.Cena)),
      0
    );

  return (
    <>
      <div className="containter-2">
        <div className="formularz">
          <form className="insideForm" onSubmit={handleAddSubmit}>
            <label>Nazwa</label>
            <input
              type="text"
              name="Nazwa"
              required="required"
              placeholder="Wprowadź nazwę..."
              onChange={handleAddForm}
              className="form-control"
            />

            <label>Opis</label>
            <input
              type="text"
              name="Opis"
              required="required"
              placeholder="Wprowadź opis..."
              onChange={handleAddForm}
              className="form-control"
            />

            <label>Kategoria</label>
            <select
              name="Kategoria"
              onChange={handleAddForm}
              className="form-control"
            >
              <option>Wybierz kategorię</option>
              <option value="Podzespoły komputera">Podzespoły komputera</option>
              <option value="Urządzenia peryferyjne">
                Urządzenia peryferyjne
              </option>
              <option value="Oprogramowanie">Oprogramowanie</option>
              <option value="Inne">Inne</option>
            </select>

            <label>Cena</label>
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

            <button type="submit" className="addbtn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>Dodaj
            </button>
          </form>
        </div>

        <div className="filter">
          <select
            name="Kategoria"
            onChange={(e) => {
              setFilterData(e.target.value);
            }}
            className="form-control"
          >
            <option value="">Pokaż wszystko</option>
            <option value="Podzespoły komputera">Podzespoły komputera</option>
            <option value="Urządzenia peryferyjne">
              Urządzenia peryferyjne
            </option>
            <option value="Oprogramowanie">Oprogramowanie</option>
            <option value="Inne">Inne</option>
          </select>
        </div>
        <div className="table-cont">
          <form onSubmit={handleEditFormSumbit}>
            <table className="table table-bordered border-primary">
              <thead>
                <tr>
                  <th onClick={() => sorting("Nazwa")}>Nazwa</th>
                  <th onClick={() => sorting("Opis")}>Opis</th>
                  <th onClick={() => sorting("Kategoria")}>Kategoria</th>
                  <th onClick={() => sortingNumber("Cena")}>Cena</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list
                  .filter((val) => {
                    if (filterData === "") {
                      return val;
                    } else if (
                      val.Kategoria.toLowerCase().includes(
                        filterData.toLowerCase()
                      )
                    ) {
                      return val;
                    }
                  })
                  .map((product) => (
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
                  <td className="sum">Suma:</td>
                  <td>{result}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
