import React from "react";
import "../../style/EditRow.css";
import NumberFormat from "react-number-format";

const EditRow = ({ editFormData, handleEditFormChange, handleCancel }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="Nazwa"
          required="required"
          placeholder="Wprowadź nazwę..."
          className="form-control"
          maxLength="20"
          value={editFormData.Nazwa}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="Opis"
          required="required"
          placeholder="Wprowadź opis..."
          className="form-control"
          maxLength="20"
          value={editFormData.Opis}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <select
          name="Kategoria"
          className="form-control"
          required="required"
          onChange={handleEditFormChange}
          value={editFormData.Kategoria}
        >
          <option value="Podzespoły komputera">Podzespoły komputera</option>
          <option value="Urządzenia peryferyjne">Urządzenia peryferyjne</option>
          <option value="Oprogramowanie">Oprogramowanie</option>
          <option value="Inne">Inne</option>
        </select>
      </td>
      <td>
        <NumberFormat
          name="Cena"
          required="required"
          placeholder="Wprowadź cenę..."
          className="form-control"
          suffix={" PLN"}
          decimalSeparator="."
          thousandSeparator={true}
          maxLength="15"
          onChange={handleEditFormChange}
          value={editFormData.Cena}
        />
      </td>
      <td>
        <button className="editbtn" type="submit">
          Zapisz
        </button>
        <button className="editbtn" type="submit" onClick={handleCancel}>
          Anuluj
        </button>
      </td>
    </tr>
  );
};
export default EditRow;
