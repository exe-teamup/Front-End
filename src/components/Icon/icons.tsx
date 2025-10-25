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

// Dashboard & Admin Icons
export const IconLayoutDashboard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <rect x='3' y='3' width='7' height='7' />
    <rect x='14' y='3' width='7' height='7' />
    <rect x='14' y='14' width='7' height='7' />
    <rect x='3' y='14' width='7' height='7' />
  </svg>
);

export const IconUsers: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' />
  </svg>
);

export const IconList: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <line x1='8' y1='6' x2='21' y2='6' />
    <line x1='8' y1='12' x2='21' y2='12' />
    <line x1='8' y1='18' x2='21' y2='18' />
    <line x1='3' y1='6' x2='3.01' y2='6' />
    <line x1='3' y1='12' x2='3.01' y2='12' />
    <line x1='3' y1='18' x2='3.01' y2='18' />
  </svg>
);

export const IconBarChart: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <line x1='12' y1='20' x2='12' y2='10' />
    <line x1='18' y1='20' x2='18' y2='4' />
    <line x1='6' y1='20' x2='6' y2='16' />
  </svg>
);

export const IconFolder: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <path d='M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' />
  </svg>
);

export const IconDatabase: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <ellipse cx='12' cy='5' rx='9' ry='3' />
    <path d='M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' />
    <path d='M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' />
  </svg>
);

export const IconClipboardList: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <rect x='8' y='2' width='8' height='4' rx='1' ry='1' />
    <path d='M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2' />
    <line x1='9' y1='12' x2='15' y2='12' />
    <line x1='9' y1='16' x2='15' y2='16' />
  </svg>
);

export const IconArrowUpCircle: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    className={className}
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M16 12l-4-4-4 4M12 16V8' />
  </svg>
);

// Add more icons as needed following the same pattern
