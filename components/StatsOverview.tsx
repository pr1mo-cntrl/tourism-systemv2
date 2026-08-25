import { Building2, Key, Users } from "lucide-react";

export default function StatsOverview({ accommodations }: { accommodations: any[] }) {
  // 1. Calculate Grand Totals
  const totalEstablishments = accommodations.length;
  
  const totalRoomsOccupied = accommodations.reduce((sum, record) => sum + (record.rooms_occupied || 0), 0);
  
  const totalGuests = accommodations.reduce((sum, record) => {
    return sum + 
      (record.ga_ph_count || 0) + 
      (record.ga_non_fil_count || 0) + 
      (record.ga_unspecified || 0) + 
      (record.ga_overseas_filipinos || 0);
  }, 0);

  // 2. Render the 3 Widgets
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Widget 1 */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Establishments</p>
            <h2 className="text-3xl font-bold text-white mt-2">{totalEstablishments}</h2>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Building2 className="text-blue-500" size={24} />
          </div>
        </div>
        <p className="text-blue-500 text-xs font-medium mt-4">All registered reporting locations</p>
      </div>

      {/* Widget 2 */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Rooms Occupied</p>
            <h2 className="text-3xl font-bold text-white mt-2">{totalRoomsOccupied}</h2>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <Key className="text-amber-500" size={24} />
          </div>
        </div>
        <p className="text-amber-500 text-xs font-medium mt-4">Combined occupancy this month</p>
      </div>

      {/* Widget 3 */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Guest Arrivals</p>
            <h2 className="text-3xl font-bold text-white mt-2">{totalGuests}</h2>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-lg">
            <Users className="text-emerald-500" size={24} />
          </div>
        </div>
        <p className="text-emerald-500 text-xs font-medium mt-4">Philippine & Foreign visitors combined</p>
      </div>

    </div>
  );
}