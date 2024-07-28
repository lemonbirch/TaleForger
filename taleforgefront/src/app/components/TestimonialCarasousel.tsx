import React from 'react'

const TestimonialCarasousel = () => {
  return (
    <section className="bg-base-100 rounded-box shadow-xl mb-16 p-8">
    <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
    <div className="carousel w-full">
      {[
        {
          quote: "My kids love creating their own storybooks! The illustrations are amazing and the process is so easy.",
          author: "Sarah, Parent"
        },
        {
          quote: "StoryBuilder has made my daughter more excited about reading and writing. It's a fantastic tool for young learners!",
          author: "Mark, Parent"
        }
      ].map((testimonial, index) => (
        <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
          <div className="card bg-base-200 shadow-xl w-full max-w-2xl mx-auto">
            <div className="card-body">
              <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
              <p className="text-right font-semibold">- {testimonial.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default TestimonialCarasousel