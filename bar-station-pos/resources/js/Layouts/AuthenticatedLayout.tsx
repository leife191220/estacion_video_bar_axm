import { useState, PropsWithChildren, ReactNode } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }: PropsWithChildren<{ user: any, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-900 font-sans">
            {/* Barra de Navegación Principal */}
            <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')}>
                                    <div className="text-xl font-black text-white tracking-tight">
                                        MarktSoft <span className="text-indigo-400">POS</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Links de Escritorio */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* Menú de Usuario (Perfil/Logout) */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white hover:bg-slate-700 hover:border-slate-600 focus:outline-none"
                                            >
                                                {user?.name}

                                                <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-slate-800 border border-slate-700 shadow-xl shadow-black/50 rounded-xl mt-2">
                                        <Dropdown.Link href={route('profile.edit')} className="text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Botón Menú Móvil */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition duration-150 hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú Móvil Desplegado */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900/95 border-b border-slate-800 backdrop-blur-xl absolute w-full'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-slate-800 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">{user?.name}</div>
                            <div className="text-sm font-medium text-slate-400">{user?.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button">Cerrar Sesión</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header / Título de la página */}
            {header && (
                <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800/50 relative z-40">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Contenido Principal */}
            <main className="relative z-10">{children}</main>
        </div>
    );
}
