import { supabase } from '@/lib/supabase'
import StatsOverview from '@/components/StatsOverview'
import AnalyticsCharts from '@/components/AnalyticsCharts'

export const revalidate = 0;

export default async function AnalyticsDashboard() {
  // Fetch all data for the analytics engine
  const { data: accommodations, error } = await supabase
    .from('accommodations')
    .select('*');

  if (error) {
    return <div className="p-10 text-red-500 font-bold">Error loading data from Supabase. Check your terminal.</div>;
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-zinc-400 mt-2">Live overview and visitor demographics.</p>
      </div>

      {/* The 3 Top Summary Boxes */}
      <StatsOverview accommodations={accommodations || []} />

      {/* The New Interactive Recharts */}
      <AnalyticsCharts accommodations={accommodations || []} />

    </main>
  );
}