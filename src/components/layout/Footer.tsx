export function Footer() {
    const team = [
        { name: "Hector Decorme", role: "CEO" },
        { name: "Mathieu Dofonoi", role: "Chief Financial Officer (CFO)" },
        { name: "Ayman El Hasnaoui", role: "Chief Medical Officer" },
        { name: "Rafael Scappaticci", role: "Director of IT Infrastructure and Networks" },
        { name: "Chamseddine Gharbi", role: "Information Systems Security Manager (CISO)" },
    ];

    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 border-b border-slate-100 pb-8">
                    <div className="col-span-full mb-4">
                        <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Project Leadership Team</h3>
                    </div>
                    {team.map((member) => (
                        <div key={member.name} className="flex flex-col">
                            <span className="font-medium text-slate-900 text-sm">{member.name}</span>
                            <span className="text-slate-500 text-xs">{member.role}</span>
                        </div>
                    ))}
                </div>

                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <p className="text-center text-sm text-slate-500">
                            Internal Use Only - Hospital IT Security
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} SecureHealth Hospital. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
