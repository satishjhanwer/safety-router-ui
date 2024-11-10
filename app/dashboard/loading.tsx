import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-20" />
                </div>
            </header>
            <main className="flex-1 container mx-auto px-6 py-8">
                <div className="max-w-3xl mx-auto">
                    <Skeleton className="h-[400px] w-full" />
                </div>
            </main>
        </div>
    );
} 