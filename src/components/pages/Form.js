import React, { useState, useEffect, Fragment } from "react";
import "../../style/Form.css";
import ReadRow from "./ReadRow";
import EditRow from "./EditRow";
import { nanoid } from "nanoid";
import NumberFormat from "react-number-format";
import { CSVLink } from "react-csv";
import { motion } from "framer-motion";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  /* Sortowanie */
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

  /*   Dodawanie nowych pracowników      */

  const handleAddForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  };

  /*   Odczytanie pracownika do edycji      */

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  /* Przesłanie nowego pracownika    */

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

  /*  Przesłanie edycji pracownika       */

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

  /* Podstawienie danych do edycji */

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

  /* Anulowanie*/

  const handleCancel = (event) => {
    setProductID(null);
  };

  /* Usuwanie */

  const handleDelete = (productID) => {
    const newList = [...list];

    const index = list.findIndex((product) => product.id === productID);
    newList.splice(index, 1);

    setList(newList);
  };

  /* Odczyt z pamięci lokalnej */

  useEffect(() => {
    const json = localStorage.getItem("data2");
    const savedList = JSON.parse(json);
    if (savedList) {
      setList(savedList);
    }
  }, []);

  /* Zapis w pamięci lokalnej */

  useEffect(() => {
    const json = JSON.stringify(list);
    localStorage.setItem("data2", json);
  }, [list]);

  /*Zmiana klasy tabeli */

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth <= 800;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  /* Filtrowanie po kategorii, sumowanie cen */

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
      (total, currentValue) =>
        (total =
          total + parseFloat(currentValue.Cena.replace(/[^0-9.]+/g, ""))),
      0
    );

  const [show, setShow] = useState(false);

  /* Ukryj, pokaż */

  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="containter-2"
      >
        <div className="formularz">
          <form className="insideForm" onSubmit={handleAddSubmit}>
            <label>Nazwa</label>
            <input
              type="text"
              name="Nazwa"
              required="required"
              placeholder="Wprowadź nazwę..."
              maxLength="30"
              onChange={handleAddForm}
              className="form-control"
            />

            <label>Opis</label>
            <input
              type="text"
              name="Opis"
              required="required"
              placeholder="Wprowadź opis..."
              maxLength="30"
              onChange={handleAddForm}
              className="form-control"
            />

            <label>Kategoria</label>
            <select
              name="Kategoria"
              onChange={handleAddForm}
              className="form-control"
              required="required"
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
            <NumberFormat
              name="Cena"
              required="required"
              placeholder="Wprowadź cenę..."
              className="form-control"
              suffix={" PLN"}
              decimalSeparator="."
              thousandSeparator={true}
              maxLength="15"
              onChange={handleAddForm}
            />

            <button type="submit" className="addbtn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>Dodaj
            </button>
          </form>
        </div>

        {!show && (
          <button className="addbtn" onClick={handleShow}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>Pokaż tabele
          </button>
        )}

        {show && (
          <>
            <button className="addbtn" onClick={handleHide}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>Ukryj tabele
            </button>
            <div className="filter">
              <select
                name="Kategoria"
                onChange={(e) => {
                  setFilterData(e.target.value);
                }}
                className="form-control"
              >
                <option value="">Pokaż wszystko</option>
                <option value="Podzespoły komputera">
                  Podzespoły komputera
                </option>
                <option value="Urządzenia peryferyjne">
                  Urządzenia peryferyjne
                </option>
                <option value="Oprogramowanie">Oprogramowanie</option>
                <option value="Inne">Inne</option>
              </select>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="table-cont"
            >
              <form onSubmit={handleEditFormSumbit}>
                <table
                  className={`${
                    isMobile
                      ? "table table-borderless"
                      : "table table-bordered border-primary"
                  }`}
                >
                  <thead>
                    <tr>
                      <th id="fill" onClick={() => sorting("Nazwa")}>
                        Nazwa
                      </th>
                      <th id="fill" onClick={() => sorting("Opis")}>
                        Opis
                      </th>
                      <th id="fill" onClick={() => sorting("Kategoria")}>
                        Kategoria
                      </th>
                      <th id="fill" onClick={() => sortingNumber("Cena")}>
                        Cena
                      </th>
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
                      <td colSpan="2"></td>
                      <td className="sum">Suma:</td>
                      <td>{result.toLocaleString()} PLN</td>
                      <td>
                        <CSVLink
                          className="changebtn"
                          filename="lista-produktów.csv"
                          target="_blank"
                          data={list}
                        >
                          Pobierz plik CSV
                        </CSVLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default Form;
