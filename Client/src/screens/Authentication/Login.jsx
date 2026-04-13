

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      remember: e.target.checked,
    });
  };

  console.log(formData);

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
              Login
            </h2>
            <p style={{ color: 'var(--text-light)' }} className="text-sm">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <form className="mb-6">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm cursor-pointer"
                  style={{ color: 'var(--text-light)' }}
                >
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm hover:opacity-80 transition" style={{ color: 'var(--secondary)' }}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button title="Sign In" variant="primary" fullWidth={true} />
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button title="Google" variant="secondary" />
            <Button title="GitHub" variant="secondary" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p style={{ color: 'var(--text-light)' }} className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium hover:opacity-80 transition" style={{ color: 'var(--accent)' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
