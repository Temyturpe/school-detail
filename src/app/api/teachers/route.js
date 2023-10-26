import { NextResponse } from "next/server";
import fs from 'fs';

const dataFilePath = "teachers.json";

export async function POST(request) {
    const requiredFields = ['nationalId', 'title', 'name', 'surname', 'DOB', 'teacherNumber'];

    try {
        // Get the request body as JSON
        const body = await request.json();

        // Validate required fields
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ message: `${field} is required` }, { status: 400 });
            }
        }

        // Validate age
        if (body["DOB"]) {
            const birthYear = body["DOB"].split('/')[2];
            const currentYear = new Date().getFullYear();
            if ((currentYear - Number(birthYear)) < 21) {
                return NextResponse.json({ message: `Age cannot be less than 21` }, { status: 400 });
            }
        }

        // Check if the data file exists
        if (fs.existsSync(dataFilePath)) {
            const teachers = JSON.parse(fs.readFileSync(dataFilePath));

            // Generate a unique ID for the new teacher (you can use a different method)
            const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            const newTeacher = {
                id: randomNumber,
                nationalId: body.nationalId,
                title: body.title,
                name: body.name,
                surname: body.surname,
                DOB: body.DOB,
                teacherNumber: body.teacherNumber
            };

            // Add optional salary if provided
            if (body.salary) {
                newTeacher.salary = body.salary;
            }

            teachers.push(newTeacher);
            fs.writeFileSync(dataFilePath, JSON.stringify(teachers));

            return NextResponse.json({ teacher: newTeacher, message: 'New teacher added' }, { status: 200 });
        } else {
            const randomNumber = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            const newTeacher = {
                id: randomNumber,
                nationalId: body.nationalId,
                title: body.title,
                name: body.name,
                surname: body.surname,
                DOB: body.DOB,
                teacherNumber: body.teacherNumber
            };

            // Add optional salary if provided
            if (body.salary) {
                newTeacher.salary = body.salary;
            }

            const teachers = [newTeacher];
            fs.writeFileSync(dataFilePath, JSON.stringify(teachers));

            return NextResponse.json({ teacher: newTeacher, message: 'New teacher added' }, { status: 200 });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ message }, { status: 500 });
    }
}



export async function GET() {
    try {
        if (fs.existsSync(dataFilePath)) {
            const teachers = JSON.parse(fs.readFileSync(dataFilePath));
            return NextResponse.json(teachers, { status: 200 });
        } else {
            return NextResponse.json([], { status: 200 });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: 'id is not defined' }, { status: 400 });
        }

        if (fs.existsSync(dataFilePath)) {
            const teachers = JSON.parse(fs.readFileSync(dataFilePath));
            const teacherIndex = teachers.findIndex(teacher => teacher.id === Number(id));

            if (teacherIndex === -1) {
                return NextResponse.json({ message: 'Teacher with the specified id not found' }, { status: 404 });
            }

            teachers.splice(teacherIndex, 1);
            fs.writeFileSync(dataFilePath, JSON.stringify(teachers));

            return NextResponse.json({ message: 'Teacher record deleted' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Record not found' }, { status: 404 });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ message }, { status: 500 });
    }
}
