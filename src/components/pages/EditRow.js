import React from "react";
import "./EditRow.css";

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
          value={editFormData.Opis}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <select
          name="Kategoria"
          className="form-control"
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
        <input
          type="text"
          name="Cena"
          required="required"
          placeholder="Wprowadź cenę..."
          className="form-control"
          onChange={handleEditFormChange}
          value={editFormData.Cena}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="submit" onClick={handleCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditRow;
