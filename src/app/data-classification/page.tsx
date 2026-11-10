"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Globe, Lock, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "Public" | "Internal" | "Confidential";

type Document = {
    id: string;
    name: string;
    description: string;
    category: Category;
    explanation: string;
};

const documents: Document[] = [
    {
        id: "1",
        name: "Patient_Report_J.Doe.pdf",
        description: "Medical diagnosis and treatment plan for John Doe.",
        category: "Confidential",
        explanation: "Contains Protected Health Information (PHI). Must be strictly controlled.",
    },
    {
        id: "2",
        name: "Cafeteria_Menu_Spring.pdf",
        description: "Weekly lunch menu and pricing.",
        category: "Public",
        explanation: "General information intended for everyone, including visitors.",
    },
    {
        id: "3",
        name: "Staff_Phone_Directory.xlsx",
        description: "List of internal extensions and department heads.",
        category: "Internal",
        explanation: "Not for public release, but accessible to all employees.",
    },
    {
        id: "4",
        name: "HR_Salary_Review_2026.docx",
        description: "Spreadsheet containing staff salary adjustments.",
        category: "Confidential",
        explanation: "Sensitive personal data (PII). Access limited to specific HR roles.",
    },
    {
        id: "5",
        name: "Hospital_Visitor_Guide.pdf",
        description: "Map and visiting hours brochure.",
        category: "Public",
        explanation: "Marketing material designed for public distribution.",
    },
    {
        id: "6",
        name: "Q3_Budget_Draft.pptx",
        description: "Preliminary budget presentation for board meeting.",
        category: "Internal",
        explanation: "Business strategy documents are Internal until officially released.",
    },
];

export default function DataGamePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

    const currentDoc = documents[currentIndex];

    const handleChoice = (choice: Category) => {
        const isCorrect = choice === currentDoc.category;

        if (isCorrect) {
            setScore(score + 100 + (streak * 10)); // Bonus for streaks
            setStreak(streak + 1);
            setFeedback({ correct: true, message: "Correct! " + currentDoc.explanation });
        } else {
            setStreak(0);
            setFeedback({
                correct: false,
                message: `Incorrect. This is ${currentDoc.category}. ${currentDoc.explanation}`
            });
        }

        // Auto advance after short delay? No, let user read feedback.
    };

    const nextDoc = () => {
        setFeedback(null);
        if (currentIndex + 1 < documents.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const resetGame = () => {
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setIsCompleted(false);
        setFeedback(null);
    };

    if (isCompleted) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Training Complete!</CardTitle>
                        <CardDescription>You have sorted all the documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="py-8">
                            <div className="text-6xl font-black text-primary mb-4">{score}</div>
                            <p className="text-xl text-slate-600">Total Score</p>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button onClick={resetGame} size="lg">
                            <RotateCcw className="mr-2 h-4 w-4" /> Play Again
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Data Classification</h1>
                    <p className="text-slate-500">Sort the files into the correct security level.</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">Score</div>
                    <div className="text-2xl font-bold text-primary">{score}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-8">
                {/* Main Game Area */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!feedback ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full"
                            >
                                <Card className="h-full flex flex-col justify-center items-center p-8 border-2 border-slate-200 border-dashed">
                                    <div className="bg-slate-100 p-6 rounded-full mb-6">
                                        <FileText className="h-16 w-16 text-slate-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{currentDoc.name}</h3>
                                    <p className="text-lg text-slate-500 text-center max-w-md">{currentDoc.description}</p>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full"
                            >
                                <Card className={cn(
                                    "h-full flex flex-col justify-center items-center p-8 border-2",
                                    feedback.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                )}>
                                    <div className={cn(
                                        "p-6 rounded-full mb-6",
                                        feedback.correct ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                    )}>
                                        {feedback.correct ? <CheckCircle className="h-16 w-16" /> : <XCircle className="h-16 w-16" />}
                                    </div>
                                    <h3 className={cn("text-2xl font-bold mb-2 text-center", feedback.correct ? "text-green-800" : "text-red-800")}>
                                        {feedback.correct ? "Correct!" : "Incorrect"}
                                    </h3>
                                    <p className="text-lg text-slate-700 text-center max-w-md mb-8">
                                        {feedback.message}
                                    </p>
                                    <Button onClick={nextDoc} size="lg" className={feedback.correct ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
                                        Next File <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    {/* Buttons are disabled during feedback to prevent double submission */}
                    <Button
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                        onClick={() => handleChoice("Public")}
                        disabled={!!feedback}
                    >
                        <Globe className="h-6 w-6" />
                        <span className="font-semibold">Public</span>
                        <span className="text-xs font-normal opacity-70">Low Risk</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                        onClick={() => handleChoice("Internal")}
                        disabled={!!feedback}
                    >
                        <Shield className="h-6 w-6" />
                        <span className="font-semibold">Internal</span>
                        <span className="text-xs font-normal opacity-70">Medium Risk</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                        onClick={() => handleChoice("Confidential")}
                        disabled={!!feedback}
                    >
                        <Lock className="h-6 w-6" />
                        <span className="font-semibold">Confidential</span>
                        <span className="text-xs font-normal opacity-70">High Security</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
