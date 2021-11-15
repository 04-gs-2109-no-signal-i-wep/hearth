import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
  }

  handleDelete() {
    this.props.deleteProduct(this.props.product.id);
  }

  render() {
    const product = this.props.product;
    return (
      <>
        {product ? (
          <>
            <main>
              {this.props.is_admin ? (
                <div className="adminBar">
                  <h5>Admin Control</h5>
                  <div className="adminBar">
                    <a href={`/products/${product.id}/edit`}>
                      <button className="adminButton">
                        <EditIcon fontSize="12" /> Edit
                      </button>
                    </a>
                    <button
                      className="adminButton"
                      onClick={() => this.props.deleteProduct(product.id)}
                    >
                      <DeleteIcon fontSize="12" /> Delete
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="singleView">
                <div>
                  <div className="back">
                    <Link to={"/products"}>
                      <ArrowBackIcon fontSize="12" /> Back to All
                    </Link>
                  </div>
                  <img
                    src={product.image_url}
                    className="featuredProduct"
                    alt={product.name}
                  />
                </div>
                <div className="left">
                  <h2>{product.name}</h2>
                  <div className="description">{product.description}</div>
                  <div className="price">${product.price}</div>
                  <button>
                    <ShoppingCartIcon fontSize="25" /> Add To Cart
                  </button>
                  <div className="details"></div>
                </div>
              </div>
            </main>
          </>
        ) : (
          "Still Loading..."
        )}
      </>
    );
  }
}

const mapState = (state) => ({
  product: state.singleProduct,
  is_admin: state.auth.is_admin,
});

const mapDispatch = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
