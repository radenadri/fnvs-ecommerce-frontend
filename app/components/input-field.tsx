import clsx from 'clsx';

interface IInputField {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
  ariaLabel: string;
}

type InputFieldProps = React.ComponentProps<'input'> & IInputField;

export default function InputField({
  type,
  id,
  name,
  placeholder,
  autoComplete = 'off',
  ariaLabel,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="sr-only">
        {ariaLabel}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={clsx(
          'flex-auto rounded-xl font-mono border-0 h-14 text-xs uppercase duration-300 px-3.5 py-2 text-neutral-500 ring-1 ring-inset ring-white placeholder:text-neutral-400 focus:ring-2 focus:outline-none focus:ring-inset focus:ring-orange-600 focus-visible:ring-orange-600 bg-neutral-100 w-full',
          className
        )}
        {...props}
      />
    </div>
  );
}
