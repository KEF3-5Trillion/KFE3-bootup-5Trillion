import clsx from 'clsx';

export type TextareaColor = 'default' | 'error';

export interface TextareaProps {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  color?: TextareaColor;
  rows?: number;
}

const Textarea = ({
  label,
  disabled = false,
  className = '',
  color = 'default',
  rows = 8,
  ...props
}: TextareaProps) => {
  const textareaColor: Record<TextareaColor, string> = {
    default: 'border-border-base text-text-base',
    error: 'border-border-error text-text-error bg-bg-error',
  };

  const textareaClassName = clsx(
    'w-full p-2 px-5 rounded-[10px] text-sm outline-none transition focus:ring-1 border bg-bg-light resize-none',
    {
      'cursor-not-allowed text-text-info': disabled,
    },
    textareaColor[color],
  );

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={props.id} className="text-text-base text-sm font-bold">
          {label}
        </label>
      )}
      <textarea
        disabled={disabled}
        className={textareaClassName}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default Textarea;
