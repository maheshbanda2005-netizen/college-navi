import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
