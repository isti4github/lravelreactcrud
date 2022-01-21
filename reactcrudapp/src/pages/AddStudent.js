import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import Student from './Student';


class AddStudent extends Component{

     
    state = {
        stname: '',
        course: '',
        email: '',
        phone: '',
        error_list:[],
    }


    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveStudent = async (e) => {

        e.preventDefault();

        const respo= await axios.post(`http://localhost:8000/api/add-studentapi`, this.state) ; //in this line api is default do not think about that 

      

       if(respo.data.status === 200)
       {
           //console.log(respo.data.message);
           swal({
            title: "success!",
            text: respo.data.message,
            icon: "success",
          });

           //after inserrt make all the input field empty
           this.setState({
            stname: '',
            course: '',
            email: '',
            phone: '',
           });

          //after data insert if you want to move to the main mage, write following code
          //this.props.history.push('./Student');

       }
       else{
           
           this.setState({
               error_list: respo.data.validate_err,
           });
       }
    }


     render(){
            return(

                   <div className='container'>
                       <div className='row'>
                           <div className='col-md-12'>
                               <div className='card'>
                                   <div className='card-header'>
                                       <h4>Add Students

                                           <Link to={'/'} className="btn btn-primary float-end">Back</Link>


                                       </h4>

                                   </div>
                                   <div className='card-body'>

                                       <form onSubmit={this.saveStudent}>

                                           <div className='from-group mb-3'>
                                               <label>Student Name</label>
                                               <input type="text" name="stname" onChange={this.handleInput} value={this.state.stname} className="form-control"/>
                                               <span className='text-danger'>{this.state.error_list.stname}</span>
                                           </div>

                                           <div className='from-group mb-3'>
                                               <label>Student Course</label>
                                               <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control"/>
                                               <span className='text-danger'>{this.state.error_list.course}</span>
                                           </div>

                                           <div className='from-group mb-3'>
                                               <label>Student email</label>
                                               <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                               <span className='text-danger'>{this.state.error_list.email}</span>
                                           </div>

                                           <div className='from-group mb-3'>
                                               <label>Student Phone</label>
                                               <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control"/>
                                               <span className='text-danger'>{this.state.error_list.phone}</span>
                                           </div>

                                           <div className='from-group mb-3'>
                                               <button type='submit' className='btn btn-primary'>Save Student</button>
                                           </div>


                                       </form>

                                   </div>

                               </div>

                           </div>

                       </div>

                   </div>

                );

          }


}

export default AddStudent;