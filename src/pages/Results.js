import React, { Component } from "react";
import { Layout } from "antd";
import ProductCard from "../components/ProductCard";
const { Content } = Layout;

export default class Results extends Component {
  render() {
    const { results } = this.props;

    return (
      <Layout>
        <Content className="content">
          <p style={{ color: "var(--primary)" }}> Resultados la de busqueda </p>
          {results.map((result) => (
            <ProductCard key={result.id} product={result} />
          ))}
        </Content>
      </Layout>
    );
  }
}
