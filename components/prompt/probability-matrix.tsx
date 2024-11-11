"use client";

import { Card, CardContent } from "@/components/ui/card";
import { upperCase } from 'lodash';

interface Model {
    name: string;
    probability: number;
}

interface ProbabilityMatrixProps {
    data: {
        models: Model[];
        selectedModel: string;
        confidence: number;
        response_time: string;
        bias_category: string;
        model_accuracy: number;
        reason: string;
        Note: string;
        modelResponse: string;
    };
}

export function ProbabilityMatrix({ data }: Readonly<ProbabilityMatrixProps>) {
    const getColorByScore = (score: number): string => {
        if (score >= 90) return "text-green-500";
        if (score >= 70) return "text-orange-500";
        return "text-red-500";
    };

    return (
        <Card className="max-w-9xl mx-auto">
            <CardContent className="pt-6" style={{ padding: '1.5rem 8px' }}>
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    {data.models.map((model) => (
                        <div key={model.name} className="relative w-28 h-32 flex flex-col items-center">
                            <div className="relative w-20 h-20">
                                <svg className="w-20 h-20 transform -rotate-90">
                                    {/* Background circle */}
                                    <circle
                                        className="text-gray-200 dark:text-gray-700"
                                        strokeWidth="6"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="32"
                                        cx="40"
                                        cy="40"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        className={`${getColorByScore(model.probability)}`}
                                        strokeWidth="6"
                                        strokeDasharray={`${2 * Math.PI * 32}`}
                                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - model.probability / 100)}`}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="32"
                                        cx="40"
                                        cy="40"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
                                    <span className="text-xl font-bold">{Math.round(model.probability)}</span>
                                    <span className="text-xs">%</span>
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className="text-sm font-medium break-words max-w-[112px] block">{model.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <p className="text-lg text-center">
                        Selected Model: <span className="font-semibold">{upperCase(data.selectedModel)}</span>
                    </p>
                </div>

                <div className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Response</h3>
                    <p className="font-medium">{data.modelResponse}</p>
                </div>
            </CardContent>
        </Card>
    );
}