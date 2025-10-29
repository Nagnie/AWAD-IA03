import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { registerUser, type RegisterData } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, LockIcon, Eye, EyeOff, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterData>();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            reset();
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        },
    });

    const onSubmit = (data: RegisterData) => {
        mutation.mutate(data);
    };

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <Card className="w-full px-4 py-8">
                    <CardHeader className="text-start">
                        <CardTitle className="font-bold text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your information to get started.
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

                            {mutation.isError && (
                                <div className="text-red-500 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <p>
                                        {mutation.error instanceof Error
                                            ? mutation.error.message
                                            : 'Registration failed. Please try again.'}
                                    </p>
                                </div>
                            )}

                            {mutation.isSuccess && (
                                <div className="text-green-600 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <p>Account created successfully! Redirecting to login...</p>
                                </div>
                            )}

                            <Button
                                variant="default"
                                type="submit"
                                className="w-full font-bold cursor-pointer"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && (
                                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                )}
                                Sign up
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="ms-1 text-foreground font-bold underline">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}