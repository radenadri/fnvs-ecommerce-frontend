import Details from '~/pages/details';
import type { Route } from './+types/home';

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

  return <Details slug={slug} />;
}
