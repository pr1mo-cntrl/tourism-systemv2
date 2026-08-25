"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/visitor-records");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
      
      <div className="w-full max-w-md bg-[#18181b] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Header / Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 mb-4 font-bold text-xl">
            TS
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Tourism System</h1>
          <p className="text-sm text-zinc-400 mt-1">Sign in securely to manage visitor records</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <ShieldAlert size={18} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@benguet.gov.ph"
                className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-xs text-zinc-500">
          Province of Benguet • Tourism Division
        </div>

      </div>

    </main>
  );
}