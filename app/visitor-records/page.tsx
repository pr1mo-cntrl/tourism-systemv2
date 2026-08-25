"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function VisitorRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("visitor_records")
      .select("*")
      .order("attraction_name", { ascending: true });

    if (error) {
      console.error("Error fetching records:", error.message);
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the record for "${name}"?`)) {
      return;
    }

    const { error } = await supabase
      .from("visitor_records")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting record: " + error.message);
    } else {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const filteredRecords = records.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      r.attraction_name?.toLowerCase().includes(query) ||
      r.municipality?.toLowerCase().includes(query) ||
      r.month?.toLowerCase().includes(query) ||
      r.year?.toString().includes(query)
    );
  });

  return (
    <main className="p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-zinc-400 text-sm mb-1 font-medium flex items-center gap-2">
            Visitor Records <span className="text-zinc-600">{'>'}</span> List
          </div>
          <h1 className="text-3xl font-bold text-white">
            Visitor Records
          </h1>
        </div>
        
        <Link 
          href="/visitor-records/create" 
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          New visitor record
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        
        {/* Table Toolbar / Search Area */}
        <div className="p-4 border-b border-zinc-800 flex justify-end">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#27272a] border-b border-zinc-800 text-zinc-300 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Tourist Attraction</th>
                <th className="p-4 font-semibold">Period</th>
                <th className="p-4 font-semibold text-center">This Mun.</th>
                <th className="p-4 font-semibold text-center">Other Mun.</th>
                <th className="p-4 font-semibold text-center">Other Prov.</th>
                <th className="p-4 font-semibold text-center">Foreign</th>
                <th className="p-4 font-semibold text-center">Total Visitors</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    Loading visitor records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No visitor records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => {
                  const totalThis = (record.this_mun_male || 0) + (record.this_mun_female || 0);
                  const totalOtherMun = (record.other_mun_male || 0) + (record.other_mun_female || 0);
                  const totalOtherProv = (record.other_prov_male || 0) + (record.other_prov_female || 0);
                  const totalForeign = (record.foreign_male || 0) + (record.foreign_female || 0);
                  const totalUnspec = (record.unspecified_male || 0) + (record.unspecified_female || 0);
                  
                  const grandTotal = totalThis + totalOtherMun + totalOtherProv + totalForeign + totalUnspec;

                  return (
                    <tr key={record.id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white uppercase">{record.attraction_name}</div>
                        <div className="text-xs text-zinc-400">{record.municipality} | Code: {record.attraction_code}</div>
                      </td>
                      <td className="p-4 font-medium text-zinc-300">{record.month} {record.year}</td>
                      
                      <td className="p-4 text-center">
                        <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded font-bold">{totalThis}</span>
                        <div className="text-xs text-zinc-500 mt-1">M: {record.this_mun_male || 0} | F: {record.this_mun_female || 0}</div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded font-bold">{totalOtherMun}</span>
                        <div className="text-xs text-zinc-500 mt-1">M: {record.other_mun_male || 0} | F: {record.other_mun_female || 0}</div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded font-bold">{totalOtherProv}</span>
                        <div className="text-xs text-zinc-500 mt-1">M: {record.other_prov_male || 0} | F: {record.other_prov_female || 0}</div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded font-bold">{totalForeign}</span>
                        <div className="text-xs text-zinc-500 mt-1">M: {record.foreign_male || 0} | F: {record.foreign_female || 0}</div>
                      </td>

                      <td className="p-4 text-center">
                        <span className="bg-zinc-800 text-white px-3 py-1.5 rounded-md font-bold border border-zinc-700">
                          {grandTotal}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link 
                            href={`/visitor-records/edit/${record.id}`} 
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-md transition-colors"
                            title="Edit Record"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(record.id, record.attraction_name)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  );
}