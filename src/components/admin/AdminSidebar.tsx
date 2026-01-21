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
        <div className="h-screen w-64 bg-gradient-to-b from-[#FF5200] to-orange-700 flex flex-col fixed left-0 top-0 z-40 shadow-xl">
            <div className="p-6 border-b border-white/20">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
                        <img
                            src="/brand-logo.png"
                            alt="NeedFul"
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">NeedFul</span>
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
                                    ? "bg-white text-[#FF5200] shadow-lg shadow-black/5 translate-x-1"
                                    : "text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-[#FF5200]" : "text-white/80 group-hover:text-white")} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-white/20">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/90 hover:bg-white/10 transition-all hover:text-white group">
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
