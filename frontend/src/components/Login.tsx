import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, LockIcon, Eye, EyeOff, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const onSubmit = (data: LoginData) => {
        setIsLoading(true);
        setError('');
        toast.success("Login Successful! Redirecting...");

        setTimeout(() => {
            console.log('Login attempt:', data);
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <Card className="w-full px-4 py-8">
                    <CardHeader className="text-start">
                        <CardTitle className="font-bold text-2xl">Log in to your account</CardTitle>
                        <CardDescription>
                            Welcome back! Please sign in to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-start">
                            <div>
                                <Label htmlFor="email" className="font-bold text-base mb-2">Email</Label>
                                <div className="relative mb-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail size={16} />
                                    </span>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: 'Invalid email format',
                                            },
                                        })}
                                        placeholder="Your email"
                                        className={`ps-9 ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="password" className="font-bold text-base mb-2">Password</Label>
                                <div className="relative mb-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <LockIcon size={16} />
                                    </span>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        })}
                                        className={`ps-9 pe-9 ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </span>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            {error && (
                                <div className="text-red-500 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <Button
                                variant="default"
                                type="submit"
                                className="w-full font-bold cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                )}
                                Log in
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/signup" className="ms-1 text-foreground font-bold underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}