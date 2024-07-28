import React from 'react'

const FeatureGrid = () => {
  return (
    <section className="bg-base-100 rounded-box shadow-xl mb-16 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose StoryBuilder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Kid-Friendly Interface",
              "Educational Benefits",
              "Customizable Options",
              "Free to Use"
            ].map((feature, index) => (
              <div key={index} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="card-body">
                  <h3 className="card-title text-xl">{feature}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  )
}

export default FeatureGrid