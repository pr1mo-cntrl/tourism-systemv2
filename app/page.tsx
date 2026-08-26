import { supabase } from '@/lib/supabase'
import StatsOverview from '@/components/StatsOverview'
import AnalyticsCharts from '@/components/AnalyticsCharts'

export const revalidate = 0;

export default async function AnalyticsDashboard() {
  // 1. Fetch accommodations data
  const { data: accommodations, error: accError } = await supabase
    .from('accommodations')
    .select('*');

  // 2. Fetch attractions data (visitor records)
  const { data: visitorRecords, error: visError } = await supabase
    .from('visitor_records')
    .select('*');

  if (accError || visError) {
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

      {/* The New Interactive Recharts - Now with BOTH datasets! */}
      <AnalyticsCharts 
        accommodations={accommodations || []} 
        visitorRecords={visitorRecords || []} 
      />

    </main>
  );
}