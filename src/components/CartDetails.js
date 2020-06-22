import React, { Component, Fragment } from "react";
import { Radio, Input, Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutCart } from "../actions";
import { getTotal } from "../reducers";
import { Link } from "react-router-dom";

class CartDetails extends Component {
  state = {
    creditCard: this.props.creditCard,
    shippingAddress: this.props.shippingAddress,
  };

  onWriteAddress = (e) => {
    this.setState({ shippingAddress: e.target.value });
  };

  onSelectCreditCard = (e) => {
    this.setState({ creditCard: e.target.value });
  };

  render() {
    const radioStyle = { display: "block", height: "50px", lineHeight: "50px" };
    const { shippingAddress, creditCard } = this.state;
    const { total, checkoutCart } = this.props;

    return (
      <Fragment>
        <div className="cartDetails">
          <h5>¿Donde queres recibir tu compra?</h5>
          <Input value={shippingAddress} onChange={this.onWriteAddress} />

          <h5>¿Que tarjeta queres usar?</h5>
          <Radio.Group value={creditCard} onChange={this.onSelectCreditCard}>
            <Radio  style={radioStyle} value={"visa-credito"}>Visa Credito</Radio>
            <Radio style={radioStyle} value={"visa-debito"}>
              Visa Debito
            </Radio>
            <Radio style={radioStyle} value={"master-debito"}>
              Master Card debito
            </Radio>
          </Radio.Group>

          <h2>Total: ${total}</h2>

          <Link to={{ pathname: "/success" }}>
            <Button
              block
              onClick={() => checkoutCart(shippingAddress, creditCard)}
              style={{
                backgroundColor: "var(--details)",
                height: "3rem",
                color: "white",
              }}
            >
              Confirmar compra
            </Button>
          </Link>
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
