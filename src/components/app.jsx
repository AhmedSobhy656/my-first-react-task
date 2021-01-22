import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";

import NavBar from "./navbar";
import ShoppingCart from "./shoppingCart";
import Home from "./home";
//import ProductDetails from "./productDetails";
import Menu from "./menu";
import Admin from "./admin";
import Login from "./login"
import NotFound from "./notFound";
import ProductForm from './productForm';


class App extends Component {
  state = {
    products: [ ]
  };

    async componentDidMount(){
      //call backend
    const {data} = await axios.get("http://localhost:3000/products/");
    //set state
    this.setState({ products : data});
  }


   
  handleDelete = async product => {
     const oldproducts = [...this.state.products];

     //state
     //clone
     //Edit
     const products = this.state.products.filter(p => p.id !== product.id);
      //Set State
     this.setState({ products });

    try{
    //call Backend
    await axios.delete("http://localhost:3000/products/" + product.id);
    } catch (ex) {
       toast.error("Cant Delete");
       this.setState({ products: oldproducts});
    }    
  };

  handleReset = () => {
    //Clone
    let products = [...this.state.products];
    //Edit
    products = products.map((p) => {
      p.count = 0;
      return p;
    });
    //Set state
    this.setState({ products });
  };

  IncrementHandler = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].count++;
    //Set State
    this.setState({ products });
  };

  handleInCartChange = (product) => {
    //Clone
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    //Edit
    products[index].isInCart = !products[index].isInCart;
    //Set State
    this.setState({ products });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar
         // productsCount={this.state.products.length}
          productsCount={this.state.products.filter(p => p.isInCart > 0).length}
        />
        <main className="container">
          <Switch>
            <Route path="/login" component={Login} /> 
            <Route
              path="/cart"
              render={props => (
                <ShoppingCart
                  products={this.state.products.filter(p => p.isInCart)}
                  onIncrement={this.IncrementHandler}
                  //onDelete={this.handleDelete}
                  onDelete={this.handleInCartChange}
                  onReset={this.handleReset}
                  {...props}
                />
              )}
            />
            <Route path="/notfound" component={NotFound} />
            {/* //2. Add Route */}
            <Route
              path="/menu"
              render={(props) => (
                <Menu
                  {...props}
                  products={this.state.products}
                  onClick={this.handleInCartChange}
                />
              )}
            />
            <Route path="/productform/:id" component={ProductForm} />
            <Route 
              path="/admin"
              render={(props) => (
                <Admin
                  {...props}
                  products={this.state.products}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                />
              )}
            />
            <Route path="/home" exact component={Home} />
            <Redirect from="/" to="/home" />
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
