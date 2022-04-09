import React from "react";

const ReadRow = ({ product, handleEdit, handleDelete }) => {
  return (
    <tr key={product.id}>
      <td>{product.Nazwa}</td>
      <td>{product.Opis}</td>
      <td>{product.Kategoria}</td>
      <td>{product.Cena} </td>
      <td id="btnTD">
        <button
          type="button"
          className="changebtn"
          id="btn1"
          onClick={(event) => handleEdit(event, product)}
        >
          Edytuj
        </button>
        <button
          type="button"
          className="changebtn"
          id="btn2"
          onClick={() => handleDelete(product.id)}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
};
export default ReadRow;
