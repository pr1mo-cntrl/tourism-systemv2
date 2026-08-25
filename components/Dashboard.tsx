"use client"; // This tells Next.js this component has interactive buttons

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";

export default function Dashboard({ accommodations }: { accommodations: any[] }) {
  // Our toggle switch (defaults to true for Grid View)
  const [isGrid, setIsGrid] = useState(true);

  return (
    <div>
      {/* Action Bar with Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors border border-zinc-700"
        >
          {isGrid ? <List size={18} /> : <LayoutGrid size={18} />}
          <span className="font-semibold text-sm">{isGrid ? "List View" : "Grid View"}</span>
        </button>
      </div>

      {/* The Dynamic Layout Container */}
      <div className={isGrid ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        
        {accommodations?.map((record) => {
          const noOfRooms = record.no_of_rooms || 0;
          const occupied = record.rooms_occupied || 0;
          let occupancyRate = noOfRooms > 0 ? Math.round((occupied / noOfRooms) * 100) : 0;
          occupancyRate = Math.min(occupancyRate, 100);

          const barColor = occupancyRate >= 80 ? 'bg-red-500' : occupancyRate >= 50 ? 'bg-amber-500' : 'bg-emerald-500';
          const totalGuests = (record.ga_ph_count || 0) + (record.ga_non_fil_count || 0) + (record.ga_unspecified || 0) + (record.ga_overseas_filipinos || 0);

          if (isGrid) {
            // ==========================================
            // GRID VIEW CARD
            // ==========================================
            return (
              <Link href={`/view/${record.id}`} key={record.id} className="block h-full">
                <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 cursor-pointer hover:border-zinc-600 hover:shadow-lg transition-all h-full">
                  <div>
                    <h3 className="text-lg font-bold text-white m-0 uppercase">{record.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1 uppercase">📍 {record.municipality} • {record.month} {record.year}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center bg-[#27272a] p-3 rounded-lg flex-grow">
                    <div>
                      <div className="font-bold text-blue-500 text-lg">{noOfRooms}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Total Rooms</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-500 text-lg">{occupied}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Rooms Used</div>
                    </div>
                    <div>
                      <div className="font-bold text-amber-500 text-lg">{totalGuests}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Total Arrivals</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-zinc-300 mb-2">
                      <span>Occupancy Rate</span>
                      <span className="font-bold">{occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-[#3f3f46] rounded-full h-1.5 overflow-hidden">
                      <div className={`${barColor} h-full rounded-full transition-all duration-500`} style={{ width: `${occupancyRate}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          } else {
            // ==========================================
            // LIST VIEW CARD (Horizontal)
            // ==========================================
            return (
              <Link href={`/view/${record.id}`} key={record.id} className="block w-full">
                <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-zinc-600 hover:shadow-lg transition-all w-full">
                  <div className="flex-2 pr-4">
                    <h3 className="text-lg font-bold text-white m-0 uppercase">{record.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1 uppercase">📍 {record.municipality} • {record.month} {record.year}</p>
                  </div>
                  
                  <div className="flex flex-3 justify-around items-center border-l border-r border-zinc-700 px-4 w-1/2">
                    <div className="text-center">
                      <div className="font-bold text-blue-500 text-lg">{noOfRooms}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Total Rooms</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-emerald-500 text-lg">{occupied}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Rooms Used</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-amber-500 text-lg">{totalGuests}</div>
                      <div className="text-zinc-400 text-[0.65rem] uppercase tracking-wider mt-1">Total Arrivals</div>
                    </div>
                  </div>

                  <div className="flex-1 text-right pl-4">
                    <div className={`inline-block px-4 py-2 border rounded-full bg-zinc-900/50 ${occupancyRate >= 80 ? 'border-red-500/50' : occupancyRate >= 50 ? 'border-amber-500/50' : 'border-emerald-500/50'}`}>
                      <span className={`font-bold text-sm ${occupancyRate >= 80 ? 'text-red-500' : occupancyRate >= 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {occupancyRate}% Occupied
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}