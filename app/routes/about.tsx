import type { Route } from './+types/home';
import About from '~/pages/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About | FINVISE' },
    { name: 'description', content: 'About page' },
  ];
}

export default function AboutPage() {
  return <About />;
}
