'use client';

import ornament from '~/assets/ornament.svg';

export default function Footer() {
  return (
    <footer className="py-2">
      <div className="p-4 xl:pb-0 bg-[white] overflow-hidden rounded-xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col h-full justify-between xl:pb-2 order-last md:order-none">
            <div></div>
            <p className="text-xs leading-5 text-neutral-400 text-pretty font-mono uppercase">
              Finvise
            </p>
          </div>
          <img
            src={ornament}
            alt="logo"
            className="size-12 md:size-64 md:mx-auto fill-orange-600 md:-mb-32 md:mt-12 order-first md:order-none"
          />
          <div className="flex flex-col h-full justify-between md:text-right xl:pb-2">
            <div></div>
            <p className="text-xs leading-5 text-neutral-400 text-pretty font-mono mt-12 uppercase">
              FOR TESTING PURPOSE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
