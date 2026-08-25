import { supabase } from '@/lib/supabase'
import MonthlyReportClient from '@/components/MonthlyReportClient'

export const revalidate = 0;

export default async function MonthlyReport() {
  // Fetch ALL records so our Client Component can filter them instantly
  const { data: records, error } = await supabase
    .from('accommodations')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500 font-bold">Error loading records.</div>;
  }

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="mb-2 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Monthly Report</h1>
      </div>

      {/* Inject our interactive UI */}
      <MonthlyReportClient initialRecords={records || []} />

    </main>
  );
}