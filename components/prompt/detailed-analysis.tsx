"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface DetailedAnalysisProps {
    data: {
        confidence: number;
        bias_category: string;
        response_time: string;
        model_accuracy: number;
        reason: string;
        Note: string;
        modelResponse: string;
    };
    showDetails: boolean;
}

export function DetailedAnalysis({ data, showDetails }: DetailedAnalysisProps) {
    if (!showDetails) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium">{data.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Bias Category:</span>
                        <span className="font-medium">{data.bias_category}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{data.response_time}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Model Accuracy:</span>
                        <span className="font-medium">{data.model_accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Reason:</span>
                        <p className="font-medium">{data.reason}</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Note:</span>
                        <p className="font-medium">{data.Note}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 