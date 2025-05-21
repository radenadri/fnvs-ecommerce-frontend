import BackButton from './back-button';

export interface NotFoundProps {
  message: string;
  details: string;
  stack?: string;
}

export default function NotFound({
  message,
  details,
  stack,
  ...props
}: NotFoundProps) {
  return (
    <section {...props}>
      <div className="flex flex-col gap-12 h-full justify-between p-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-lg text-neutral-600 font-mono tracking-tight text-balance">
            {message}
          </h1>
          <p className="text-sm text-balance text-neutral-500">{details}</p>
          <div className="gap-2 flex flex-col h-full justify-end mt-12">
            <BackButton />
          </div>
        </div>
        {/* {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )} */}
      </div>
    </section>
  );
}
