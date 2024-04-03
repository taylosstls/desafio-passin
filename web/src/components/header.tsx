import Logo from '../assets/passin-logo.svg'

export function Header() {
    return (
        <header className='flex items-center w-full gap-5 py-8 px-2'>
            <img src={Logo} alt='Pass.In' />

            <nav className='flex items-center gap-5'>
                <a href='' className='font-medium text-sm text-zinc-300'>Eventos</a>
                <a href='' className='font-medium text-sm'>Participantes</a>
            </nav>
        </header>
    )
}