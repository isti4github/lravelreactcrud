<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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

    public function edit($id)
    {
          $students = Student::find($id);

        return response()->json([
            'status'=> 200,
            'student'=>$students,
        ]);

    }

    public function updatest(Request $request,$id)
    {
        $student = Student::find($id);

        $student->stname = $request->input('stname');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');

        $student->update();

        return response()->json([
            'status'=> 200,
            'message'=>'Student Added Successfully',
        ]);
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
