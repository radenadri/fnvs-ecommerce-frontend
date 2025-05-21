import { Link, NavLink } from 'react-router';
import { useAuth } from '~/contexts/auth-context';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="relative flex w-full bg-gray-100 items-center flex-row pb-4 mx-auto text-xs text-neutral-600 font-mono tracking-tight uppercase">
        <Link
          to="/"
          title="Finvise home page"
          aria-label="home page"
          className="hover:text-orange-600"
        >
          Finvise
        </Link>
        <nav className="items-center flex-grow flex justify-end flex-row ml-auto gap-4">
          {!user && (
            <NavLink
              to="/signin"
              title="Sign in page"
              aria-label="sign in page"
              className="hover:text-orange-600 lg:ml-auto"
            >
              Sign In
            </NavLink>
          )}
          {user && (
            <a
              role="button"
              title="My profile"
              aria-label="My profile"
              className="hover:text-orange-600 lg:ml-auto"
              onClick={(event) => {
                event.preventDefault();

                alert('Hello, ' + user.name + '!');
              }}
            >
              Howdy, {user.name}
            </a>
          )}
          {user && (
            <a
              role="button"
              href="#"
              title="Sign out"
              aria-label="sign out"
              onClick={(event) => {
                event.preventDefault();

                const confirmed = window.confirm(
                  'Are you sure you want to sign out?'
                );
                if (confirmed) {
                  logout();
                }
              }}
              className="hover:text-orange-600"
            >
              Sign out
            </a>
          )}
          <NavLink
            to="/about"
            title="About page"
            aria-label="about page"
            className="hover:text-orange-600"
          >
            About
          </NavLink>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://radenadri.xyz"
            title="to my website"
            aria-label="to my website"
            className="hover:text-orange-600"
          >
            Creator
          </a>
        </nav>
      </div>
    </header>
  );
}
