import React from 'react';

const CartItem = (props) => {
  const { cartItem, cartKey } = props;

  const { product, amount } = cartItem;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={product.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'} alt={product.title} />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: 'capitalize' }}>
              {product.title}{' '}
              <span className="tag is-primary">${amount * product.price}</span>
            </b>
            <div>{product.description}</div>
            <small>{`${amount} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
