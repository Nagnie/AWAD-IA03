import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen min-w-screen flex items-center bg-zinc-50 justify-center bg-background">
            <div className="w-full max-w-2xl px-4">
                <Card className="w-full px-4 py-8">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary rounded-2xl">
                                <Shield className="w-12 h-12 text-primary-foreground" />
                            </div>
                        </div>
                        <CardTitle className="text-4xl font-bold">
                            Tran Thao Ngan - 22120225
                        </CardTitle>
                        <CardDescription className="text-base">
                            IA03 – User Registration API with React Frontend
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="mb-4 text-lg">
                                Get started by creating an account or logging in.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Button variant="default" className="cursor-pointer" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                                <Button variant="outline" className="cursor-pointer" onClick={() => navigate('/login')}>
                                    Log In
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}