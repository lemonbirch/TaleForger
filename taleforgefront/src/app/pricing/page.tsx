import React from 'react'
import ButtonCard from '../components/buttonCard'
const page = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
  <h2 className="text-3xl font-bold mb-4">A Plan for Everyone</h2>
  <p className="text-lg mb-8">Simple and affordable price plans for you and your kid.</p>

  <div className="flex justify-center items-center w-full">
     <div className="flex flex-wrap justify-center gap-4">
      <ButtonCard type="button" price="Free" features={['10 books Per Month', 'PDF downloads']} buttonNames={["Sign Up"]} />
      <ButtonCard type="button" price="$4.99" features={['20 books Per Month', 'PDF downloads']} buttonNames={['Subscribe']} />
      <ButtonCard type="button" price="$9.99" features={['30 books Per Month', 'PDF downloads', '1 printout per month']} buttonNames={['Subscribe']} />
        </div>
        </div>
    </section>


  )
}

export default page



