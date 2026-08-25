import { supabase } from '@/lib/supabase'
import EditForm from '@/components/EditForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0;

export default async function EditAccommodation({ params }: { params: Promise<{ id: string }> }) {
  
  // Safely grab the ID for Next.js 15
  const resolvedParams = await params;
  const recordId = resolvedParams.id;

  // Fetch the existing record
  const { data: record, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('id', recordId)
    .single();

  if (error || !record) {
    return (
      <div className="p-10 flex flex-col gap-4 bg-[#09090b] min-h-screen">
        <div className="text-red-500 font-bold text-xl">Record not found.</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex justify-between items-center mb-2">
          <Link href={`/view/${record.id}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back to View Page</span>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white uppercase mt-4">{record.name}</h1>
          <p className="text-zinc-400">Editing data for {record.month} {record.year}</p>
        </div>

        {/* Load our client-side form! */}
        <EditForm record={record} />
        
      </div>
    </main>
  );
}