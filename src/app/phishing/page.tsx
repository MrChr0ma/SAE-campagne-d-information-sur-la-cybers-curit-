"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ShieldAlert, CheckCircle, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Email = {
    id: string;
    senderName: string;
    senderEmail: string;
    subject: string;
    body: React.ReactNode;
    isPhishing: boolean;
    explanation: string;
    date: string;
};

const emails: Email[] = [
    {
        id: "1",
        senderName: "Hospital CEO",
        senderEmail: "ceo.securehealth@gmail.com", // Suspicious domain
        subject: "URGENT: Outstanding Vendor Payment",
        body: (
            <div className="space-y-4">
                <p>Hi team,</p>
                <p>I&apos;m currently in a meeting and can&apos;t take calls. We have an overdue invoice from a critical vendor that needs to be paid <strong>immediately</strong> to ensure we receive our medical supplies tomorrow.</p>
                <p>Please process the attached invoice for $45,000 via wire transfer to the account listed.</p>
                <p>Do not wait for my approval script, I will sign it later. <a href="#" className="text-blue-600 underline hover:bg-red-100 p-1 rounded transition-colors" title="http://suspicious-bank-transfer.com">Click here to view invoice</a>.</p>
                <p>Thanks,<br />CEO</p>
            </div>
        ),
        isPhishing: true,
        explanation: "External email address (gmail.com), creates false sense of urgency, bypasses normal procedures (wire transfer without signature).",
        date: "10:42 AM",
    },
    {
        id: "2",
        senderName: "IT Support",
        senderEmail: "support@securehealth.com",
        subject: "System Maintenance Scheduled",
        body: (
            <div className="space-y-4">
                <p>Hello Staff,</p>
                <p>We will be performing routine server maintenance this Saturday from 2:00 AM to 4:00 AM.</p>
                <p>During this time, the EMR system may be briefly unavailable.</p>
                <p>No action is required from you.</p>
                <p>Thank you,<br />IT Security Team</p>
            </div>
        ),
        isPhishing: false, // Safe
        explanation: "Legitimate internal communication. No urgency, no links asking for credentials, standard notification.",
        date: "Yesterday",
    },
    {
        id: "3",
        senderName: "Microsoft 365 Security",
        senderEmail: "no-reply@microsoft-security-alert.net", // Fake domain
        subject: "Action Required: Password Expired",
        body: (
            <div className="space-y-4">
                <p>Your password has expired.</p>
                <p>You must change your password immediately to retain access to patient files.</p>
                <p><a href="#" className="bg-blue-600 text-white px-4 py-2 rounded inline-block hover:opacity-80" title="http://bit.ly/steal-your-pass">Reset Password Now</a></p>
                <p>If you do not reset within 24 hours, your account will be deleted.</p>
            </div>
        ),
        isPhishing: true,
        explanation: "Generic greeting, fake domain (microsoft-security-alert.net is not microsoft.com), uses URL shortener/suspicious link, threatening language (account deleted).",
        date: "Tue",
    },
];

export default function PhishingPage() {
    const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0].id);
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);

    const selectedEmail = emails.find((e) => e.id === selectedEmailId);

    const handleDecision = (decisionIsPhishing: boolean) => {
        if (!selectedEmail) return;

        const isCorrect = decisionIsPhishing === selectedEmail.isPhishing;
        setFeedback({
            correct: isCorrect,
            message: isCorrect
                ? "Correct! " + selectedEmail.explanation
                : "Incorrect. " + selectedEmail.explanation,
        });

        if (!completedIds.includes(selectedEmail.id)) {
            setCompletedIds([...completedIds, selectedEmail.id]);
        }
    };

    const nextEmail = () => {
        setFeedback(null);
        // Logic to find next uncompleted email or just next in list
        const currentIndex = emails.findIndex(e => e.id === selectedEmailId);
        const nextIndex = (currentIndex + 1) % emails.length;
        setSelectedEmailId(emails[nextIndex].id);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Phishing Simulation</h1>
                    <p className="text-slate-500">Inspect the inbox. Report suspicious emails.</p>
                </div>
                <div className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                    Completed: {completedIds.length} / {emails.length}
                </div>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-[300px_1fr] border rounded-lg overflow-hidden bg-white shadow-sm h-full">
                {/* Sidebar - Email List */}
                <div className="border-r border-slate-200 overflow-y-auto bg-slate-50">
                    {emails.map((email) => (
                        <button
                            key={email.id}
                            onClick={() => {
                                setSelectedEmailId(email.id);
                                setFeedback(null);
                            }}
                            className={cn(
                                "w-full text-left p-4 border-b border-slate-200 hover:bg-white transition-colors focus:bg-white",
                                selectedEmailId === email.id ? "bg-white border-l-4 border-l-primary" : "border-l-4 border-l-transparent",
                                completedIds.includes(email.id) && "opacity-60 bg-slate-50"
                            )}
                        >
                            <div className="flex justify-between mb-1">
                                <span className={cn("font-semibold truncate text-sm", selectedEmailId === email.id ? "text-slate-900" : "text-slate-700")}>
                                    {email.senderName}
                                </span>
                                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{email.date}</span>
                            </div>
                            <div className="text-sm font-medium text-slate-800 truncate mb-1">
                                {email.subject}
                            </div>
                            <div className="flex items-center">
                                {completedIds.includes(email.id) && <CheckCircle className="w-3 h-3 text-green-500 mr-1" />}
                                <span className="text-xs text-slate-500 truncate">Click to read...</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main Content - Reading Pane */}
                <div className="flex flex-col h-full bg-white relative">
                    {selectedEmail ? (
                        <>
                            {/* Email Header */}
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">{selectedEmail.subject}</h2>
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-200 p-2 rounded-full">
                                        <User className="h-6 w-6 text-slate-500" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900">
                                            {selectedEmail.senderName}
                                            <span className="font-normal text-slate-500 text-sm ml-2">&lt;{selectedEmail.senderEmail}&gt;</span>
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">To: You</div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Body */}
                            <div className="p-6 flex-grow overflow-y-auto text-slate-800 leading-relaxed">
                                {selectedEmail.body}
                            </div>

                            {/* Action Toolbar */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                                {!feedback ? (
                                    <>
                                        <div className="text-sm text-slate-500 hidden md:block">
                                            <span className="font-bold">Tip:</span> Hover over links to check their destination.
                                        </div>
                                        <div className="flex gap-3 w-full md:w-auto">
                                            <Button
                                                variant="default"
                                                className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                                                onClick={() => handleDecision(false)}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" /> Mark as Safe
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="flex-1 md:flex-none"
                                                onClick={() => handleDecision(true)} // User says "It IS phishing"
                                            >
                                                <ShieldAlert className="w-4 h-4 mr-2" /> Report Phishing
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className={cn(
                                        "w-full p-4 rounded-md flex items-center justify-between",
                                        feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    )}>
                                        <div className="flex items-start gap-3">
                                            {feedback.correct ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertTriangle className="w-5 h-5 mt-0.5" />}
                                            <div>
                                                <div className="font-bold">{feedback.correct ? "Good Job!" : "Oops!"}</div>
                                                <div className="text-sm">{feedback.message}</div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" onClick={nextEmail} className="text-slate-900 hover:bg-white/50">
                                            Next Email
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Mail className="h-12 w-12 mb-4 opacity-20" />
                            <p>Select an email to inspect</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
