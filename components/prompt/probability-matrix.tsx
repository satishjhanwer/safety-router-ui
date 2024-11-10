"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Model {
    name: string;
    probability: number;
}

interface ProbabilityMatrixProps {
    data: {
        models: Model[];
        selectedModel: string;
    };
}

export function ProbabilityMatrix({ data }: Readonly<ProbabilityMatrixProps>) {
    return (
        <Card className="mt-8">
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                <div className="space-y-4">
                    {data.models.map((model) => (
                        <div key={model.name} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">{model.name}</span>
                                <span>{Math.round(model.probability * 100)}%</span>
                            </div>
                            <Progress value={model.probability * 100} />
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <p className="text-sm">
                        Recommended Model: <span className="font-semibold">{data.selectedModel}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
} 