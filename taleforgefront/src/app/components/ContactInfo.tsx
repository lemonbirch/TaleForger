import React from 'react'

const ContactInfo = () => {
  return (
    <section className="bg-base-100 rounded-box shadow-xl mb-16 p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="bg-base-200 rounded-box p-8 max-w-2xl mx-auto">
            <p className="text-lg mb-4 text-center">Have questions or need assistance? We're here to help!</p>
            <ul className="list-none space-y-2 text-center">
              <li>Email: support@storybuilderforkids.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Story Lane, Imagination City, USA</li>
            </ul>
          </div>
        </section>
  )
}

export default ContactInfo