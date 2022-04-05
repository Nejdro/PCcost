import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <>
        <section id="hero">
          <div className="containter">
            <div className="info">
              <h1>Ile będzie kosztowało Twoje nowe stanowisko?</h1>
              <h2>Policz to z nami!</h2>
              <p>
                Sprawdź nasz kalkulator, dzięki któremu w łatwy sposób
                przeliczysz całkowity kosz sprzętu. Podane pozycje zostaną
                zapisane w tabeli.
              </p>
              <Link to="/form">
                <button className="addbtn">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>Zaczynajmy!
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default Home;
