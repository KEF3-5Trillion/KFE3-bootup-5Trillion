import React, { useState } from 'react';
import clsx from 'clsx';
import EyeIcon from '@ui/icons/EyeIcon';
import EyeOffIcon from '@ui/icons/EyeOffIcon';
import LockIcon from '@ui/icons/LockIcon';

export type InputType = 'text' | 'password' | 'number';
export type InputColor = 'default' | 'error';

export interface InputProps {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  type?: InputType;
  icon?: React.ReactNode;
  unit?: string;
  name?: string;
  autoComplete?: string;
  maxLength?: number;
  color?: InputColor;
}

const Input = ({
  label,
  disabled = false,
  className = '',
  type = 'text',
  icon,
  unit,
  color = 'default',
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && !showPassword ? 'password' : 'text';
  const hasIcon = !!icon || isPassword;

  const inputColor: Record<InputColor, string> = {
    default: 'border-border-base text-text-base',
    error: 'border-border-error text-text-error bg-bg-error',
  };

  const inputClassName = clsx(
    'w-full p-2 px-5 rounded-[30px] text-sm outline-none transition focus:ring-1 border',
    {
      'pl-10': hasIcon,
      'pr-10': isPassword,
      'bg-bg-light cursor-not-allowed text-text-info': disabled,
    },
    inputColor[color],
  );

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={props.id} className="text-text-base text-sm font-bold">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <div className="relative w-full">
          {hasIcon && (
            <span
              className={clsx(
                'absolute top-1/2 left-3 flex -translate-y-1/2 items-center',
                inputColor[color],
              )}
            >
              {icon ?? <LockIcon />}
            </span>
          )}

          <input
            type={inputType}
            disabled={disabled}
            className={inputClassName}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className={clsx(
                'absolute top-1/2 right-3 flex -translate-y-1/2 items-center hover:opacity-80',
                inputColor[color],
              )}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>

        {unit && (
          <span
            className={clsx(
              'self-end text-sm whitespace-nowrap',
              inputColor[color],
            )}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
