import React, { Component } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

export default class Success extends Component {
  render() {
    return (
      <Layout>
        <Content className="content">
          <h1 style={{ color: "green", fontSize: "7rem", margin:"1rem" }}>
            <i className="fas fa-check-circle"></i>
          </h1>
          <p style={{ color: "var(--title)" }}> Compra realizada con éxito </p>
          <Link to={{ pathname: "/" }}>Volver al inicio</Link>
        </Content>
      </Layout>
    );
  }
}
