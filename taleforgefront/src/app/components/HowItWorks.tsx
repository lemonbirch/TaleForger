import React from 'react'

const HowItWorks = () => {
  return (
    <section className="bg-base-100 rounded-box shadow-xl mb-16 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">Choose Your Adventure</li>
            <li className="step step-primary">Customize Your Story</li>
            <li className="step step-primary">Add Your Touch</li>
            <li className="step step-primary">Bring it to Life</li>
            <li className="step step-primary">Download and Share</li>
          </ul>
        </section>
  )
}

export default HowItWorks