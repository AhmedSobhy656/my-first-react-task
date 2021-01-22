import React, { Component } from 'react';
import Joi from "joi-browser";


class Login extends Component {
    state = {
        username : "" ,
        password : "" ,
        errors : {}
    };

    schema = {
        username:Joi.string().required(),
        password:Joi.string().required()
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();

        if(errors) return;

        //call backend
    };

    validate = () => {
        const errors = {}; 
        //clone
        const state = {...this.state};
        delete state.errors;
        const res = Joi.validate(state, this.schema, {abortEarly:false});
        if (res.error === null) {
            this.setState({errors : {} });
            return null;
        }

        for (const error of res.error.details) {
            
            errors[error.path] = error.message;
        }

        //setstate
        this.setState({errors});

    };

    handleChange = e => {
         //clone
         let state = {...this.state};
         //Edit
         state[e.currentTarget.name] = e.currentTarget.value;
         //set state
         this.setState(state);
    };

    render() { 
        return ( 
            <React.Fragment>
                 <h1> Log in </h1> 
                    
                 <form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                       <label htmlFor="" >
                                  User Name
                        </label>
                       <input name= "username"
                              value={this.state.username}
                              onChange={this.handleChange}
                              id="username" 
                              type="text" 
                              className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" >
                              Password
                        </label>
                        <input name = "password"
                               value={this.state.password}
                               onChange={this.handleChange}
                               id="password" 
                               type="password" 
                               className="form-control" 
                        />
                    </div>
                       
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                 </form>
                 </React.Fragment>       
                 
                 );
       }
}
 
export default Login;