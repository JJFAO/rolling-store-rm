import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import ProductCard from '../components/ProductCard';
const { Content } = Layout;

export default class Main extends Component {
    render() {
        const { products } = this.props;

        return(
            <Layout>
                <Content className="content">
                <p style={{ color: "var(--primary)", margin:"1rem" }}> Basado en tu ultima visita</p>
                    <Row>
                        {
                        products.map(prod => (
                            <Col xs={{ span: 24 }} lg={{ span: 6 }} key={prod.id}>
                                <ProductCard  product={prod} />
                            </Col>
                        ))
                        }
                    </Row>
                </Content>
             </Layout>
        )
    }
}