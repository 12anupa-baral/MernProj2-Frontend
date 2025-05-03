const ContactUs = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-hardPrimary text-white text-center py-20">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </header>

      {/* Contact Info */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Get In Touch</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          We are here to help you. Reach out to us via any of the following
          methods.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "Call Us", detail: "+1 123 456 7890" },
            { title: "Email Us", detail: "contact@wisedoctors.com" },
            { title: "Visit Us", detail: "123 Health St, Wellness City" },
          ].map(({ title, detail }, index) => (
            <div
              key={index}
              className="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
            >
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-gray-700 mt-2">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Send Us A Message</h2>
        <form className="max-w-2xl mx-auto mt-8 space-y-8">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-700 font-bold">
                {label}
              </label>
              <input type={type} id={id} className="input" />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-bold">
              Message
            </label>
            <textarea id="message" className="input"></textarea>
          </div>
          <button type="submit" className="sendButton">
            Send Message
          </button>
        </form>
      </section>

      {/* FAQ */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {[
            {
              question: "What are your operating hours?",
              answer: "We operate from 9 AM to 5 PM, Monday to Friday.",
            },
            {
              question: "How can I book an appointment?",
              answer:
                "You can book an appointment through our website or by calling our office.",
            },
            {
              question: "Do you offer telemedicine services?",
              answer: "Yes, we offer telemedicine consultations.",
            },
          ].map(({ question, answer }, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md transform transition hover:scale-100 scale-95"
            >
              <h3 className="text-xl font-bold">{question}</h3>
              <p className="mt-2 text-gray-700">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
