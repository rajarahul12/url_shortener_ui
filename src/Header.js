import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top",
    };
  }

  componentDidMount() {
    this.listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 120) {
        if (this.state.status !== "test") {
          this.setState({ status: "test" });
        }
      } else {
        if (this.state.status !== "top") {
          this.setState({ status: "top" });
        }
      }
    });
  }

  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }

  render() {
    return (
      <div
        className="header"
        style={{
          backgroundColor:
            this.state.status === "top" ? "transparent" : "white",
          color: this.state.status === "top" ? "white" : "black",
        }}
      >
        <h2 className="header__brand">URL SHORTENER</h2>
        <Link to="/login" className="header__link">
          <p className="header__login">LOGIN</p>
        </Link>
      </div>
    );
  }
}
