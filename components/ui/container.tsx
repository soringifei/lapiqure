import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export default function Container({ 
  children, 
  className = '',
  size = 'lg'
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-none',
  }
  
  return (
    <div className={`${sizeClasses[size]} mx-auto px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
