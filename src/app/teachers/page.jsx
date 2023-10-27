'use client';
// this is the teachers list(table) page
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {AiFillDelete} from 'react-icons/ai'

export default function Teachers() {
	// fetching students datas
   const [teacherData, setTeacherData] = useState([]);
   const getTeacherData  = async () =>{
    try {
        const response = await fetch('/api/teachers');  
        const records = await response.json();
        setTeacherData(records);
    } catch (error) {
        console.log(error);
    }   
}
  useEffect(() => {
    getTeacherData();
  }, []);
 // delete request for the table using id(auto generated from the backend(api/students/route.js))
    const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/teachers?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Teacher deleted successfully');
		
		// to reload the page after deleting
		window.location.reload();
		// 
      } else {
        console.error('Failed to delete teacher');
      }
    } catch (error) {
      console.error('Internal server error', error);
    }
  };
  return (
	// layout and styling for the student lists(table) page
  <div className='md:flex flex-col items-center justify-center min-h-screen bg-gray-900'>
  <div className="col-span-12">
    <div className="overflow-auto lg:overflow-visible ">
        <table className="table mt-24 text-gray-300 font-semibold border-separate space-y-6 text-xs md:text-lg capitalize">
				     <thead className="bg-gray-800 text-gray-100">
					     <tr>
						     <th className="p-3 text-left">National ID</th>
                             <th className="p-3 text-left">Title</th>
						     <th className="p-3 text-left">Name</th>
						     <th className="p-3 text-left">Surname</th>
                             <th className="p-3 text-left">Teacher Number</th>
						     <th className="p-3 text-left">Date of Birth</th>
                   <th className="p-3 text-left">Salary</th>
                   <th className="p-3 text-left">Delete</th>
					       </tr>
				      </thead>
				      <tbody>
                  {teacherData.map((teacher, id) => (
					         <tr key={id} className="bg-gray-800">
					             <td className="p-3">
							         <div className="flex align-items-center">
                                         {teacher.nationalId}
							         </div>
						         </td>
                                 <td className="p-3">
							         {teacher.title}
						         </td>
						         <td className="p-3">
						             {teacher.name}
						         </td>
						         <td className="p-3 font-bold">
                                     {teacher.surname}
						         </td>
						         <td className="p-3">
							         <span className=" rounded-md px-2">{teacher.teacherNumber}</span>
						         </td>
                                 <td className="p-3">
							         <span className=" rounded-md px-2">{teacher.DOB}</span>
						         </td>
                                 <td className="p-3">
							         <span className=" rounded-md px-2">{teacher.salary}</span>
						         </td>
            
						         <td className="p-3" onClick={() => handleDelete(teacher.id)}>
						   	         <div className="text-gray-400 hover:text-gray-100  ml-2">
								         <i class="material-icons-round text-base"><AiFillDelete/></i>
								     </div>
						         </td>
					         </tr>
                           ))}
				     </tbody>
			     </table>
		     </div>
	     </div>
         <div className='flex justify-center items-center mt-8'>
             <Link href='/teachersform'>
             <button className='bg-gray-200 hover:bg-gray-100 text-gray-700 text-sm md:text-xl font-semibold px-2 md:px-4 py-1 md:py-2 rounded-md'>Add Your Details</button>
              </Link>
         </div>
  </div>
  );
}
