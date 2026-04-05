import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm border border-transparent',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-slate-800 hover:bg-slate-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm border border-transparent'
};

const sizes = {
    sm: 'py-2 px-5 text-sm',
    md: 'py-3 px-7 text-base',
    lg: 'py-4 px-10 text-lg font-bold'
};

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    icon: Icon,
    ...props
}, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'relative inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {!isLoading && Icon && <Icon className="w-5 h-5" />}
                {children}
            </div>
        </motion.button>
    );
});

Button.displayName = 'Button';
export default Button;
