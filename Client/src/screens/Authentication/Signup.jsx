
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen py-12 px-4"
        style={{ backgroundColor: 'var(--background)', fontFamily: 'var(--font-body)' }}
      >
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: 'var(--card)', boxShadow: 'var(--shadow-md)' }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}
            >
              Create Account
            </h2>
            <p style={{ color: 'var(--text-light)' }} className="text-sm">
              Sign up to get started
            </p>
          </div>

          {/* Signup Form */}
          <form className="mb-6">
            {/* Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Full Name
              </label>
              <Input
                id="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              <p style={{ color: 'var(--text-light)' }} className="text-xs mt-1">
                At least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start mb-6">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 text-sm cursor-pointer"
                style={{ color: 'var(--text-light)' }}
              >
                I agree to the{' '}
                <Link to="/terms" className="font-medium hover:opacity-80 transition" style={{ color: 'var(--accent)' }}>
                  Terms of Service
                </Link>
                {' '}
                and{' '}
                <Link to="/privacy" className="font-medium hover:opacity-80 transition" style={{ color: 'var(--accent)' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button title="Create Account" variant="primary" fullWidth={true}  />
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{ borderTop: '1px solid var(--border)' }}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--text-light)',
                }}
              >
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button title="Google" variant="secondary" />
            <Button title="GitHub" variant="secondary" />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p style={{ color: 'var(--text-light)' }} className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium hover:opacity-80 transition" style={{ color: 'var(--accent)' }}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
