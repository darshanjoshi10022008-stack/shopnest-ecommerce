import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base = "inline-flex items-center justify-center font-medium transition cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed select-none";

  let sizeStyle = "px-4 py-2 text-xs";
  if (size === 'sm') sizeStyle = "px-3 py-1.5 text-xs";
  if (size === 'lg') sizeStyle = "px-6 py-2.5 text-sm";

  let variantStyle = "bg-neutral-900 hover:bg-neutral-800 text-white";
  if (variant === 'secondary') {
    variantStyle = "bg-neutral-100 hover:bg-neutral-200 text-neutral-900";
  } else if (variant === 'outline') {
    variantStyle = "bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300";
  } else if (variant === 'danger') {
    variantStyle = "bg-red-600 hover:bg-red-700 text-white";
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizeStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-1.5' : ''}`} />}
      {children}
    </button>
  );
}
