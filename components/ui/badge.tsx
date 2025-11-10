import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'subtle'
  className?: string
}

export default function Badge({ 
  children, 
  variant = 'default',
  className = '' 
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-ink text-paper',
    outline: 'bg-transparent border border-ink text-ink',
    subtle: 'bg-sand text-ink',
  }
  
  return (
    <span 
      className={`
        inline-flex items-center px-3 py-1 
        text-xs tracking-editorial uppercase font-sans
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </span>
  )
}
