import CreateForm from '@/components/CreateForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateAccommodation() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-2">
          <Link href="/accommodations" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Accommodations</span>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white uppercase mt-4">Add New Record</h1>
          <p className="text-zinc-400">Register a new accommodation report.</p>
        </div>

        {/* Load our client-side form! */}
        <CreateForm />
        
      </div>
    </main>
  );
}