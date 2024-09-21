import React from 'react';

const testimonials = [
  {
    name: "Angie",
    quote: "UseAI.th saved me days of research. What would have taken a week was done in hours!",
  },
  {
    name: "Chaem",
    quote: "The turnaround time is incredible. I got comprehensive market analysis in minutes!",
  },
  {
    name: "Maslin",
    quote: "This AI service condensed a month's worth of data into actionable insights overnight.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-500">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md">
            <p className="text-lg mb-4 text-gray-700">"{testimonial.quote}"</p>
            <p className="font-semibold text-blue-500">{testimonial.name}</p>
            <div className="text-yellow-500 text-xl mt-2">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  );
}