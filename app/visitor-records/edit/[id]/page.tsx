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
    "1300 LEVEL SWIMMING POOL", "ABAS HOT SPRING", "ABBAO RESORT", "ADMIRALS FARM PARK", 
    "ADWAGAN RIVER", "AGRO-ECOTOURISM PARK", "AHONDA CAVES, ROCK FORMATIONS AND JUNGLE ADVENTURE", 
    "ALLYANA SOLENN'S RESORT", "ALOKIP-PINAN ECO TRAIL", "AM-AM MADALIPEY VIEW", 
    "AMANDO'S LEMON PICKING FARM", "AMBIANCE GARDEN", "AMBUKLAO DAM", "AMBURAYAN RIVER", 
    "ANENG RIVER & BAYOCBOC FALLS", "ARAN CAVE", "ASIN HOTSPRING", "ASIN HOTSPRING POOTEN RESORT", 
    "ATV ADVENTURES", "AVONG NEN ROMY", "AZURE RIVERPOOL", "BAANGAN ESCAPADE", "BADI FALLS", 
    "BADOL CAMPING GROUND/ CAMP UTOPIA", "BAHONG SUNFLOWER FARM", "BANAO RIVER", "BAYOKBOK FALLS", 
    "BEACON HILL ECO-PARK", "BELL CHURCH", "BENCAB MUSEUM", "BENGAONGAO CAVE", 
    "BENGUET AGRI-DEMO FARM/BULALA DEMO FARM", "BENGUET MUSEUM", 
    "BENGUET-KOCHI SISTERHOOD PARK/VEGETABLE FARMS/ MOSSY FOREST/HAIGHT'S PLACE", "BIGGEST GONG", 
    "BINGA INDIGENOUS PEOPLES CULTURAL HERITAGE SITE (BIPCHS)", "BOBOK BISAL DOWN HILL BIKE TRAIL", 
    "BOBOK PINE FOREST", "BOTEL RESORT", "BREDCO RESORT", "BROWNFIELDS BUILDERS", "BSU", 
    "BSU STRAWBERRY FARM", "BULALACAO CAVE", "BURIAL CAVE", "BURTON'S CABIN & YARD", 
    "COLORADO FALLS", "COSMIC FARM", "CROSBY PARK", "D' RIDGE RECREATIONAL HUB", 
    "DAKLAN SULFUR SPRING (FORMERLY BADEKBEK HOT SPRING)", "DARJANE'S FLOWER GARDEN", 
    "DUMANAY BURIAL CAVE", "ELENA'S RESORT", "ENCA ORGANIC FARM", "ETHANS SWIMMING POOL", 
    "GARDEN NEN INES", "GLAMPING SITE", "GOAT CLIFF ROCK ADVENTURES", "GREEN NARRAN CAMPSITE", 
    "HALF TUNNEL", "HD MOUNTAINVILLE", "HERITAGE HOUSES", "HIDDEN CYPRESS BOTANICAL GARDEN", 
    "HIDDEN PARADISE SWIMMING POOL", "HIGH ACRES", "HIGHEST POINT", "HYUVANA SWIMMING POOL", 
    "INIDIAN VIEW", "JEFFREY VISAYA'S VIEW", "JLM FARM", "JOHN KENNY ORGANIC FARM/ JOHN JOSH FARM", 
    "KAALNUSAN CAMPING GROUND", "KAMP PATADAN", "KENVIN'S GARDEN", "KETONG FALLS (BLUE LAGOON)", 
    "KINTANA/ JUAKENMAR SWIMMING POOL", "KISSING CLOUDS AGRICULTURAL FARM", "KIWAS RESORT", 
    "KIYOMIE'S GARDEN", "LA TRINIDAD VEGETABLE TRADING POST", "LALLY'S GARDEN", 
    "LAS-ANG ECOTRAIL AND CABIN", "LAY-ODAN FARM", "LEAVES & PETALS ECO-GARDEN RESORT", 
    "LEPANTO GOLF", "LEPANTO MINE CAMP", "LES-ENG RICE TERRACES", "LILY OF THE VALLEY ORGANIC FARM", 
    "LIVING GIFTS NURSERY", "LONGOG CAVE", "LOURDES GROTTO", "LUBO LAKE", "MADAYMEN VEGETABLE TERRACES", 
    "MANGTA FALLS", "MARTINS HOBBIT HOUSE", "MERLYN'S GARDEN", "MOUNT COSTA", 
    "MOUNT POKKONG(FORMERLY MT. POGKONG)", "MT. AL-AL", "MT. ANAP-PIGINGAN", "MT. BIDAWAN", 
    "MT. CAMISONG FOREST PARKS AND EVENTS", "MT. DAKIWAGAN", "MT. GEDGEDAYYAN", "MT. KABUNIAN", 
    "MT. KALUGONG", "MT. KILKILI", "MT. MARIKIT", "MT. OLIS VIEWPOINT", "MT. OTEN", 
    "MT. PATULLOK (MT. LOBO)", "MT. PIGINGAN", "MT. PULAG", "MT. PURGATORY", "MT. TABAYOK AND 4 LAKES", 
    "MT. TAGPAYA", "MT. TAGPEW", "MT. TENGLAWAN", "MT. TIMBAC SUMMIT", "MT. UGO", "MT. ULAP", 
    "MT. YANGBEW", "MUNICIPAL TOWN HALL (FESTIVAL/EVENTS/ACTIVITIES)", "NARO'S FARM", "NATIONAL MUSEUM", 
    "NATURE LOVER'S GARDEN", "NEVERLAND", "NORTHERN BLOSSOM FLOWER FARM", "ONGONG FALLS", 
    "OPDAS BURIAL CAVE", "ORGANIC FARMS(CARMELITA SACLEY'S FARM)", "OSUCAN TUNNEL", 
    "OUR LADY OF LOURDES PARISH CHURCH", "OVEK CAVE", "PAHAK RESORT", "PALANSA PANORAMIC VIEW", 
    "PALINA RICE TERRACES", "PALM GROVE", "PATAWID GYAYARI", "PATERNO CAVE", "PATTAN FALLS", 
    "PAYAY ROCK CLIMBING", "PEY-OG FALLS", "PICKLES THORN FLOWER GARDEN", "PIGINGAN/ BAJOMBONG FALLS", 
    "PIKAW FALLS", "POLIG'S BERRY FARM", "PUGAD NI ARTS STUDIO", "PUGUIS COMMUNAL FOREST", 
    "RIVERVIEW WATER PARK", "ROCKY MOUNTAIN ADVENTURE/  MT. TAYAWAN ECO PARK", "ROCKY MOUNTAIN RESORT", 
    "SABLAN FRUIT FESTIVAL", "SABLAN HILLS", "SADJATAN VIEWPOINT", "SAGPAWE HIDDEN GARDEN", 
    "SAGUIBALETE PARK (FORMERLY BALITE TREE)", "SIAM SIAM FALLS", "SINOT HOT SPRING", "SPILL WAY VIEW", 
    "STELLAR VIEW", "STOBOSA HILLSIDE HOMES ARTWORKS", "SULFURIN HOT SPRING", "SUVANI'S AVONG", 
    "TACADANG MIGHTY GATES", "TANAP RICE TERRACES", "TAYAO FARMS", "TEKIP FALLS", "TIMBAC ROCKSHELTERS", 
    "TINONGCHOL BURIAL ROCK", "TOWING WATERFALLS", "TUBLAY PASALUBONG CENTER", "TUMPAO RESORT", 
    "UM-A FARM", "VALLEYWOOD ADVENTURE PARK", "WAGANGAN ROCK FORMATION", 
    "WINACA ECO CULTURAL VILLAGE AND FOREST HOMES"
  ];

  // Added the mapping dictionary to the Edit page!
  const attractionDetails: Record<string, { municipality: string; code: string }> = {
    "1300 LEVEL SWIMMING POOL": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "ABAS HOT SPRING": { municipality: "Kibungan", code: "801 - Hot Spring" },
    "ABBAO RESORT": { municipality: "Buguias", code: "601 - Resorts / Hotels / Inns" },
    "ADMIRALS FARM PARK": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "ADWAGAN RIVER": { municipality: "Bokod", code: "104 - River and Landscape (includes subterranean rivers)" },
    "AGRO-ECOTOURISM PARK": { municipality: "Itogon", code: "301 - Man-made Parks / Gardens / View Decks" },
    "AHONDA CAVES, ROCK FORMATIONS AND JUNGLE ADVENTURE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "ALLYANA SOLENN'S RESORT": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "ALOKIP-PINAN ECO TRAIL": { municipality: "Tublay", code: "303 - Adventure / Recreational Parks" },
    "AM-AM MADALIPEY VIEW": { municipality: "Mankayan", code: "301 - Man-made Parks / Gardens / View Decks" },
    "AMANDO'S LEMON PICKING FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "AMBIANCE GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "AMBUKLAO DAM": { municipality: "Bokod", code: "103 - Lakes and Pond" },
    "AMBURAYAN RIVER": { municipality: "Kapangan", code: "104 - River and Landscape (includes subterranean rivers)" },
    "ANENG RIVER & BAYOCBOC FALLS": { municipality: "Sablan", code: "102 - Falls" },
    "ARAN CAVE": { municipality: "Tuba", code: "107 - Caves (inland)" },
    "ASIN HOTSPRING": { municipality: "Tublay", code: "801 - Hot Spring" },
    "ASIN HOTSPRING POOTEN RESORT": { municipality: "Tuba", code: "801 - Hot Spring" },
    "ATV ADVENTURES": { municipality: "Atok", code: "502 - Sports Complexes / Golf Courses / Bike Trails" },
    "AVONG NEN ROMY": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "AZURE RIVERPOOL": { municipality: "Tuba", code: "501 - Swimming Pools / Water Parks" },
    "BAANGAN ESCAPADE": { municipality: "Mankayan", code: "303 - Adventure / Recreational Parks" },
    "BADI FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "BADOL CAMPING GROUND/ CAMP UTOPIA": { municipality: "Kapangan", code: "303 - Adventure / Recreational Parks" },
    "BAHONG SUNFLOWER FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "BANAO RIVER": { municipality: "Bokod", code: "104 - River and Landscape (includes subterranean rivers)" },
    "BAYOKBOK FALLS": { municipality: "Tublay", code: "102 - Falls" },
    "BEACON HILL ECO-PARK": { municipality: "Tublay", code: "301 - Man-made Parks / Gardens / View Decks" },
    "BELL CHURCH": { municipality: "La Trinidad", code: "401 - Churches / Cathedrals / Chapels" },
    "BENCAB MUSEUM": { municipality: "Tuba", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "BENGAONGAO CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "BENGUET AGRI-DEMO FARM/BULALA DEMO FARM": { municipality: "Sablan", code: "302 - Farm and Ranch" },
    "BENGUET MUSEUM": { municipality: "La Trinidad", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "BENGUET-KOCHI SISTERHOOD PARK/VEGETABLE FARMS/ MOSSY FOREST/HAIGHT'S PLACE": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "BIGGEST GONG": { municipality: "Mankayan", code: "201 - Historical Landmarks / Shrines / Monuments" },
    "BINGA INDIGENOUS PEOPLES CULTURAL HERITAGE SITE (BIPCHS)": { municipality: "Itogon", code: "203 - Indigenous / Traditional Villages" },
    "BOBOK BISAL DOWN HILL BIKE TRAIL": { municipality: "Bokod", code: "502 - Sports Complexes / Golf Courses / Bike Trails" },
    "BOBOK PINE FOREST": { municipality: "Bokod", code: "101 - Mountains/hills/highlands" },
    "BOTEL RESORT": { municipality: "Buguias", code: "601 - Resorts / Hotels / Inns" },
    "BREDCO RESORT": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "BROWNFIELDS BUILDERS": { municipality: "Tuba", code: "304 - Bridges / Tunnels / Infrastructure" },
    "BSU": { municipality: "La Trinidad", code: "299 - Other Historical / Cultural Attractions" },
    "BSU STRAWBERRY FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "BULALACAO CAVE": { municipality: "Kapangan", code: "107 - Caves (inland)" },
    "BURIAL CAVE": { municipality: "Tublay", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "BURTON'S CABIN & YARD": { municipality: "Atok", code: "602 - Transient Houses / Homestays / Glamping Sites" },
    "COLORADO FALLS": { municipality: "Tuba", code: "102 - Falls" },
    "COSMIC FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "CROSBY PARK": { municipality: "Itogon", code: "301 - Man-made Parks / Gardens / View Decks" },
    "D' RIDGE RECREATIONAL HUB": { municipality: "Tublay", code: "303 - Adventure / Recreational Parks" },
    "DAKLAN SULFUR SPRING (FORMERLY BADEKBEK HOT SPRING)": { municipality: "Bokod", code: "801 - Hot Spring" },
    "DARJANE'S FLOWER GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "DUMANAY BURIAL CAVE": { municipality: "Kapangan", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "ELENA'S RESORT": { municipality: "Bokod", code: "601 - Resorts / Hotels / Inns" },
    "ENCA ORGANIC FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "ETHANS SWIMMING POOL": { municipality: "Tuba", code: "501 - Swimming Pools / Water Parks" },
    "GARDEN NEN INES": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "GLAMPING SITE": { municipality: "Tublay", code: "602 - Transient Houses / Homestays / Glamping Sites" },
    "GOAT CLIFF ROCK ADVENTURES": { municipality: "Atok", code: "303 - Adventure / Recreational Parks" },
    "GREEN NARRAN CAMPSITE": { municipality: "Tuba", code: "602 - Transient Houses / Homestays / Glamping Sites" },
    "HALF TUNNEL": { municipality: "Atok", code: "304 - Bridges / Tunnels / Infrastructure" },
    "HD MOUNTAINVILLE": { municipality: "Tuba", code: "101 - Mountains/hills/highlands" },
    "HERITAGE HOUSES": { municipality: "Itogon", code: "203 - Indigenous / Traditional Villages" },
    "HIDDEN CYPRESS BOTANICAL GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "HIDDEN PARADISE SWIMMING POOL": { municipality: "Tuba", code: "501 - Swimming Pools / Water Parks" },
    "HIGH ACRES": { municipality: "Sablan", code: "301 - Man-made Parks / Gardens / View Decks" },
    "HIGHEST POINT": { municipality: "Atok", code: "101 - Mountains/hills/highlands" },
    "HYUVANA SWIMMING POOL": { municipality: "Bokod", code: "501 - Swimming Pools / Water Parks" },
    "INIDIAN VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "JEFFREY VISAYA'S VIEW": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "JLM FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "JOHN KENNY ORGANIC FARM/ JOHN JOSH FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "KAALNUSAN CAMPING GROUND": { municipality: "Tublay", code: "602 - Transient Houses / Homestays / Glamping Sites" },
    "KAMP PATADAN": { municipality: "Bokod", code: "601 - Resorts / Hotels / Inns" },
    "KENVIN'S GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "KETONG FALLS (BLUE LAGOON)": { municipality: "Tublay", code: "102 - Falls" },
    "KINTANA/ JUAKENMAR SWIMMING POOL": { municipality: "Bokod", code: "501 - Swimming Pools / Water Parks" },
    "KISSING CLOUDS AGRICULTURAL FARM": { municipality: "Tuba", code: "302 - Farm and Ranch" },
    "KIWAS RESORT": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "KIYOMIE'S GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LA TRINIDAD VEGETABLE TRADING POST": { municipality: "La Trinidad", code: "703 - Trading Posts / Pasalubong Centers" },
    "LALLY'S GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LAS-ANG ECOTRAIL AND CABIN": { municipality: "Atok", code: "101 - Mountains/hills/highlands" },
    "LAY-ODAN FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "LEAVES & PETALS ECO-GARDEN RESORT": { municipality: "Sablan", code: "601 - Resorts / Hotels / Inns" },
    "LEPANTO GOLF": { municipality: "Mankayan", code: "502 - Sports Complexes / Golf Courses / Bike Trails" },
    "LEPANTO MINE CAMP": { municipality: "Mankayan", code: "201 - Historical Landmarks / Shrines / Monuments" },
    "LES-ENG RICE TERRACES": { municipality: "Kibungan", code: "108 - Unique Natural Landscape / Seascape" },
    "LILY OF THE VALLEY ORGANIC FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "LIVING GIFTS NURSERY": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LONGOG CAVE": { municipality: "Kapangan", code: "107 - Caves (inland)" },
    "LOURDES GROTTO": { municipality: "Atok", code: "402 - Pilgrimage Sites / Stations of the Cross" },
    "LUBO LAKE": { municipality: "Kibungan", code: "103 - Lakes and Pond" },
    "MADAYMEN VEGETABLE TERRACES": { municipality: "Kibungan", code: "302 - Farm and Ranch" },
    "MANGTA FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "MARTINS HOBBIT HOUSE": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "MERLYN'S GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "MOUNT COSTA": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "MOUNT POKKONG(FORMERLY MT. POGKONG)": { municipality: "Tublay", code: "101 - Mountains/hills/highlands" },
    "MT. AL-AL": { municipality: "Kabayan", code: "101 - Mountains/hills/highlands" },
    "MT. ANAP-PIGINGAN": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. BIDAWAN": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. CAMISONG FOREST PARKS AND EVENTS": { municipality: "Itogon", code: "301 - Man-made Parks / Gardens / View Decks" },
    "MT. DAKIWAGAN": { municipality: "Kapangan", code: "101 - Mountains/hills/highlands" },
    "MT. GEDGEDAYYAN": { municipality: "Bakun", code: "101 - Mountains/hills/highlands" },
    "MT. KABUNIAN": { municipality: "Bakun", code: "101 - Mountains/hills/highlands" },
    "MT. KALUGONG": { municipality: "La Trinidad", code: "101 - Mountains/hills/highlands" },
    "MT. KILKILI": { municipality: "Kibungan", code: "101 - Mountains/hills/highlands" },
    "MT. MARIKIT": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. OLIS VIEWPOINT": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "MT. OTEN": { municipality: "Kibungan", code: "101 - Mountains/hills/highlands" },
    "MT. PATULLOK (MT. LOBO)": { municipality: "Bakun", code: "101 - Mountains/hills/highlands" },
    "MT. PIGINGAN": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. PULAG": { municipality: "Kabayan", code: "101 - Mountains/hills/highlands" },
    "MT. PURGATORY": { municipality: "Bokod", code: "101 - Mountains/hills/highlands" },
    "MT. TABAYOK AND 4 LAKES": { municipality: "Kabayan", code: "103 - Lakes and Pond" },
    "MT. TAGPAYA": { municipality: "Kibungan", code: "101 - Mountains/hills/highlands" },
    "MT. TAGPEW": { municipality: "Kibungan", code: "101 - Mountains/hills/highlands" },
    "MT. TENGLAWAN": { municipality: "Bakun", code: "101 - Mountains/hills/highlands" },
    "MT. TIMBAC SUMMIT": { municipality: "Atok", code: "101 - Mountains/hills/highlands" },
    "MT. UGO": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. ULAP": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "MT. YANGBEW": { municipality: "La Trinidad", code: "101 - Mountains/hills/highlands" },
    "MUNICIPAL TOWN HALL (FESTIVAL/EVENTS/ACTIVITIES)": { municipality: "Kibungan", code: "701 - Municipal Town Halls / Event Centers" },
    "NARO'S FARM": { municipality: "Kapangan", code: "302 - Farm and Ranch" },
    "NATIONAL MUSEUM": { municipality: "Kabayan", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "NATURE LOVER'S GARDEN": { municipality: "Tublay", code: "301 - Man-made Parks / Gardens / View Decks" },
    "NEVERLAND": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "NORTHERN BLOSSOM FLOWER FARM": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "ONGONG FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "OPDAS BURIAL CAVE": { municipality: "Kabayan", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "ORGANIC FARMS(CARMELITA SACLEY'S FARM)": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "OSUCAN TUNNEL": { municipality: "Atok", code: "304 - Bridges / Tunnels / Infrastructure" },
    "OUR LADY OF LOURDES PARISH CHURCH": { municipality: "Kibungan", code: "401 - Churches / Cathedrals / Chapels" },
    "OVEK CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "PAHAK RESORT": { municipality: "Itogon", code: "601 - Resorts / Hotels / Inns" },
    "PALANSA PANORAMIC VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "PALINA RICE TERRACES": { municipality: "Kibungan", code: "108 - Unique Natural Landscape / Seascape" },
    "PALM GROVE": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "PATAWID GYAYARI": { municipality: "La Trinidad", code: "203 - Indigenous / Traditional Villages" },
    "PATERNO CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "PATTAN FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "PAYAY ROCK CLIMBING": { municipality: "Tublay", code: "303 - Adventure / Recreational Parks" },
    "PEY-OG FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "PICKLES THORN FLOWER GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "PIGINGAN/ BAJOMBONG FALLS": { municipality: "Bokod", code: "102 - Falls" },
    "PIKAW FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "POLIG'S BERRY FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "PUGAD NI ARTS STUDIO": { municipality: "La Trinidad", code: "299 - Other Historical / Cultural Attractions" },
    "PUGUIS COMMUNAL FOREST": { municipality: "La Trinidad", code: "101 - Mountains/hills/highlands" },
    "RIVERVIEW WATER PARK": { municipality: "Tuba", code: "501 - Swimming Pools / Water Parks" },
    "ROCKY MOUNTAIN ADVENTURE/  MT. TAYAWAN ECO PARK": { municipality: "La Trinidad", code: "303 - Adventure / Recreational Parks" },
    "ROCKY MOUNTAIN RESORT": { municipality: "La Trinidad", code: "601 - Resorts / Hotels / Inns" },
    "SABLAN FRUIT FESTIVAL": { municipality: "Sablan", code: "702 - Festival Grounds / Activity Areas" },
    "SABLAN HILLS": { municipality: "Sablan", code: "101 - Mountains/hills/highlands" },
    "SADJATAN VIEWPOINT": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "SAGPAWE HIDDEN GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "SAGUIBALETE PARK (FORMERLY BALITE TREE)": { municipality: "Tublay", code: "301 - Man-made Parks / Gardens / View Decks" },
    "SIAM SIAM FALLS": { municipality: "Tublay", code: "102 - Falls" },
    "SINOT HOT SPRING": { municipality: "Tuba", code: "801 - Malls / Commercial Centers / Markets" }, 
    "SPILL WAY VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "STELLAR VIEW": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "STOBOSA HILLSIDE HOMES ARTWORKS": { municipality: "La Trinidad", code: "299 - Other Historical / Cultural Attractions" },
    "SULFURIN HOT SPRING": { municipality: "Tuba", code: "801 - Malls / Commercial Centers / Markets" },
    "SUVANI'S AVONG": { municipality: "Kapangan", code: "602 - Transient Houses / Homestays / Glamping Sites" },
    "TACADANG MIGHTY GATES": { municipality: "Kibungan", code: "101 - Mountains/hills/highlands" },
    "TANAP RICE TERRACES": { municipality: "Kibungan", code: "108 - Unique Natural Landscape / Seascape" },
    "TAYAO FARMS": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "TEKIP FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "TIMBAC ROCKSHELTERS": { municipality: "Kabayan", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "TINONGCHOL BURIAL ROCK": { municipality: "Kabayan", code: "202 - Cultural Heritage Sites / Museums / Burial Caves" },
    "TOWING WATERFALLS": { municipality: "Sablan", code: "102 - Falls" },
    "TUBLAY PASALUBONG CENTER": { municipality: "Tublay", code: "703 - Trading Posts / Pasalubong Centers" },
    "TUMPAO RESORT": { municipality: "Tuba", code: "601 - Resorts / Hotels / Inns" },
    "UM-A FARM": { municipality: "Tuba", code: "302 - Farm and Ranch" },
    "VALLEYWOOD ADVENTURE PARK": { municipality: "La Trinidad", code: "303 - Adventure / Recreational Parks" },
    "WAGANGAN ROCK FORMATION": { municipality: "Atok", code: "108 - Unique Natural Landscape / Seascape" },
    "WINACA ECO CULTURAL VILLAGE AND FOREST HOMES": { municipality: "Tublay", code: "203 - Indigenous / Traditional Villages" }
  };

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

          {/* Tourist Attraction Name Dropdown - ADDED ONCHANGE AUTO-FILL LOGIC HERE! */}
          <div className="md:col-span-2">
            <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Tourist Attraction Name *</label>
            <select 
              required 
              value={attractionName} 
              onChange={(e) => {
                const selectedAtt = e.target.value;
                setAttractionName(selectedAtt);
                
                // Automatically fill municipality AND attraction code
                const details = attractionDetails[selectedAtt];
                if (details) {
                  setMunicipality(details.municipality);
                  setAttractionCode(details.code);
                }
              }} 
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