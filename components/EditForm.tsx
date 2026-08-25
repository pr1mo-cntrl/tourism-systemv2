"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditForm({ record }: { record: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // 1. Set up our state variables with the existing data
  const [roomsOccupied, setRoomsOccupied] = useState(record.rooms_occupied || 0);
  
  const [gnPh, setGnPh] = useState(record.gn_ph_count || 0);
  const [gnNonFil, setGnNonFil] = useState(record.gn_non_fil_count || 0);
  const [gnOverseas, setGnOverseas] = useState(record.gn_overseas_filipinos || 0);
  const [gnUnspecified, setGnUnspecified] = useState(record.gn_unspecified || 0);

  // 2. Auto-calculate total nights instantly
  const totalNights = Number(gnPh) + Number(gnNonFil) + Number(gnOverseas) + Number(gnUnspecified);

  // 3. Handle the form submission to update Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from("accommodations")
      .update({
        rooms_occupied: roomsOccupied,
        gn_ph_count: gnPh,
        gn_non_fil_count: gnNonFil,
        gn_overseas_filipinos: gnOverseas,
        gn_unspecified: gnUnspecified,
        number_of_nights: totalNights, // Save our auto-calculated total!
      })
      .eq("id", record.id);

    setIsSaving(false);

    if (error) {
      alert("Error saving record: " + error.message);
    } else {
      // Redirect back to the view page so the admin can see their updates
      router.push(`/view/${record.id}`);
      router.refresh(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 mt-6">
      <h2 className="text-xl text-white mb-6 font-semibold border-b border-zinc-800 pb-4">
        ✏️ Update Occupancy & Nights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Rooms Occupied */}
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Rooms Occupied</label>
          <input 
            type="number" 
            value={roomsOccupied} 
            onChange={(e) => setRoomsOccupied(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

      </div>

      <h3 className="text-lg text-white mb-4 font-semibold">Nights Stayed Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Philippine Residents (Nights)</label>
          <input type="number" value={gnPh} onChange={(e) => setGnPh(e.target.value)} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Foreign Residents (Nights)</label>
          <input type="number" value={gnNonFil} onChange={(e) => setGnNonFil(e.target.value)} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Overseas Filipinos (Nights)</label>
          <input type="number" value={gnOverseas} onChange={(e) => setGnOverseas(e.target.value)} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500" />
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Unspecified (Nights)</label>
          <input type="number" value={gnUnspecified} onChange={(e) => setGnUnspecified(e.target.value)} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-zinc-500" />
        </div>

      </div>

      {/* The Auto-Calculating Grand Total */}
      <div className="bg-[#27272a] border-l-4 border-amber-500 p-5 rounded-lg mb-8 flex justify-between items-center">
        <div>
          <h4 className="text-white font-bold text-lg">Total No. Nights</h4>
          <p className="text-zinc-400 text-sm">Calculated automatically by the system.</p>
        </div>
        <div className="text-4xl font-bold text-amber-500">
          {totalNights}
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-zinc-800 pt-6">
        <Link href={`/view/${record.id}`} className="px-6 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-semibold">
          Cancel
        </Link>
        <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-colors font-semibold disabled:opacity-50">
          <Save size={20} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}