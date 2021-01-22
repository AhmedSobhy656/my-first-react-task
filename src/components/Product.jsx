
import React, { Component } from 'react';

class Product extends Component{
 
    getClasses(){  
        return this.props.product.count === 0 ?
        "badge badge-warning m-2"
        :"badge badge-primary m-2";
    }

    render() {
        return (
            <div className="row"> 
                 <div className="col-2">
                     <span>
                         <a href= {`/products/${this.props.product.id}`}> 
                             {this.props.product.name} 
                         </a>
                     </span>                               {/* nume of product */}
                </div>
                <div className="col">
                  <span className={this.getClasses()}> {this.props.product.count} </span> {/* count */}
                  <button
                    onClick={ () => this.props.onIncrement(this.props.product)}          
                    className="btn btn-primary btn-sm" 
                    >  {/* Button increment */}
                    +
                  </button>
                  <span onClick={ () => this.props.onDelete(this.props.product)}>         {/* Delete */}
                      <i className="fas fa-trash m-2"></i>
                  </span>
                </div>                
           </div> 
          );
    }
}

export default Product;
