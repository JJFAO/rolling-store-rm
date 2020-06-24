import React, { Component, Fragment } from "react";
import { Radio, Input, Button, Form } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutCart } from "../actions";
import { getTotal } from "../reducers";
import {  Redirect } from "react-router-dom";
import "firebase/auth";
import { firebaseApp } from "../firebase";

class CartDetails extends Component {
  state = {
    creditCard: this.props.creditCard,
    shippingAddress: this.props.shippingAddress,
    customer: this.props.customer,
    redirect: false,
  };
  onWriteAddress = (e) => {
    this.setState({ shippingAddress: e.target.value });
    this.setState({ customer: firebaseApp.auth().currentUser.email });
  };

  onSelectCreditCard = (e) => {
    this.setState({ creditCard: e.target.value });
  };

  setRedirectToSuccess = () => {
    if (this.state.shippingAddress !== "" && this.state.creditCard !== "") {
      this.setState({
        redirect: true,
      })
    }
  };

  renderRedirectToSuccess = () => {
    if (this.state.redirect) {
      return <Redirect to="/success" />;
    }
  };

  render() {
    const radioStyle = { display: "block", height: "50px", lineHeight: "50px" };
    const { shippingAddress, creditCard, customer } = this.state;
    const { total, checkoutCart } = this.props;

    return (
      <Fragment>
        {this.renderRedirectToSuccess()}
        <div className="cartDetails">
          <h5>¿Donde queres recibir tu compra?</h5>
          <Form>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su Direccion",
                },
              ]}
            >
              <Input
                value={shippingAddress}
                onChange={this.onWriteAddress}
                placeholder="Ingrese su direccion"
              />
            </Form.Item>

            <h5>¿Que tarjeta queres usar?</h5>
            <Form.Item
              name="radio-group"
              rules={[
                {
                  required: true,
                  message: "Por favor selecione medio de pago!",
                },
              ]}
            >
              <Radio.Group
                value={creditCard}
                onChange={this.onSelectCreditCard}
              >
                <Radio style={radioStyle} value={"visa-credito"}>
                  Visa Credito
                </Radio>
                <Radio style={radioStyle} value={"visa-debito"}>
                  Visa Debito
                </Radio>
                <Radio style={radioStyle} value={"master-debito"}>
                  Master Card debito
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <h2>Total: ${total}</h2>
              <Button
                block
                onClick={this.setRedirectToSuccess}
                style={{
                  backgroundColor: "var(--details)",
                  height: "3rem",
                  color: "white",
                }}
                htmlType="submit"
              >
                {this.state.redirect ? checkoutCart(shippingAddress, creditCard, customer) : console.log("no se viene")
                
                }
                Confirmar compra
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

CartDetails.propTypes = {
  total: PropTypes.string.isRequired,
  checkoutCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  total: getTotal(state),
});

export default connect(mapStateToProps, { checkoutCart })(CartDetails);
