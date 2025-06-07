import { cn } from '../../lib/utils';

export interface ButtonProps {
  style?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  label: string;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

const Button = ({
  style = 'primary',
  size = 'md',
  width,
  label,
  onClick,
  className,
  isDisabled = false,
}: ButtonProps) => {
  const heightClass: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'h-[35px]',
    md: 'h-[44px]',
    lg: 'h-[52px]',
  };

  const styleClass: Record<
    'primary' | 'secondary' | 'success' | 'danger' | 'neutral',
    string
  > = {
    primary: 'bg-bg-primary text-text-inverse',
    secondary: 'bg-bg-secondary text-text-inverse',
    success: 'bg-bg-success text-text-inverse',
    danger: 'bg-bg-danger text-text-inverse',
    neutral: 'bg-bg-neutral text-text-inverse',
  };

  const disabledEffects = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-[8px] rounded-full px-[24px] text-center font-["Noto_Sans"] text-[14px] leading-[22px] font-semibold',
        heightClass[size],
        styleClass[style],
        isDisabled && disabledEffects,
        className,
      )}
      style={{
        ...(width ? { width } : {}),
      }}
    >
      {label}
    </button>
  );
};

export default Button;
