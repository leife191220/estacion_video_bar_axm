import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex bg-slate-900 font-sans text-slate-300">
            <Head title="Iniciar Sesión" />

            {/* Panel Izquierdo - Visual / Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-800 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-800/40 z-10" />
                <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[100px] -top-20 -left-20" />
                <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] bottom-10 right-10" />

                <div className="relative z-20 text-center px-12">
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tight">MarktSoft <span className="text-indigo-400">POS</span></h1>
                    <p className="text-lg text-slate-300 max-w-md mx-auto leading-relaxed">
                        Sistema de gestión inteligente. Controla tus ventas, inventario y flujo de caja en tiempo real.
                    </p>
                </div>
            </div>

            {/* Panel Derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
                <div className="w-full max-w-md space-y-8 relative z-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
                        <p className="text-slate-400 text-sm">Ingresa tus credenciales para acceder al sistema.</p>
                    </div>

                    {status && <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-400">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Correo Electrónico" className="text-slate-300" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" className="text-slate-300" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-red-400" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 rounded"
                                />
                                <span className="text-sm text-slate-400 select-none">Recordarme</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-3.5 bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-indigo-500/25"
                            disabled={processing}
                        >
                            {processing ? 'INICIANDO...' : 'INICIAR SESIÓN'}
                        </PrimaryButton>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-8">
                        ¿No tienes una cuenta? <Link href={route('register')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Regístrate aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
