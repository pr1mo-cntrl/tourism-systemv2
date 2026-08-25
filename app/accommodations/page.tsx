import Link from "next/link";
import { Plus } from "lucide-react";
import { supabase } from '@/lib/supabase'
import Dashboard from '@/components/Dashboard'
import StatsOverview from '@/components/StatsOverview' // <-- 1. ADD THIS IMPORT

export const revalidate = 0;

export default async function AccommodationsPage() {
  const { data: accommodations, error } = await supabase
    .from('accommodations')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500 font-bold">Error loading data from Supabase. Check your terminal.</div>;
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-zinc-800 pb-4">
        </div>

        {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Accommodations Dashboard</h1>
          <p className="text-zinc-400 mt-2">Live overview of all registered reporting locations.</p>
        </div>
        
        {/* ADD NEW RECORD BUTTON */}
        <Link href="/accommodations/create" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold">
          <Plus size={20} />
          <span>Add New Record</span>
        </Link>
      </div>

        {/* <-- 2. ADD THE STATS WIDGET HERE --> */}
        <StatsOverview accommodations={accommodations} />

        {/* The Grid/List Toggle Component */}
        <Dashboard accommodations={accommodations} />
        
      </div>
    </main>
  );
}