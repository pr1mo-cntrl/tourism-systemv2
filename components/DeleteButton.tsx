"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ recordId }: { recordId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this record? This cannot be undone.");
    if (!isConfirmed) return;

    const { error } = await supabase
      .from("accommodations")
      .delete()
      .eq("id", recordId);

    if (error) {
      alert("Error deleting record: " + error.message);
    } else {
      router.push("/accommodations");
      router.refresh();
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-semibold"
    >
      <Trash2 size={18} />
      Delete
    </button>
  );
}