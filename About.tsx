import React from 'react';
import { Users, Target, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto px-4">
          Building the future of e-commerce, one happy customer at a time.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Driven by Quality, Inspired by You.</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Founded in 2024, SHOPEE started with a simple mission: to make high-quality lifestyle products accessible to everyone. We believe that style shouldn't come with a premium price tag.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our team works directly with manufacturers to cut out the middlemen, ensuring that you get the best value for your money without compromising on quality or sustainability.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
              alt="Office Team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-slate-50 rounded-xl text-center border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-500">To democratize access to premium products and provide an unmatched shopping experience.</p>
          </div>
          
          <div className="p-8 bg-slate-50 rounded-xl text-center border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Passion</h3>
            <p className="text-slate-500">We love what we do, and we pour that passion into every product we curate for you.</p>
          </div>
          
          <div className="p-8 bg-slate-50 rounded-xl text-center border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Community</h3>
            <p className="text-slate-500">We are more than just a store; we are a community of style enthusiasts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};