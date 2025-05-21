import { Outlet } from 'react-router';
import Footer from '~/components/footer';
import Header from '~/components/header';

export default function MainLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
