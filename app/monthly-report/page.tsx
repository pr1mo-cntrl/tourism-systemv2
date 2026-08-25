import { supabase } from '@/lib/supabase'
import MonthlyReportClient from '@/components/MonthlyReportClient'

// Force Next.js to always fetch fresh data, never use cached data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MonthlyReport() {
  // Fetch ALL records from 'visitor_records'
  const { data: records, error } = await supabase
    .from('visitor_records')
    .select('*')
    .order('attraction_name', { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500 font-bold">Error loading records: {error.message}</div>;
  }

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="mb-2 border-b border-zinc-800 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Monthly Report</h1>
          {/* DEBUG TEXT - This will tell us if data is actually arriving! */}
          <p className="text-amber-500 text-sm mt-2 font-medium">
            System Check: {records?.length || 0} total records found in database.
          </p>
        </div>
      </div>

      {/* Inject our interactive UI */}
      <MonthlyReportClient initialRecords={records || []} />

    </main>
  );
}