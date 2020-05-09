import React, { Component } from 'react';

class ProductCart extends Component {
    render() {
        const{name,bran,price} =this.props.product
        
        return (
            <div className="produt-card">
                <div>Nombre: {name}</div>
                <div>Marca: {bran}</div>
                <div>Precio: {price}</div>
            </div>
        );
    }
}

export default ProductCart;