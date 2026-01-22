import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminBackground } from '@/components/admin/AdminBackground';
import { AdminChatboxWrapper } from '@/components/admin/AdminChatboxWrapper';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Not logged in - redirect to admin login
        redirect('/admin/login');
    }

    // Check if user has admin role
    const { data: userData } = await (supabase as any)
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!userData || userData.role !== 'admin') {
        // User is not an admin - redirect to admin login
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen text-foreground flex relative">
            {/* Animated Background */}
            <AdminBackground />

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col ml-64 transition-all duration-300 relative z-10">
                <AdminHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
            <AdminChatboxWrapper />
        </div>
    );
}
