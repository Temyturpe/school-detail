'use client';
import React, { useState, useEffect } from 'react';

export default function Students() {
  const [studentData, setStudentData] = useState([]);
   const getStudentData  = async () =>{
    try {
        const response = await fetch('http://localhost:9000/api/students');  
        const records = await response.json();
        setStudentData(records);
    } catch (error) {
        console.log(error);
    }
    
}
 
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div>
      <ul>
        {studentData.map((student, index) => (
          <li key={index}>
            <p>{student.name}</p>
            <p>{student.surname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
