import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Student extends Component{

    state =  {
        students: [],
        loading: true,
    }

    async componentDidMount(){

        const respo=await axios.get('http://localhost:8000/api/studentsdata');
        //console.log(respo);

        if(respo.data.status===200)
        {
            this.setState({
                students: respo.data.students,
                loading: false,
            });
        }

    }

    deleteStudent = async (e, id) =>
    {
        const res = await axios.delete(`http://localhost:8000/api/delete-studentapi/${id}`);

        if(res.data.status===200)
        {
            console.log(res.data.message);
        }

    }

     render(){
          

        var student_HTMLTABLE="";

        if(this.state.loading)
        {
            student_HTMLTABLE= <tr> <td colSpan={8}>Loading...</td></tr>
        }
        else{

            student_HTMLTABLE=
            this.state.students.map((item) => {

                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.stname}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                        <Link to={`view-student/${item.id}`} className='btn btn-success btn-sm'>View</Link>
                        </td>
                        <td>
                            <Link to={`edit-student/${item.id}`} className='btn btn-warning btn-sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => this.deleteStudent(e, item.id)}  className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                    </tr>

                );
            });
        }


            return(

                   <div className='container'>
                       <div className='row'>
                           <div className='col-md-12'>
                               <div className='card'>
                                   <div className='card-header'>
                                       <h4>Students Data

                                           <Link to={'add-student'} className="btn btn-primary float-end">Add Student</Link>

                                       </h4>

                                   </div>
                                   <div className='card-body'>

                                   <table className="table table-success table-striped table-hover table-bordered">
                                        <thead>
                                           <tr>
                                              <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Course</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col" colSpan={3}>Action</th>
                                            </tr>
                                       </thead>
                                       <tbody>
                                            {student_HTMLTABLE}
    
                                        </tbody>
                                    </table>

                                   </div>

                               </div>

                           </div>

                       </div>

                   </div>

                );

          }


}

export default Student;