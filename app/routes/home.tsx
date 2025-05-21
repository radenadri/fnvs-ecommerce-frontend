import Home from '~/pages/home';

import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Home | FINVISE' },
    { name: 'description', content: 'For testing purpose' },
  ];
}

export default function HomePage() {
  return <Home />;
}
