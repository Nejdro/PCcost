import React from "react";

const ReadRow = ({ product, handleEdit, handleDelete }) => {
  return (
    <tr key={product.id}>
      <td>{product.Nazwa}</td>
      <td>{product.Opis}</td>
      <td>{product.Kategoria}</td>
      <td>{product.Cena}</td>
      <td>
        <button type="button" onClick={(event) => handleEdit(event, product)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(product.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadRow;
