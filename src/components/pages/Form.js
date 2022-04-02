import React, { useState } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import data from "../../data.json";

function Form() {
  const [list, setList] = useState(data);
  const [addData, setAddData] = useState({
    Nazwa: "",
    Opis: "",
    Kategoria: "",
    Cena: "",
  });

  const result = data.reduce(
    (total, currentValue) => (total = total + currentValue.Cena),
    0
  );

  console.log(result);

  const handleAddForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addData };
    newFormData[fieldName] = fieldValue;

    setAddData(newFormData);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();

    const newList = {
      Nazwa: addData.Nazwa,
      Opis: addData.Opis,
      Kategoria: addData.Kategoria,
      Cena: addData.Cena,
    };
    const newLists = [...list, newList];
    setList(newLists);
  };

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
                />
              </label>
              <label>
                Kategoria
                <select name="Kategoria" onChange={handleAddForm}>
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

          <div className="table-cont">
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Opis</th>
                  <th>Kategoria</th>
                  <th>Cena</th>
                  <th>Suma</th>
                </tr>
              </thead>
              <tbody>
                {list.map((product) => (
                  <tr>
                    <td>{product.Nazwa}</td>
                    <td>{product.Opis}</td>
                    <td>{product.Kategoria}</td>
                    <td>{product.Cena}</td>
                    <td>{result}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Suma:</td>
                  <td>{result}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Form;
