"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ProbabilityMatrix } from "./probability-matrix";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AnalysisResponse {
    models: Array<{
        name: string;
        probability: number;
    }>;
    selectedModel: string;
    promptId: string;
}

export function PromptForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                // Handle unauthorized access
                if (response.status === 401) {
                    toast({
                        title: "Session Expired",
                        description: "Please login again",
                        variant: "destructive",
                    });
                    router.push('/');
                    return;
                }

                const error = await response.json();
                throw new Error(error.error || 'Failed to analyze prompt');
            }

            const data = await response.json();
            setAnalysis(data);
            toast({
                title: "Analysis Complete",
                description: `Prompt will be routed to ${data.selectedModel}`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to analyze prompt",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold">Enter your prompt</h2>
                <p className="text-sm text-gray-500">
                    We&apos;ll analyze your prompt and route it to the most appropriate AI model.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Enter your prompt here..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[200px]"
                        required
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !prompt.trim()}
                    >
                        {isLoading ? "Analyzing..." : "Analyze Prompt"}
                    </Button>
                </form>

                {analysis && <ProbabilityMatrix data={analysis} />}
            </CardContent>
        </Card>
    );
} 