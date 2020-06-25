import React, { Component } from "react";
import logo from "../logo.png";
import withFirebaseAuth from "react-with-firebase-auth";
import { Layout, Row, Col, Input, Button } from "antd";
import { Redirect, Link } from "react-router-dom";
import "firebase/auth";
import { firebaseApp } from "../firebase";
const { Header } = Layout;
const { Search } = Input;

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToResults: false,
      redirectToMain: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateList = this.props.updateList.bind(this);
  }

  setRedirectToMain = () => {
    this.handleClearTerm();
    this.props.updateList([], "");
    this.setState({
      redirectToMain: true,
      redirectToResults: false,
    });
  };

  renderRedirectToMain = () => {
    if (this.state.redirectToMain) {
      return <Redirect to="/" />;
    }
  };

  setRedirectToResults = () => {
    this.setState({
      redirectToResults: true,
      redirectToMain: false,
    });
  };

  renderRedirectToResults = () => {
    if (this.state.redirectToResults) {
      return <Redirect to="/results" />;
    }
  };

  handleChange(e) {
    let term = e.target.value;
    this.props.updateTerm(term);
  }

  handleClearTerm() {
    this.props.updateTerm("");
  }

  handleSearch(term) {
    const localTerm = term;
    let currentProducts = [];
    let newProducts = [];

    if (localTerm !== "" && localTerm.length > 2) {
      currentProducts = this.props.products;
      newProducts = currentProducts.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = localTerm.toLowerCase();
        return lc.includes(filter);
      });
      this.props.updateList(newProducts, localTerm);
    } else {
      alert("debe ingresar al menos 3 caracteres");
      this.props.updateList(this.props.products, localTerm);
      return true;
    }

    this.setRedirectToResults();
  }

  render() {
    const { user, signOut } = this.props;

    return (
      <Header className="header">
        <Row>
          <Col xs={{ span: 8 }} lg={{ span: 3 }}>
            {this.renderRedirectToMain()}
            <Link to={{ pathname: "/" }}>
              <img
                src={logo}
                className="header-logo"
                alt="logo"
                onClick={this.setRedirectToMain}
              />
            </Link>
          </Col>
          <Col xs={{ span: 16 }} lg={{ span: 15 }}>
            <div className="header-search">
              {this.renderRedirectToResults()}
              <Search
                placeholder="¿Que queres comprar?"
                onSearch={() => this.handleSearch(this.props.term)}
                onChange={this.handleChange}
                value={this.props.term}
                enterButton
              />
              {this.props.term !== "" ? (
                <div
                  className={"clear-icon"}
                  onClick={() => this.handleClearTerm()}
                >
                  x
                </div>
              ) : (
                <div />
              )}
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <div className="header-greetings">
              {user ? (
                <div>
                  {user.displayName}
                  <Button
                    style={{
                      marginLeft: "1rem",
                      backgroundColor: "var(--background)",
                      color: "white",
                    }}
                    onClick={() => signOut()}
                  >
                    {" "}
                    Cerrar Sesion
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    style={{
                      marginLeft: "1rem",
                      backgroundColor: "var(--details)",
                      color: "white",
                    }}
                  >
                    iniciar sesion
                  </Button>
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

let providers = {
  googleProvider: new firebaseApp.auth.GoogleAuthProvider(),
};

// const mapStateToProps = state => ({
//   customer: getInfoCustomer(state)
// })

// export default connect(
//   // mapStateToProps,
//   providers,
//   firebaseAppAuth,
// )(CustomHeader)

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(CustomHeader);
