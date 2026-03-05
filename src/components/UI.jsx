import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = 'disabled:from-gray-400 disabled:to-gray-500 disabled:transform-none disabled:cursor-not-allowed';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export const Input = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]} ${className}`}></div>
  );
};