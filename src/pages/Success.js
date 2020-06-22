import React, { Component } from "react";
import { Layout } from "antd";
import { Link } from 'react-router-dom'

const { Content } = Layout;

export default class Success extends Component {
  render() {
    return (
      <Layout>
        <Content className="content">
          <p style={{ color: "red" }}> Compra realizada con éxito </p>
          <Link to={{ pathname: "/" }}>Volver al inicio</Link>
        </Content>
      </Layout>
    );
  }
}
