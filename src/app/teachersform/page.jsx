'use client';
// teachers form page that collects and POST datas to the db
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TeacherForm() {
  // initial state(empty) of the data keys
  const router = useRouter();
  const [formData, setFormData] = useState({
    nationalId: '',
    title: '',
    name: '',
    surname: '',
    DOB: '',
    teacherNumber: '',
    salary: '',
  });
  // state for the submit button 
  const [isLoading, setIsLoading] = useState(false);
 
  //   function for assigning computed values to respective keys
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  //   submit function to make the post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/teachers', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      

      if (response.ok) {
        console.log('Teacher added successfully');
        router.push('/teachers')
        router.refresh()
      } else {
        console.error('Failed to add teacher');
      }
    } catch (error) {
      console.error('Internal server error', error);
    }
    
  };
  useEffect(() => {
    // Code to calculate age and show notification
    const DOBInput = document.querySelector('input[name="DOB"]');
    const ageNotification = document.getElementById('ageNotification');

    if (DOBInput) {
      DOBInput.addEventListener('change', () => {
        // save entered DOB and calculate the age
        const dob = DOBInput.value;
        const birthYear = parseInt(dob.split('/')[2]);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        // required age
        const requiredAge = 21;

        // Check if age is more or less than the required age
        if (age < requiredAge) {
          ageNotification.textContent = `Age must not be less than ${requiredAge} years.`;
        } else {
          ageNotification.textContent = ''; // Clear the notification if age is acceptable
        }
      });
    }
  }, []);

  return (
    // layout and styling for the teacher form page
    <div className='md:flex flex-col items-center justify-center pt-10 md:pt-0 min-h-screen bg-gray-900 text-gray-100'>
        <div className="p-4 md:p-8 rounded-xl bg-gray-800 w-full md:w-[60%] mx-auto">  
            <h1 className="text-2xl md:text-4xl font-semibold">Teacher Form</h1>    
            <p className="text-gray-200 text-sm md:text-xl mt-2 md:mt-6"> Please fill the beform below the correct details.</p>    
              <form onSubmit={handleSubmit}>      
                 <div className="mt-8 grid lg:grid-cols-2 gap-4">
                 <div>
                     <label className="text-base text-gray-50 block mb-1 font-semibold">Title</label>          
                     <input type="text" name="title" value={formData.title} onChange={handleChange} className="bg-gray-100 border border-gray-200 rounded outline-none py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full" required placeholder="Enter your Title" />
                 </div>       
                 <div>          
                     <label className="text-base text-gray-50 block mb-1 font-semibold">Name</label>          
                     <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full outline-none" placeholder="Enter your name" />
                 </div>        
                 <div>
                     <label className="text-base text-gray-50 block mb-1 font-semibold">Surname</label>          
                     <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="bg-gray-100 border border-gray-200 rounded outline-none py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full" placeholder="Enter your surname" />
                 </div>        
                 <div>
                     <label className="text-base text-gray-50 block mb-1 font-semibold">National ID</label>          
                     <input type="text" name="nationalId" value={formData.nationalId} required onChange={handleChange} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full outline-none" placeholder="(ex. 1234567890)" />
                 </div> 
                 <div>
                     <label className="text-base text-gray-50 block mb-1 font-semibold">Teacher Number</label>          
                     <input type="text" name="teacherNumber" required value={formData.teacherNumber} onChange={handleChange} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full outline-none" placeholder="(ex. 1234)" />        
                 </div>        
                 <div>
                 <label className="text-base text-gray-50 block mb-1 font-semibold">Date of Birth</label>          
                 <input type="text" name="DOB" value={formData.DOB} required onChange={handleChange} pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"
                     title="Please enter a date in the format dd/mm/yyyy." className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full outline-none" placeholder='dd/mm/yyyy'/>   
                     <div id="ageNotification" className='text-red-600'></div>      
                 </div> 
                 <div>
                 <label className="text-base text-gray-50 block mb-1 font-semibold">Salary</label>          
                     <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-800 w-full outline-none" placeholder="salary" />        
                 </div> 
                        
                 </div>      
                 <div className="space-x-4 mt-8">  
                 <button type="submit"disabled={isLoading} className="py-2 px-4 bg-blue-500 text-white text-base font-semibold rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
                     {isLoading && <span>Adding Teacher...</span>}
                     {!isLoading && <span>Add Teacher</span>}
                 </button>            
                 <Link href='/teachers'><button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 text-base font-semibold disabled:opacity-50">Go back</button></Link>
                 </div>    
             </form> 
          </div>
     </div>
  )}