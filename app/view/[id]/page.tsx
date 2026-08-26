import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Edit } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'

export const revalidate = 0;

// Next.js 15 requires params to be a Promise
export default async function ViewAccommodation({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Await the params to safely grab the ID from the URL
  const resolvedParams = await params;
  const recordId = resolvedParams.id;

  // 2. Fetch the specific record using the extracted ID
  const { data: record, error } = await supabase
    .from('accommodations')
    .select('*')
    .eq('id', recordId)
    .single();

  if (error || !record) {
    console.error("Supabase error:", error);
    return (
      <div className="p-10 flex flex-col gap-4 bg-[#09090b] min-h-screen">
        <div className="text-red-500 font-bold text-xl">Record not found.</div>
        <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
      </div>
    );
  }

  const phProv = record.filipino_origin || 'N/A';
  const forCountry = record.foreign_origin || 'N/A';
  const overseasOrigin = record.overseas_origin || 'N/A';

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Actions */}
      <div className="flex justify-between items-center mb-8">
        
        {/* Updated Back Link */}
        <Link href="/accommodations" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} />
          Back to Accommodations
        </Link>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Our new Client Component Button! */}
          <DeleteButton recordId={recordId} />

          {/* Existing Edit Button */}
          <Link 
            href={`/edit/${recordId}`} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold"
          >
            <Edit size={18} />
            Edit Record
          </Link>

        </div>
      </div>

        {/* THE MAIN REPORT PANEL */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight uppercase">{record.name}</h1>
            <p className="text-zinc-400 text-base uppercase">
              📍 {record.municipality}, {record.province} &nbsp;|&nbsp; 📅 {record.month} {record.year} &nbsp;|&nbsp; 🏷️ Type: {record.type}
            </p>
          </div>
          
          <hr className="border-zinc-800 my-8" />
          
          {/* Capacity & Staffing */}
          <h3 className="text-xl text-white mb-4 font-semibold">🏢 Capacity & Staffing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="bg-[#27272a] p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Total Rooms Available</h4>
              <p className="text-2xl font-bold text-white">{record.no_of_rooms || 0}</p>
            </div>
           <div className="bg-[#27272a] p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Male Staff</h4>
              <p className="text-2xl font-bold text-white">{record.male_staff || 0}</p>
            </div>
            <div className="bg-[#27272a] p-4 rounded-lg border-l-4 border-pink-500">
              <h4 className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Female Staff</h4>
              <p className="text-2xl font-bold text-white">{record.female_staff || 0}</p>
            </div>

          {/* Guest Arrivals Grid */}
          <h3 className="text-xl text-white mb-4 font-semibold">👥 Guest Arrivals Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            
            <div className="bg-[#27272a] p-5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-bold m-0">🇵🇭 Philippine Residents</h4>
                <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold">{record.ga_ph_count || 0} Guests</span>
              </div>
              <p className="text-zinc-400 text-sm mb-1"><strong>Nights Stayed:</strong> {record.gn_ph_count || 0}</p>
              <p className="text-zinc-400 text-sm m-0"><strong>From:</strong> {phProv}</p>
            </div>

            <div className="bg-[#27272a] p-5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-bold m-0">✈️ Non-Philippine Residents</h4>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">{record.ga_non_fil_count || 0} Guests</span>
              </div>
              <p className="text-zinc-400 text-sm mb-1"><strong>Nights Stayed:</strong> {record.gn_non_fil_count || 0}</p>
              <p className="text-zinc-400 text-sm m-0"><strong>From:</strong> {forCountry}</p>
            </div>

            <div className="bg-[#27272a] p-5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-bold m-0">🌍 Overseas Filipinos</h4>
                <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold">{record.ga_overseas_filipinos || 0} Guests</span>
              </div>
              <p className="text-zinc-400 text-sm mb-1"><strong>Nights Stayed:</strong> {record.gn_overseas_filipinos || 0}</p>
              <p className="text-zinc-400 text-sm m-0"><strong>From:</strong> {overseasOrigin}</p>
            </div>

            <div className="bg-[#27272a] p-5 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-bold m-0">❓ Unspecified Residents</h4>
                <span className="bg-zinc-500 text-white px-3 py-1 rounded-full text-xs font-bold">{record.ga_unspecified || 0} Guests</span>
              </div>
              <p className="text-zinc-400 text-sm m-0"><strong>Nights Stayed:</strong> {record.gn_unspecified || 0}</p>
            </div>

          </div>

          <hr className="border-zinc-800 my-8" />

          {/* Grand Totals */}
          <div className="flex flex-col md:flex-row gap-5 bg-[#18181b] border-2 border-amber-500 p-6 rounded-lg">
            <div className="flex-1 text-center md:border-r border-zinc-700 pb-4 md:pb-0">
              <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">Total Rooms Occupied</p>
              <h2 className="text-white text-4xl font-bold m-0">{record.rooms_occupied || 0}</h2>
            </div>
            <div className="flex-1 text-center">
              <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">Total Number of Nights</p>
              <h2 className="text-white text-4xl font-bold m-0">{record.number_of_nights || 0}</h2>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}