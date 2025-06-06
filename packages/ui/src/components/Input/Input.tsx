import { useState } from 'react';
import EyeIcon from '@ui/icons/EyeIcon';
import EyeOffIcon from '@ui/icons/EyeOffIcon';
import LockIcon from '@ui/icons/LockIcon';

export type InputType = 'text' | 'password' | 'number';
export type InputColor = 'default' | 'danger';

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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  disabled = false,
  className = '',
  type = 'text',
  icon,
  unit,
  color = 'default',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && !showPassword ? 'password' : 'text';
  const hasIcon = !!icon || isPassword;

  const inputColor: Record<InputColor, string> = {
    default: 'border-border-base text-text-base',
    danger: 'border-pink-600 text-pink-600 bg-pink-50 focus:ring-border-danger',
  };

  const inputClassName = [
    'w-full p-2 px-5 rounded-[30px] text-sm outline-none transition focus:ring-1 border',
    hasIcon && 'pl-10',
    isPassword && 'pr-10',
    disabled && 'bg-gray-100 cursor-not-allowed text-gray-500',
    inputColor[color],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={props.id} className="text-sm font-bold text-text-base">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        {/* input + 내부 아이콘 */}
        <div className="relative w-full">
          {hasIcon && (
            <span
              className={`absolute top-1/2 -translate-y-1/2 left-3 flex items-center ${inputColor[color]}`}
            >
              {icon ?? <LockIcon />}
            </span>
          )}

          <input type={inputType} disabled={disabled} className={inputClassName} {...props} />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center ${inputColor[color]} hover:opacity-80`}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>

        {/* 단위는 input 외부에 표시 */}
        {unit && (
          <span className={`text-sm whitespace-nowrap self-end ${inputColor[color]}`}>{unit}</span>
        )}
      </div>
    </div>
  );
};
