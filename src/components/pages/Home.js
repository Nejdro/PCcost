import React from "react";
import "../../style/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

class Home extends React.Component {
  render() {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="hero"
        >
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
        </motion.div>
      </>
    );
  }
}
export default Home;
