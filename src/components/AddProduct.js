import React, { Component } from 'react';
import withContext from '../withContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { categories } from '../constant/categories';

const initState = {
  title: '',
  price: '',
  stock: '',
  category: '',
  description: '',
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { title, price, category, stock, description } =
      this.state;

    if (title && price && category) {
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post('http://localhost:3001/products', {
        id,
        title,
        price,
        stock,
        description,
        category,
      });

      this.props.context.addProduct(
        {
          title,
          price,
          description,
          category,
          stock: stock || 0,
        },
        () => this.setState(initState)
      );
      this.setState({
        flash: { status: 'is-success', msg: 'Product created successfully' },
      });
    } else {
      this.setState({
        flash: { status: 'is-danger', msg: 'You missed one of the required field' },
      });
    }
  };

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: '' });

  render() {
    const { title, price, stock, description, category } =
      this.state;
    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Select Product Category:</label>
                <select
                  value={category}
                  onChange={this.handleChange}
                  className="input"
                  name="category"
                >
                  <option value={''}>All Categories</option>
                  {categories.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: 'none' }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);
