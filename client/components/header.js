import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    // if false = false, else Object
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    // filter out false in list
    .filter((linkConfig) => linkConfig)
    // map out remaining Objects in list
    .map(({ label, href }) => {
      return (
        <li
          className="nav-item"
          key={href}
        >
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link
        className="navbar-brand"
        href="/"
      >
        GitTix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
