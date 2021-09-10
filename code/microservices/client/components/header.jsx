import Link from 'next/link';

const Header = ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Criar conta', href: '/account/signup' },
        !currentUser && { label: 'Login', href: '/account/signin' },
        currentUser && { label: 'Sair', href: '/account/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return <li className="nav-item" key={href}>
                <Link href={href}>
                    <a className="nav-link">{label}</a>
                </Link>
            </li>
        });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">euvoudoar</a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    );
};

export default Header;