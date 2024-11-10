import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PromptForm } from "@/components/prompt/prompt-form";
import { verify } from 'jsonwebtoken';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function Dashboard() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/');
    }

    try {
        verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        redirect('/');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">AI Safety Router</h1>
                    <LogoutButton />
                </div>
            </header>
            <main className="flex-1 container mx-auto px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <PromptForm />
                </div>
            </main>
        </div>
    );
} 