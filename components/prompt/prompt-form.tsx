"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ProbabilityMatrix } from "./probability-matrix";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DetailedAnalysis } from "./detailed-analysis";

interface AnalysisResponse {
    models: Array<{
        name: string;
        probability: number;
    }>;
    confidence: number;
    response_time: string;
    bias_category: string;
    model_accuracy: number;
    reason: string;
    Note: string;
    modelResponse: string;
    selectedModel: string;
    promptId: string;
}

export function PromptForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (analysis) {
            const timer = setTimeout(() => {
                setShowDetails(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [analysis]);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* First Card - Form and Probability Matrix */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-semibold">Enter your prompt</h2>
                    <p className="text-sm text-gray-500">
                        We&apos;ll analyze your prompt and route it to the most appropriate AI model.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
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
                            className="w-full mt-4"
                            disabled={isLoading || !prompt.trim()}
                        >
                            {isLoading ? "Analyzing..." : "Analyze Prompt"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Second Card - Detailed Analysis */}
            {analysis && (
                <DetailedAnalysis
                    data={analysis}
                    showDetails={showDetails}
                />
            )}
            {analysis && (
                <ProbabilityMatrix data={analysis} />
            )}
        </div>
    );
} 