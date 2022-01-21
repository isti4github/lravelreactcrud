import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class EditStudent extends Component{

   

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

    
    async componentDidMount()
    {
        //const id = this.props.match.params.id;
        const id=13;
        const respo= await axios.get(`http://localhost:8000/api/edit-studentapi/${id}`) ;
        console.log(respo);
        
       if(respo.data.status === 200)
       {

           
           //after inserrt make all the input field empty
           this.setState({
            stname: respo.data.student.stname,
            course: respo.data.student.course,
            email: respo.data.student.email,
            phone: respo.data.student.phone,
           });

       }
     
        
    }


    updateStudent = async (e) => {

        e.preventDefault();

        document.getElementById('updatebtn').innerText="Updating";

        //const id = this.props.match.params.id;
        const id=13;

        const respo= await axios.put(`http://localhost:8000/api/update-studentapi/${id}`,this.state) ; //in this line api is default do not think about that 

       if(respo.data.status === 200)
       {   document.getElementById('updatebtn').innerText="Update Student";
           //console.log(respo.data.message);

           swal({
            title: "success!",
            text: respo.data.message,
            icon: "success",
          });
           
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
                                       <h4>Edit Students

                                           <Link to={'/'} className="btn btn-primary float-end">Back</Link>


                                       </h4>

                                   </div>
                                   <div className='card-body'>

                                       <form onSubmit={this.updateStudent}>

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
                                               <button id="updatebtn" type='submit' className='btn btn-primary'>Update Student</button>
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

export default EditStudent;