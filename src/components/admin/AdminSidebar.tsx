"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Store,
    Users,
    Settings,
    LogOut,
    Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    // {
    //     title: "Businesses",
    //     href: "/admin/dashboard",
    //     icon: Store,
    // },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: Star,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="h-screen w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col fixed left-0 top-0 z-40">
            <div className="p-6 border-b border-slate-800/50">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
                        <img
                            src="/brand-logo.png"
                            alt="NeedFul"
                            className="h-6 w-auto object-contain"
                        />
                    </div>
                </Link>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-1 px-3">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
                                isActive
                                    ? "bg-[#FF5200] text-white shadow-lg shadow-orange-900/20"
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-800/50">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
