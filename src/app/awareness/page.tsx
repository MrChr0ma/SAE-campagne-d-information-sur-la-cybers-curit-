"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Database, Lock, UserX } from "lucide-react";
import { motion } from "framer-motion";

const topics = [
    {
        title: "Phishing",
        description: "Deceptive emails claiming to be from reputable sources in order to induce individuals to reveal personal information.",
        advice: "Check the sender's email address. Don't report suspicious emails. Verify requests for money or data.",
        icon: AlertTriangle,
        color: "text-amber-500",
    },
    {
        title: "Ransomware",
        description: "Malware that encrypts your files and demands payment for the decryption key.",
        advice: "Never download attachments from unknown senders. Keep your systems updated. Back up data regularly.",
        icon: Lock,
        color: "text-red-500",
    },
    {
        title: "Social Engineering",
        description: "Manipulating people into giving up confidential information.",
        advice: "Be skeptical of unsolicited phone calls or visits. Verify the identity of anyone asking for access.",
        icon: UserX,
        color: "text-purple-500",
    },
    {
        title: "Data Breaches",
        description: "Unauthorized access to confidential data.",
        advice: "Use strong, unique passwords. Enable 2FA. Report lost devices immediately.",
        icon: Database,
        color: "text-blue-500",
    },
    {
        title: "Malware",
        description: "Software designed to disrupt, damage, or gain unauthorized access to a computer system.",
        advice: "Use antivirus software. Don't use unknown USB drives. Avoid clicking suspicious ads.",
        icon: Shield,
        color: "text-green-500",
    },
];

export default function AwarenessPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Cyberattack Awareness</h1>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    Understand the common threats facing our hospital and how you can prevent them.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topics.map((topic, index) => (
                    <motion.div
                        key={topic.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-full bg-slate-100 ${topic.color}`}>
                                        <topic.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-1">What is it?</h4>
                                    <CardDescription className="text-base text-slate-600">
                                        {topic.description}
                                    </CardDescription>
                                </div>
                                <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                                    <h4 className="font-semibold text-primary mb-1 text-sm uppercase tracking-wide">
                                        Prevention Tip
                                    </h4>
                                    <p className="text-sm text-slate-700">
                                        {topic.advice}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
