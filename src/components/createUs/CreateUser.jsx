import React, { useState } from 'react';

function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+998' // Start with +998
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && value.length === 4 && value !== '+998') {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!emailReg.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    const phoneReg = /^\+998\d{9}$/;
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    } else if (!phoneReg.test(formData.phone)) {
      validationErrors.phone = 'Phone number must start with +998 and be 12 digits long';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log('User added:', formData);
        setFormData({
          name: '',
          email: '',
          phone: '+998'
        });
        setErrors({});
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  return (
    <div className='bg-slate-600 min-h-[100vh]'>
      <div className="flex items-center justify-center pt-[120px]">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">USER FORM</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800">Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
