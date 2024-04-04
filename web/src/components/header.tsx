import Logo from '../assets/passin-logo.svg'
import { NavLink } from './nav-link'

export function Header() {
    return (
        <header className='flex items-center w-full gap-5 py-8 px-2'>
            <img src={Logo} alt='Pass.In' />

            <nav className='flex items-center gap-5'>
                <NavLink href='/eventos'>Eventos</NavLink>
                <NavLink href='/participantes'>Participantes</NavLink>
            </nav>
        </header>
    )
}