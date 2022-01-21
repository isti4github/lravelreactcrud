<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Student;


class StudentController extends Controller
{
    public function index()
    {
          $students = Student::all();

        return response()->json([
            'status'=> 200,
            'students'=>$students,
        ]);

    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'stname'=>'required|max:191',
            'course'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:11|min:11',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {

        $student = new Student;

        $student->stname = $request->input('stname');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');

        $student->save();

        return response()->json([
            'status'=> 200,
            'message'=>'Student Added Successfully',
        ]);

        }



    }

    public function edit($id)
    {
         $students = Student::find($id);

         if($students)
         {

            return response()->json([
                'status'=> 200,
                'student'=>$students,
            ]);
         }




    }

    public function updatest(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            'stname'=>'required|max:191',
            'course'=>'required|max:191',
            'email'=>'required|email|max:191',
            'phone'=>'required|max:11|min:11',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {

        $student = Student::find($id);

        $student->stname = $request->input('stname');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');

        $student->update();

        return response()->json([
            'status'=> 200,
            'message'=>'Student data edited Successfully',
        ]);
      }
    }

    public function destroy($id){
        $student = Student::find($id);
        $student->delete();
        return response()->json([
            'status'=> 200,
            'message'=>'Student Deleted Successfully',
        ]);

    }
}
