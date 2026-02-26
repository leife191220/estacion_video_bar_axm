import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex bg-slate-900 font-sans text-slate-300">
            <Head title="Registro" />

            {/* Panel Izquierdo - Visual / Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-800 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/40 to-indigo-600/20 z-10" />
                <div className="absolute w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] top-20 right-0" />
                <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[80px] -bottom-20 -left-10" />

                <div className="relative z-20 text-center px-12">
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Unete al <span className="text-purple-400">Futuro</span></h1>
                    <p className="text-lg text-slate-300 max-w-md mx-auto leading-relaxed">
                        Crea tu cuenta de administrador y empieza a operar tu negocio con la mejor tecnología.
                    </p>
                </div>
            </div>

            {/* Panel Derecho - Formulario */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-y-auto">
                <div className="w-full max-w-md space-y-8 relative z-20 py-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
                        <p className="text-slate-400 text-sm">Completa tus datos para configurar tu nuevo espacio de trabajo.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre Completo" className="text-slate-300" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2 text-red-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Correo Electrónico" className="text-slate-300" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2 text-red-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" className="text-slate-300" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-2 block w-full bg-slate-800/50 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 text-red-400" />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-3.5 mt-4 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 active:bg-purple-700 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg shadow-purple-500/25"
                            disabled={processing}
                        >
                            {processing ? 'REGISTRANDO...' : 'REGISTRARSE'}
                        </PrimaryButton>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-8">
                        ¿Ya tienes una cuenta? <Link href={route('login')} className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Inicia sesión aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
