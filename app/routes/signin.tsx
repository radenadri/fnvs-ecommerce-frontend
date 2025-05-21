import type { Route } from './+types/home';
import SignIn from '~/pages/signin';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Signin | FINVISE' },
    { name: 'description', content: 'Signin page' },
  ];
}

export default function SignInPage() {
  return <SignIn />;
}
