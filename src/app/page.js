import Link from 'next/link';

export default function Home() {
  return (
    <main className='w-full h-screen mt-36 md:mt-44 capitalize'>
      <div className='mainwrapper flex flex-col gap-4 md:gap-8 justify-center items-center '>
     <h2 className='text-2xl md:text-4xl font-semibold text-center'>hello welcome to PlateauMed High School  Students and Teacher Portal</h2>
      <div className="category text-xl md:text-3xl font-semibold text-gray-400 ">please select a category</div>
      <div className='mt-10 text-xl font-semibold flex gap-12 items-center'>
      <Link href="/students"><button className="student bg-gray-50 text-gray-700 rounded-lg shadow-xl hover:bg-gray-200 px-5 md:px-8 py-2">Student</button></Link>
      <Link href="/teachers"><button className="teacher bg-gray-50 text-gray-700 rounded-lg shadow-xl hover:bg-gray-200 px-5 md:px-8 py-2">Teacher</button></Link>
      </div>
      </div>
    </main>
  )
}
