"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Info, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

// Score from 0 to 5: length >= 8, length >= 12, mixed case, digits, symbols
const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
};

// Very rough estimation, purely for educational effect
const getCrackTime = (pass: string) => {
    const length = pass.length;
    if (length < 6) return "Instantly";
    if (length < 8) return "Seconds";
    if (length < 10) return "Hours";
    if (length < 12) return "Weeks";
    if (length < 14) return "Years";
    return "Centuries";
};

export default function PasswordPage() {
    const [password, setPassword] = useState("");
    const strength = getStrength(password);
    const crackTime = getCrackTime(password);

    const getColor = (score: number) => {
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score <= 3) return "bg-yellow-500";
        if (score <= 4) return "bg-green-500";
        return "bg-emerald-600";
    };

    const getLabel = (score: number) => {
        if (score <= 1) return "Very Weak";
        if (score <= 2) return "Weak";
        if (score <= 3) return "Moderate";
        if (score <= 4) return "Strong";
        return "Very Strong";
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900">Password Strength Checker</h1>
                <p className="mt-4 text-slate-600">
                    Test your password concepts here. <br />
                    <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                        Do NOT enter your real password!
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Interactive Checker */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Test a Password</CardTitle>
                        <CardDescription>Enter a phrase to see how long it would take to crack.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Type a password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-lg h-12"
                                />
                            </div>
                        </div>

                        {/* Strength Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Strength: <span className={getColor(strength).replace("bg-", "text-")}>{getLabel(strength)}</span></span>
                                <span>Crack Time: {crackTime}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getColor(strength)}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(strength / 5) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            </div>
                        </div>

                        {/* Feedback Checks */}
                        <div className="space-y-2 pt-4">
                            <h4 className="text-sm font-semibold text-slate-900">Requirements:</h4>
                            <ul className="space-y-1">
                                <li className={`flex items-center text-sm ${password.length >= 12 ? "text-green-600" : "text-slate-500"}`}>
                                    {password.length >= 12 ? <Check className="w-4 h-4 mr-2" /> : <Info className="w-4 h-4 mr-2" />}
                                    Length (12+ characters)
                                </li>
                                <li className={`flex items-center text-sm ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-600" : "text-slate-500"}`}>
                                    {/[A-Z]/.test(password) && /[a-z]/.test(password) ? <Check className="w-4 h-4 mr-2" /> : <Info className="w-4 h-4 mr-2" />}
                                    Mixed Case (A-z)
                                </li>
                                <li className={`flex items-center text-sm ${/[0-9]/.test(password) ? "text-green-600" : "text-slate-500"}`}>
                                    {/[0-9]/.test(password) ? <Check className="w-4 h-4 mr-2" /> : <Info className="w-4 h-4 mr-2" />}
                                    Numbers (0-9)
                                </li>
                                <li className={`flex items-center text-sm ${/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-slate-500"}`}>
                                    {/[^A-Za-z0-9]/.test(password) ? <Check className="w-4 h-4 mr-2" /> : <Info className="w-4 h-4 mr-2" />}
                                    Symbols (!@#)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" onClick={() => setPassword("")} className="w-full">
                            <RefreshCw className="w-4 h-4 mr-2" /> Clear / Try Again
                        </Button>
                    </CardFooter>
                </Card>

                {/* Educational Content */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Best Practices</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-primary">Length is King</h4>
                                <p className="text-sm text-slate-600">
                                    A long passphrase like <code>correct-horse-battery-staple</code> is easier to remember and harder to crack than <code>Tr0ubb4dory!</code>.
                                </p>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-primary">Don&apos;t Reuse Passwords</h4>
                                <p className="text-sm text-slate-600">
                                    If one site gets breached, hackers will try your password on every other site (Email, Banking, Hospital System).
                                </p>
                            </div>
                            <div className="border-t pt-4">
                                <h4 className="font-semibold text-primary">Use a Password Manager</h4>
                                <p className="text-sm text-slate-600">
                                    Tools like LastPass, 1Password, or Bitwarden generate and store unique passwords for you. You only need to remember one strong Master Password.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
