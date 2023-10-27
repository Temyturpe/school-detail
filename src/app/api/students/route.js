import {  NextResponse } from "next/server";
import fs from 'fs';

const dataFilePath = "students.json"

// post
export async function POST(request){
    const requireField = ['name', 'nationalId', 'surname', 'studentNumber']
    try {
        // getting request body
        const body = await request.json();
        // validating request body/fields
        for(const key of requireField){
            if(!body[key]) return NextResponse.json({message: `${key} is required`}, {status: 400});
           
        }
        // Validate age
        if(body["DOB"]){
            const birthYear = body["DOB"].split('/')[2];
            const currentYear = new Date().getFullYear();
            if((currentYear - Number(birthYear)) > 22)  return NextResponse.json({message: `age can not be greater that 22`}, {status: 400});
        }
        
        // return NextResponse.json({record}, {status: 200})

         // Check if the data file exists
        if (fs.existsSync(dataFilePath)){
            const students = JSON.parse(fs.readFileSync(dataFilePath));
            // return NextResponse.json(students, {status: 200})

            // generate random id numbers
            const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;


            const newStudent = {id: randomNumber, nationalId: body.nationalId, name: body.name, surname: body.surname, studentNumber: body.studentNumber}
            if (body.DOB){
                newStudent.DOB = body.DOB
            }
            students.push(newStudent)
           
            fs.writeFileSync(dataFilePath, JSON.stringify(students));

            return NextResponse.json({student: newStudent, message: 'new student added'}, {status: 200})
        } else {
            const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            const newStudent = {id: randomNumber,nationalId: body.nationalId, name: body.name, surname: body.surname, studentNumber: body.studentNumber}
            if (body.DOB){
                newStudent.DOB = body.DOB
            }
            const students = [newStudent]
            fs.writeFileSync(dataFilePath, JSON.stringify(students));
            return NextResponse.json({student: newStudent, message: 'new student added'}, {status: 200})
        }

    } catch (error) {
        const message = error instanceof Error ? error.message : 'internal server error';
        return NextResponse.json({message}, {status: 500})
    }
}

// get
export async function GET(){
    try {
        if (fs.existsSync(dataFilePath)){
            const students = JSON.parse(fs.readFileSync(dataFilePath));
            return NextResponse.json(students, {status: 200})
        } else {
            return NextResponse.json([], {status: 200})
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : 'internal server error';
        return NextResponse.json({message}, {status: 500})
    }
}

// delete
export async function DELETE(request){
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        if(!id) return NextResponse.json({message: 'id is not defined'}, {status: 400})

        if (fs.existsSync(dataFilePath)){
            const students = JSON.parse(fs.readFileSync(dataFilePath));
            const newStudents = students.filter(student => student.id !== Number(id))
            fs.writeFileSync(dataFilePath, JSON.stringify(newStudents));
            return NextResponse.json({message: 'record deleted'}, {status: 200})
        }else  return NextResponse.json({message: 'record cant delete'}, {status: 400})
        
       
    } catch (error) {
        const message = error instanceof Error ? error.message : 'internal server error';
        return NextResponse.json({message}, {status: 500})
    }
}