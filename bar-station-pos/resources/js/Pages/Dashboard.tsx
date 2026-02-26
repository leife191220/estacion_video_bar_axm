import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: any) {
    const modules = [
        {
            title: 'Punto de Venta (POS)',
            description: 'Facturación rápida en barra, registro de pagos y propinas.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            color: 'from-emerald-500/20 to-teal-500/5',
            textColor: 'text-emerald-400',
            route: '#',
        },
        {
            title: 'Mesas y Comandas',
            description: 'Monitor de pedidos activos enviados por los meseros vía Telegram.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'from-blue-500/20 to-indigo-500/5',
            textColor: 'text-blue-400',
            route: '#',
        },
        {
            title: 'Carta y Recetario',
            description: 'Administra los productos del menú, precios y recetas de cócteles.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            color: 'from-purple-500/20 to-fuchsia-500/5',
            textColor: 'text-purple-400',
            route: '#',
        },
        {
            title: 'Inventario de Insumos',
            description: 'Control de botellas, onzas, ml, stock actual y proveedores.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            color: 'from-orange-500/20 to-red-500/5',
            textColor: 'text-orange-400',
            route: '#',
        },
        {
            title: 'Flujo de Caja',
            description: 'Cierres diarios, gastos operativos, pagos de nómina y rentabilidad.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'from-indigo-500/20 to-blue-500/5',
            textColor: 'text-indigo-400',
            route: '#',
        },
        {
            title: 'Operación y Checklists',
            description: 'Verificación de tareas de apertura, aseo, neveras y cierre.',
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
            color: 'from-pink-500/20 to-rose-500/5',
            textColor: 'text-pink-400',
            route: '#',
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-black leading-tight text-white tracking-tight">
                    Centro de Control <span className="text-indigo-400 font-medium">| La Estación Video Bar</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-slate-900 pb-20 pt-8 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">

                    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 p-8 shadow-xl relative">
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
                        <h3 className="text-xl font-bold text-white mb-2">¡Bienvenido al sistema, Admin! 👋</h3>
                        <p className="text-slate-400 max-w-2xl">
                            Desde aquí podrás tener control absoluto de tu negocio. Selecciona uno de los módulos a continuación para empezar a gestionar el inventario, las ventas o revisar el rendimiento del día.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module, index) => (
                            <Link
                                href={module.route}
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${module.color}`} />

                                <div className="relative z-10 flex-1">
                                    <div className={`mb-4 p-3 inline-block rounded-xl bg-slate-900/50 border border-slate-700 shadow-inner ${module.textColor}`}>
                                        {module.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                        {module.title}
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {module.description}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-6 flex items-center text-sm font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                                    Ingresar al módulo
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
