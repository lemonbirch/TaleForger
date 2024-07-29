import React from 'react'
import ButtonCard from '../components/buttonCard'
const Page = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h2 className="text-3xl font-bold mb-4">A Plan for Everyone</h2>
      <p className="text-lg mb-8">Simple and affordable price plans for you and your kid.</p>

      <div className="flex justify-center items-center w-full">
        <div className="flex flex-wrap justify-center gap-4">
        <ButtonCard renderData={{ price: "$9.99", features: ['30 books Per Month', 'PDF downloads', '1 printout per month'] }}  />
          <ButtonCard renderData={{ price: "$4.99", features: ['20 books Per Month', 'PDF downloads'] }} />
          <ButtonCard renderData={{ price: "$9.99", features: ['30 books Per Month', 'PDF downloads', '1 printout per month'] }}  />
        </div>
      </div>
    </section>
  )
}

export default Page




