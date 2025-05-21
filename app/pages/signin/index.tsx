import InputField from '~/components/input-field';
import { useAuth } from '~/contexts/auth-context';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import clsx from 'clsx';

interface ILoginFormInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const { login, isLoading } = useAuth();
  const { register, handleSubmit, formState } = useForm<ILoginFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    try {
      await login(data.email, data.password);

      navigate('/');
    } catch (error) {
      console.error('Failed to login, error :', { error });
    }
  };

  return (
    <section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
        <div className="flex flex-col h-full">
          <h1 className="text-lg text-neutral-600 font-mono tracking-tight text-balance">
            Sign In
          </h1>
          <p className="text-sm text-balance text-neutral-500 mt-2">
            Sign in to access the product details page. Use the following
            credentials to sign in:
          </p>
          <ul className="text-sm text-balance text-neutral-500 mt-2">
            <li>Email: johndoe@gmail.com</li>
            <li>Password: test1234</li>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-2 bg-white p-4 rounded-xl"
        >
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
            <InputField
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              autoComplete="email"
              ariaLabel="Email"
              {...register('email', { required: true, min: 5 })}
            />
            {formState.errors.email && (
              <span className="text-neutral-500 col-span-2 font-mono text-xs">
                Email are required and length must be min 5 characters.
              </span>
            )}
            <InputField
              type="password"
              id="password"
              placeholder="********"
              ariaLabel="Password"
              {...register('password', { required: true, min: 8 })}
            />
            {formState.errors.password && (
              <span className="text-neutral-500 col-span-2 font-mono text-xs">
                Password are required and length must be min 8 characters.
              </span>
            )}
          </div>
          <div className="mt-2 text-right">
            <SubmitButton isLoading={isLoading} />
          </div>
        </form>
      </div>
    </section>
  );
}
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      type="submit"
      title="Submit"
      aria-label="Submit"
      disabled={isLoading}
      className={clsx(
        'relative group cursor-pointer overflow-hidden pl-4 font-mono h-14 flex space-x-6 items-center bg-orange-500 hover:bg-black duration-300 rounded-xl w-full justify-between',
        isLoading && 'opacity-50 disabled:cursor-not-allowed'
      )}
    >
      <span className="relative uppercase text-xs text-white">Sign me in</span>
      <div
        aria-hidden="true"
        className="w-12 text-white transition duration-300 -translate-y-7 group-hover:translate-y-7"
      >
        <div className="h-14 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 m-auto fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div className="h-14 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 m-auto fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
