import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { verify } from 'jsonwebtoken';
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default async function Login() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // Check if user is authenticated
    if (token) {
        try {
            verify(token, process.env.JWT_SECRET!);
            redirect("/dashboard");
        } catch (error) {
            console.error(error);
            // Token is invalid, continue to login page
            cookieStore.delete('token');
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-6 py-4">
                    <Link href="/" className="text-xl font-bold">
                        AI Safety Router
                    </Link>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-6 py-8">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
                    <LoginForm />
                    <div className="mt-4 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
} 