import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-sans tracking-[0.15em] uppercase transition-all duration-500'
  
  const variantClasses = {
    primary: 'bg-ink text-paper hover:bg-ink-800 hover:shadow-xl hover:-translate-y-px',
    secondary: 'border border-ink/10 text-ink hover:border-ink/30 hover:bg-ink/5',
    ghost: 'bg-transparent text-ink hover:text-ink-700',
  }
  
  const sizeClasses = {
    sm: 'px-6 py-3 text-[10px]',
    md: 'px-10 py-4 text-[11px]',
    lg: 'px-12 py-5 text-xs',
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
