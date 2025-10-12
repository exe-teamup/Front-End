import React from 'react';

export const IconBell: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <path d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5' />
    <path d='M13.73 21a2 2 0 01-3.46 0' />
  </svg>
);

export const IconUser: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </svg>
);

export const IconSearch: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <circle cx='11' cy='11' r='6' />
    <path d='M21 21l-4.35-4.35' />
  </svg>
);

export const IconHeart: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <path d='M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z' />
  </svg>
);

// Add more icons as needed following the same pattern
