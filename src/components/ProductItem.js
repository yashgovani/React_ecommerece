import React from 'react';

const ProductItem = (props) => {
  const { product } = props;


  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={product.image || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'} alt={product.id} />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: 'capitalize' }}>
              {product.title}
              <span className="tag is-primary">$ {product.price}</span>
            </b>
            <div>{product.description}</div>
            {product.stock > 0 ? (
              <small>{product.stock + ' Available'}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary  is-pulled-right"
                disabled={product.stock > 0 ? false : true}
                onClick={() =>
                  props.addToCart({
                    id: product.title,
                    product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
