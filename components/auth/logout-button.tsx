'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect to home page
                router.push('/');
                router.refresh();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-sm"
        >
            Logout
        </Button>
    );
} 