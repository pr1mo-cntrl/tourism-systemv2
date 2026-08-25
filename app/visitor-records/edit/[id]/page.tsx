"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";

export default function EditVisitorRecord({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const recordId = resolvedParams.id;
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState("JUNE");
  const [year, setYear] = useState("2026");
  const [attractionName, setAttractionName] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [attractionCode, setAttractionCode] = useState("");

  const [thisMunM, setThisMunM] = useState(0);
  const [thisMunF, setThisMunF] = useState(0);
  const [otherMunM, setOtherMunM] = useState(0);
  const [otherMunF, setOtherMunF] = useState(0);
  const [otherProvM, setOtherProvM] = useState(0);
  const [otherProvF, setOtherProvF] = useState(0);
  const [foreignM, setForeignM] = useState(0);
  const [foreignF, setForeignF] = useState(0);
  const [unspecM, setUnspecM] = useState(0);
  const [unspecF, setUnspecF] = useState(0);

  const benguetMunicipalities = [
    "Atok", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan", 
    "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan", "Tuba", "Tublay"
  ];

  const attractionCodesList = [
    "1. Nature",
    "101 - Mountains/hills/highlands",
    "102 - Falls",
    "103 - Lakes and Pond",
    "104 - River and Landscape (includes subterranean rivers)",
    "105 - Coastal Landscape and Seascape",
    "106 - Marine Park",
    "107 - Caves (inland)",
    "108 - Unique Natural Landscape / Seascape",
    "109 - Volcanoes",
    "199 - Other Natural Attractions",
    "2. History and Culture",
    "201 - Historical Landmarks / Shrines / Monuments",
    "202 - Cultural Heritage Sites / Museums / Burial Caves",
    "203 - Indigenous / Traditional Villages",
    "299 - Other Historical / Cultural Attractions",
    "3. Man-made / Farms / Parks",
    "301 - Man-made Parks / Gardens / View Decks",
    "302 - Farm and Ranch",
    "303 - Adventure / Recreational Parks",
    "304 - Bridges / Tunnels / Infrastructure",
    "399 - Other Man-made Attractions",
    "4. Religious / Pilgrimage",
    "401 - Churches / Cathedrals / Chapels",
    "402 - Pilgrimage Sites / Stations of the Cross",
    "499 - Other Religious Attractions",
    "5. Entertainment / Recreation / Sports",
    "501 - Swimming Pools / Water Parks",
    "502 - Sports Complexes / Golf Courses / Bike Trails",
    "503 - Entertainment Hubs / Studios",
    "599 - Other Recreational Attractions",
    "6. Resorts / Accommodation",
    "601 - Resorts / Hotels / Inns",
    "602 - Transient Houses / Homestays / Glamping Sites",
    "699 - Other Accommodation Attractions",
    "7. Special Interest / Events / Festivals",
    "701 - Municipal Town Halls / Event Centers",
    "702 - Festival Grounds / Activity Areas",
    "703 - Trading Posts / Pasalubong Centers",
    "799 - Other Special Interest Attractions",
    "8. Shopping / Dining / Commercial",
    "801 - Malls / Commercial Centers / Markets",
    "802 - Restaurants / Cafes / Food Hubs",
    "899 - Other Commercial Attractions",
    "9. Miscellaneous / Other",
    "901 - Other Miscellaneous Attractions"
  ];

  const attractionsMasterList = [
    "1300 LEVEL SWIMMING POOL",
    "ABAS HOT SPRING",
    "ABBAO RESORT",
    "ADMIRALS FARM PARK",
    "ADWAGAN RIVER",
    "AGRO-ECOTOURISM PARK",
    "AHONDA CAVES, ROCK FORMATIONS AND JUNGLE ADVENTURE",
    "ALLYANA SOLENN'S RESORT",
    "ALOKIP-PINAN ECO TRAIL",
    "AM-AM MADALIPEY VIEW",
    "AMANDO'S LEMON PICKING FARM",
    "AMBIANCE GARDEN",
    "AMBUKLAO DAM",
    "AMBURAYAN RIVER",
    "ANENG RIVER & BAYOCBOC FALLS",
    "ARAN CAVE",
    "ASIN HOTSPRING",
    "ASIN HOTSPRING POOTEN RESORT",
    "ATV ADVENTURES",
    "AVONG NEN ROMY",
    "AZURE RIVERPOOL",
    "BAANGAN ESCAPADE",
    "BADI FALLS",
    "BADOL CAMPING GROUND/ CAMP UTOPIA",
    "BAHONG SUNFLOWER FARM",
    "BANAO RIVER",
    "BAYOKBOK FALLS",
    "BEACON HILL ECO-PARK",
    "BELL CHURCH",
    "BENCAB MUSEUM",
    "BENGAONGAO CAVE",
    "BENGUET AGRI-DEMO FARM/BULALA DEMO FARM",
    "BENGUET MUSEUM",
    "BENGUET-KOCHI SISTERHOOD PARK/VEGETABLE FARMS/ MOSSY FOREST/HAIGHT'S PLACE",
    "BIGGEST GONG",
    "BINGA INDIGENOUS PEOPLES CULTURAL HERITAGE SITE (BIPCHS)",
    "BOBOK BISAL DOWN HILL BIKE TRAIL",
    "BOBOK PINE FOREST",
    "BOTEL RESORT",
    "BREDCO RESORT",
    "BROWNFIELDS BUILDERS",
    "BSU",
    "BSU STRAWBERRY FARM",
    "BULALACAO CAVE",
    "BURIAL CAVE",
    "BURTON'S CABIN & YARD",
    "COLORADO FALLS",
    "COSMIC FARM",
    "CROSBY PARK",
    "D' RIDGE RECREATIONAL HUB",
    "DAKLAN SULFUR SPRING (FORMERLY BADEKBEK HOT SPRING)",
    "DARJANE'S FLOWER GARDEN",
    "DUMANAY BURIAL CAVE",
    "ELENA'S RESORT",
    "ENCA ORGANIC FARM",
    "ETHANS SWIMMING POOL",
    "GARDEN NEN INES",
    "GLAMPING SITE",
    "GOAT CLIFF ROCK ADVENTURES",
    "GREEN NARRAN CAMPSITE",
    "HALF TUNNEL",
    "HD MOUNTAINVILLE",
    "HERITAGE HOUSES",
    "HIDDEN CYPRESS BOTANICAL GARDEN",
    "HIDDEN PARADISE SWIMMING POOL",
    "HIGH ACRES",
    "HIGHEST POINT",
    "HYUVANA SWIMMING POOL",
    "INIDIAN VIEW",
    "JEFFREY VISAYA'S VIEW",
    "JLM FARM",
    "JOHN KENNY ORGANIC FARM/ JOHN JOSH FARM",
    "KAALNUSAN CAMPING GROUND",
    "KAMP PATADAN",
    "KENVIN'S GARDEN",
    "KETONG FALLS (BLUE LAGOON)",
    "KINTANA/ JUAKENMAR SWIMMING POOL",
    "KISSING CLOUDS AGRICULTURAL FARM",
    "KIWAS RESORT",
    "KIYOMIE'S GARDEN",
    "LA TRINIDAD VEGETABLE TRADING POST",
    "LALLY'S GARDEN",
    "LAS-ANG ECOTRAIL AND CABIN",
    "LAY-ODAN FARM",
    "LEAVES & PETALS ECO-GARDEN RESORT",
    "LEPANTO GOLF",
    "LEPANTO MINE CAMP",
    "LES-ENG RICE TERRACES",
    "LILY OF THE VALLEY ORGANIC FARM",
    "LIVING GIFTS NURSERY",
    "LONGOG CAVE",
    "LOURDES GROTTO",
    "LUBO LAKE",
    "MADAYMEN VEGETABLE TERRACES",
    "MANGTA FALLS",
    "MARTINS HOBBIT HOUSE",
    "MERLYN'S GARDEN",
    "MOUNT COSTA",
    "MOUNT POKKONG(FORMERLY MT. POGKONG)",
    "MT. AL-AL",
    "MT. ANAP-PIGINGAN",
    "MT. BIDAWAN",
    "MT. CAMISONG FOREST PARKS AND EVENTS",
    "MT. DAKIWAGAN",
    "MT. GEDGEDAYYAN",
    "MT. KABUNIAN",
    "MT. KALUGONG",
    "MT. KILKILI",
    "MT. MARIKIT",
    "MT. OLIS VIEWPOINT",
    "MT. OTEN",
    "MT. PATULLOK (MT. LOBO)",
    "MT. PIGINGAN",
    "MT. PULAG",
    "MT. PURGATORY",
    "MT. TABAYOK AND 4 LAKES",
    "MT. TAGPAYA",
    "MT. TAGPEW",
    "MT. TENGLAWAN",
    "MT. TIMBAC SUMMIT",
    "MT. UGO",
    "MT. ULAP",
    "MT. YANGBEW",
    "MUNICIPAL TOWN HALL (FESTIVAL/EVENTS/ACTIVITIES)",
    "NARO'S FARM",
    "NATIONAL MUSEUM",
    "NATURE LOVER'S GARDEN",
    "NEVERLAND",
    "NORTHERN BLOSSOM FLOWER FARM",
    "ONGONG FALLS",
    "OPDAS BURIAL CAVE",
    "ORGANIC FARMS(CARMELITA SACLEY'S FARM)",
    "OSUCAN TUNNEL",
    "OUR LADY OF LOURDES PARISH CHURCH",
    "OVEK CAVE",
    "PAHAK RESORT",
    "PALANSA PANORAMIC VIEW",
    "PALINA RICE TERRACES",
    "PALM GROVE",
    "PATAWID GYAYARI",
    "PATERNO CAVE",
    "PATTAN FALLS",
    "PAYAY ROCK CLIMBING",
    "PEY-OG FALLS",
    "PICKLES THORN FLOWER GARDEN",
    "PIGINGAN/ BAJOMBONG FALLS",
    "PIKAW FALLS",
    "POLIG'S BERRY FARM",
    "PUGAD NI ARTS STUDIO",
    "PUGUIS COMMUNAL FOREST",
    "RIVERVIEW WATER PARK",
    "ROCKY MOUNTAIN ADVENTURE/  MT. TAYAWAN ECO PARK",
    "ROCKY MOUNTAIN RESORT",
    "SABLAN FRUIT FESTIVAL",
    "SABLAN HILLS",
    "SADJATAN VIEWPOINT",
    "SAGPAWE HIDDEN GARDEN",
    "SAGUIBALETE PARK (FORMERLY BALITE TREE)",
    "SIAM SIAM FALLS",
    "SINOT HOT SPRING",
    "SPILL WAY VIEW",
    "STELLAR VIEW",
    "STOBOSA HILLSIDE HOMES ARTWORKS",
    "SULFURIN HOT SPRING",
    "SUVANI'S AVONG",
    "TACADANG MIGHTY GATES",
    "TANAP RICE TERRACES",
    "TAYAO FARMS",
    "TEKIP FALLS",
    "TIMBAC ROCKSHELTERS",
    "TINONGCHOL BURIAL ROCK",
    "TOWING WATERFALLS",
    "TUBLAY PASALUBONG CENTER",
    "TUMPAO RESORT",
    "UM-A FARM",
    "VALLEYWOOD ADVENTURE PARK",
    "WAGANGAN ROCK FORMATION",
    "WINACA ECO CULTURAL VILLAGE AND FOREST HOMES"
  ];

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from("visitor_records")
        .select("*")
        .eq("id", recordId)
        .single();

      if (error) {
        alert("Error loading record: " + error.message);
        router.push("/visitor-records");
      } else if (data) {
        setMonth(data.month || "JUNE");
        setYear(data.year?.toString() || "2026");
        setAttractionName(data.attraction_name || "");
        setMunicipality(data.municipality || "");
        setAttractionCode(data.attraction_code || "");

        setThisMunM(data.this_mun_male || 0);
        setThisMunF(data.this_mun_female || 0);
        setOtherMunM(data.other_mun_male || 0);
        setOtherMunF(data.other_mun_female || 0);
        setOtherProvM(data.other_prov_male || 0);
        setOtherProvF(data.other_prov_female || 0);
        setForeignM(data.foreign_male || 0);
        setForeignF(data.foreign_female || 0);
        setUnspecM(data.unspecified_male || 0);
        setUnspecF(data.unspecified_female || 0);
      }
      setLoading(false);
    };

    fetchRecord();
  }, [recordId, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from("visitor_records")
      .update({
        month,
        year,
        municipality,
        attraction_name: attractionName.toUpperCase(),
        attraction_code: attractionCode,
        this_mun_male: thisMunM,
        this_mun_female: thisMunF,
        other_mun_male: otherMunM,
        other_mun_female: otherMunF,
        other_prov_male: otherProvM,
        other_prov_female: otherProvF,
        foreign_male: foreignM,
        foreign_female: foreignF,
        unspecified_male: unspecM,
        unspecified_female: unspecF
      })
      .eq("id", recordId);

    setIsSaving(false);

    if (error) {
      alert("Error updating record: " + error.message);
    } else {
      router.push("/visitor-records");
      router.refresh();
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-zinc-400">Loading record details...</div>;
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 mb-4 text-sm text-zinc-400 font-medium">
        <Link href="/visitor-records" className="hover:text-white transition-colors">Visitor Records</Link>
        <span className="text-zinc-600">{'>'}</span>
        <span className="text-zinc-200">Edit Record</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">Edit Tourist Attraction Record</h1>

      <form onSubmit={handleUpdate} className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 shadow-xl">
        
        {/* Top Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-zinc-800">
          
          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Month *</label>
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500"
            >
              {["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Year *</label>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500"
            >
              {["2025", "2026", "2027"].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Tourist Attraction Name Dropdown */}
          <div className="md:col-span-2">
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Tourist Attraction Name *</label>
            <select 
              required 
              value={attractionName} 
              onChange={(e) => setAttractionName(e.target.value)} 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500 appearance-none"
            >
              <option value="" disabled>Select tourist attraction...</option>
              {attractionsMasterList.map((att) => (
                <option key={att} value={att}>{att}</option>
              ))}
            </select>
          </div>

          {/* Municipality */}
          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Municipality *</label>
            <select 
              required 
              value={municipality} 
              onChange={(e) => setMunicipality(e.target.value)} 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500 appearance-none"
            >
              <option value="" disabled>Select a municipality...</option>
              {benguetMunicipalities.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Attraction Code */}
          <div>
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Attraction Code *</label>
            <select 
              required 
              value={attractionCode} 
              onChange={(e) => setAttractionCode(e.target.value)} 
              className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500 appearance-none"
            >
              <option value="" disabled>Select attraction code...</option>
              {attractionCodesList.map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Demographics Breakdown Section */}
        <h3 className="text-white font-bold text-lg mb-6">Visitor Demographics Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* This Municipality */}
          <div className="bg-[#27272a] p-4 rounded-lg border border-zinc-700/50">
            <h4 className="text-amber-500 font-semibold text-sm mb-3">This Municipality</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Male</label>
                <input type="number" min="0" value={thisMunM} onChange={(e) => setThisMunM(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Female</label>
                <input type="number" min="0" value={thisMunF} onChange={(e) => setThisMunF(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>

          {/* Other Municipality */}
          <div className="bg-[#27272a] p-4 rounded-lg border border-zinc-700/50">
            <h4 className="text-amber-500 font-semibold text-sm mb-3">Other Municipality</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Male</label>
                <input type="number" min="0" value={otherMunM} onChange={(e) => setOtherMunM(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Female</label>
                <input type="number" min="0" value={otherMunF} onChange={(e) => setOtherMunF(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>

          {/* Other Province */}
          <div className="bg-[#27272a] p-4 rounded-lg border border-zinc-700/50">
            <h4 className="text-amber-500 font-semibold text-sm mb-3">Other Province</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Male</label>
                <input type="number" min="0" value={otherProvM} onChange={(e) => setOtherProvM(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Female</label>
                <input type="number" min="0" value={otherProvF} onChange={(e) => setOtherProvF(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>

          {/* Foreign Country Residence */}
          <div className="bg-[#27272a] p-4 rounded-lg border border-zinc-700/50">
            <h4 className="text-amber-500 font-semibold text-sm mb-3">Foreign Country Residence</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Male</label>
                <input type="number" min="0" value={foreignM} onChange={(e) => setForeignM(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Female</label>
                <input type="number" min="0" value={foreignF} onChange={(e) => setForeignF(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>

          {/* Unspecified Residence */}
          <div className="bg-[#27272a] p-4 rounded-lg border border-zinc-700/50 md:col-span-2">
            <h4 className="text-amber-500 font-semibold text-sm mb-3">Unspecified Residence</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Male</label>
                <input type="number" min="0" value={unspecM} onChange={(e) => setUnspecM(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1">Female</label>
                <input type="number" min="0" value={unspecF} onChange={(e) => setUnspecF(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </div>

        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 border-t border-zinc-800 pt-6 mt-8">
          <Link 
            href="/visitor-records" 
            className="px-6 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-semibold"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSaving} 
            className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg transition-colors font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Update Record"}
          </button>
        </div>

      </form>
    </main>
  );
}