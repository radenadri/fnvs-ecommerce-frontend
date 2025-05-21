import Details from '~/pages/details';
import type { Route } from './+types/home';
import { useAuth } from '~/contexts/auth-context';
import { redirect, useNavigate } from 'react-router';
import { useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Details | FINVISE' },
    { name: 'description', content: 'Details page' },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return {
    slug: params.slug,
  };
}

export default function DetailsPage({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData as unknown as { slug: string };

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('user not found');
      navigate('/signin');
    }
  }, []);

  return <Details slug={slug} />;
}
