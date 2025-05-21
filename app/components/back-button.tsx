'use client';

import { Link } from 'react-router';

export default function BackButton() {
  return (
    <Link
      to="/"
      title="Go home"
      aria-label="Go to homepage"
      className="relative group overflow-hidden pl-4 font-mono h-14 flex space-x-6 items-center bg-white hover:bg-neutral-200 duration-300 rounded-xl w-full justify-between"
    >
      <span className="relative uppercase text-xs text-orange-600">
        Go home
      </span>
      <div
        aria-hidden="true"
        className="w-12 text-orange-600 transition duration-300 -translate-y-7 group-hover:translate-y-7"
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
    </Link>
  );
}
