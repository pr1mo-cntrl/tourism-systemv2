"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";

export default function CreateVisitorRecord() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

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
    "101 - Mountains/hills/highlands",
    "102 - Falls",
    "103 - Lakes and Pond",
    "104 - River and Landscape (includes subterranean rivers)",
    "105 - Coastal Landscape and Seascape (e.g. dive sites, reefs)",
    "106 - Marine Park (e.g. aquarium, open parks)",
    "107 - Caves (inland)",
    "108 - Unique Natural Landscape / Seascape",
    "109 - Volcanoes",
    "199 - Other Natural Attractions (e.g. century old trees/forest, endemic species)",
    "201 - Fort",
    "202 - Church, Mosque or Temples",
    "203 - Historical Road/Trails",
    "204 - Historic Monuments",
    "205 - Museum",
    "206 - Structures and Buildings",
    "207 - Unique Cultural Heritage",
    "208 - Archaeological/Historic Sites",
    "299 - Other Historical or cultural attractions",
    "301 - Agro-Forestry",
    "302 - Farm and Ranch",
    "303 - Fishery",
    "304 - Arts and Craft",
    "305 - Industrial Facilities for Visitors",
    "401 - Golf",
    "402 - Tennis",
    "403 - Cycling Road and Area",
    "404 - Zoo and Botanical Garden",
    "405 - Sports Complex",
    "406 - Camping Ground",
    "407 - Nature Trail and Path",
    "408 - Beach for Sea Bathing",
    "409 - Pools and Springs",
    "410 - Marina and Harbor",
    "411 - Parks",
    "412 - Leisure-land, Theme Park",
    "413 - Resort Complex",
    "414 - Other Sports and Recreational Activities",
    "415 - Casino",
    "416 - Water Sports (Excludes Diving, see Nature Category)",
    "501 - Malls, Department Stores",
    "502 - Open Air Market, Traditional Market Area",
    "503 - Souvenirs And Delicacies",
    "601 - Local Specialty Restaurant",
    "602 - Festivals",
    "603 - Performing Arts (e.g. Folk Music and Dance)",
    "604 - Local Culture and Traditions (includes social practices and rituals)",
    "701 - Exposition",
    "702 - Convention",
    "703 - Sports Event",
    "799 - Other Events",
    "801 - Hot Spring",
    "802 - Cold Spring",
    "803 - Spa",
    "804 - Hospital/Clinics/Medical Tourism Facilities",
    "901 - Others (Please specify)"
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

  const attractionDetails: Record<string, { municipality: string; code: string }> = {
    "1300 LEVEL SWIMMING POOL": { municipality: "Itogon", code: "101 - Mountains/hills/highlands" },
    "ABAS HOT SPRING": { municipality: "Kibungan", code: "801 - Hot Spring" },
    "ABBAO RESORT": { municipality: "Buguias", code: "413 - Resort Complex" },
    "ADMIRALS FARM PARK": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "ADWAGAN RIVER": { municipality: "Bokod", code: "104 - River and Landscape (includes subterranean rivers)" },
    "AGRO-ECOTOURISM PARK": { municipality: "Itogon", code: "412 - Leisure-land, Theme Park" },
    "AHONDA CAVES, ROCK FORMATIONS AND JUNGLE ADVENTURE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "ALLYANA SOLENN'S RESORT": { municipality: "Tuba", code: "413 - Resort Complex" },
    "ALOKIP-PINAN ECO TRAIL": { municipality: "Tublay", code: "407 - Nature Trail and Path" },
    "AM-AM MADALIPEY VIEW": { municipality: "Mankayan", code: "301 - Man-made Parks / Gardens / View Decks" },
    "AMANDO'S LEMON PICKING FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "AMBIANCE GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "AMBUKLAO DAM": { municipality: "Bokod", code: "103 - Lakes and Pond" },
    "AMBURAYAN RIVER": { municipality: "Kapangan", code: "104 - River and Landscape (includes subterranean rivers)" },
    "ANENG RIVER & BAYOCBOC FALLS": { municipality: "Sablan", code: "102 - Falls" },
    "ARAN CAVE": { municipality: "Tuba", code: "107 - Caves (inland)" },
    "ASIN HOTSPRING": { municipality: "Tublay", code: "801 - Hot Spring" },
    "ASIN HOTSPRING POOTEN RESORT": { municipality: "Tuba", code: "801 - Hot Spring" },
    "ATV ADVENTURES": { municipality: "Atok", code: "414 - Other Sports and Recreational Activities" },
    "AVONG NEN ROMY": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "AZURE RIVERPOOL": { municipality: "Tuba", code: "409 - Pools and Springs" },
    "BAANGAN ESCAPADE": { municipality: "Mankayan", code: "412 - Leisure-land, Theme Park" },
    "BADI FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "BADOL CAMPING GROUND/ CAMP UTOPIA": { municipality: "Kapangan", code: "406 - Camping Ground" },
    "BAHONG SUNFLOWER FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "BANAO RIVER": { municipality: "Bokod", code: "104 - River and Landscape (includes subterranean rivers)" },
    "BAYOKBOK FALLS": { municipality: "Tublay", code: "102 - Falls" },
    "BEACON HILL ECO-PARK": { municipality: "Tublay", code: "411 - Parks" },
    "BELL CHURCH": { municipality: "La Trinidad", code: "202 - Church, Mosque or Temples" },
    "BENCAB MUSEUM": { municipality: "Tuba", code: "205 - Museum" },
    "BENGAONGAO CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "BENGUET AGRI-DEMO FARM/BULALA DEMO FARM": { municipality: "Sablan", code: "302 - Farm and Ranch" },
    "BENGUET MUSEUM": { municipality: "La Trinidad", code: "205 - Museum" },
    "BENGUET-KOCHI SISTERHOOD PARK/VEGETABLE FARMS/ MOSSY FOREST/HAIGHT'S PLACE": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "BIGGEST GONG": { municipality: "Mankayan", code: "204 - Historic Monuments" },
    "BINGA INDIGENOUS PEOPLES CULTURAL HERITAGE SITE (BIPCHS)": { municipality: "Itogon", code: "207 - Unique Cultural Heritage" },
    "BOBOK BISAL DOWN HILL BIKE TRAIL": { municipality: "Bokod", code: "403 - Cycling Road and Area" },
    "BOBOK PINE FOREST": { municipality: "Bokod", code: "101 - Mountains/hills/highlands" },
    "BOTEL RESORT": { municipality: "Buguias", code: "413 - Resort Complex" },
    "BREDCO RESORT": { municipality: "Tuba", code: "413 - Resort Complex" },
    "BROWNFIELDS BUILDERS": { municipality: "Tuba", code: "414 - Other Sports and Recreational Activities" },
    "BSU": { municipality: "La Trinidad", code: "206 - Structures and Buildings" },
    "BSU STRAWBERRY FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "BULALACAO CAVE": { municipality: "Kapangan", code: "107 - Caves (inland)" },
    "BURIAL CAVE": { municipality: "Tublay", code: "208 - Archaeological/Historic Sites" },
    "BURTON'S CABIN & YARD": { municipality: "Atok", code: "406 - Camping Ground" },
    "COLORADO FALLS": { municipality: "Tuba", code: "102 - Falls" },
    "COSMIC FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "CROSBY PARK": { municipality: "Itogon", code: "411 - Parks" },
    "D' RIDGE RECREATIONAL HUB": { municipality: "Tublay", code: "412 - Leisure-land, Theme Park" },
    "DAKLAN SULFUR SPRING (FORMERLY BADEKBEK HOT SPRING)": { municipality: "Bokod", code: "801 - Hot Spring" },
    "DARJANE'S FLOWER GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "DUMANAY BURIAL CAVE": { municipality: "Kapangan", code: "208 - Archaeological/Historic Sites" },
    "ELENA'S RESORT": { municipality: "Bokod", code: "413 - Resort Complex" },
    "ENCA ORGANIC FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "ETHANS SWIMMING POOL": { municipality: "Tuba", code: "409 - Pools and Springs" },
    "GARDEN NEN INES": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "GLAMPING SITE": { municipality: "Tublay", code: "406 - Camping Ground" },
    "GOAT CLIFF ROCK ADVENTURES": { municipality: "Atok", code: "414 - Other Sports and Recreational Activities" },
    "GREEN NARRAN CAMPSITE": { municipality: "Tuba", code: "406 - Camping Ground" },
    "HALF TUNNEL": { municipality: "Atok", code: "304 - Arts and Craft" },
    "HD MOUNTAINVILLE": { municipality: "Tuba", code: "101 - Mountains/hills/highlands" },
    "HERITAGE HOUSES": { municipality: "Itogon", code: "206 - Structures and Buildings" },
    "HIDDEN CYPRESS BOTANICAL GARDEN": { municipality: "Atok", code: "404 - Zoo and Botanical Garden" },
    "HIDDEN PARADISE SWIMMING POOL": { municipality: "Tuba", code: "409 - Pools and Springs" },
    "HIGH ACRES": { municipality: "Sablan", code: "301 - Man-made Parks / Gardens / View Decks" },
    "HIGHEST POINT": { municipality: "Atok", code: "101 - Mountains/hills/highlands" },
    "HYUVANA SWIMMING POOL": { municipality: "Bokod", code: "409 - Pools and Springs" },
    "INIDIAN VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "JEFFREY VISAYA'S VIEW": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "JLM FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "JOHN KENNY ORGANIC FARM/ JOHN JOSH FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "KAALNUSAN CAMPING GROUND": { municipality: "Tublay", code: "406 - Camping Ground" },
    "KAMP PATADAN": { municipality: "Bokod", code: "413 - Resort Complex" },
    "KENVIN'S GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "KETONG FALLS (BLUE LAGOON)": { municipality: "Tublay", code: "102 - Falls" },
    "KINTANA/ JUAKENMAR SWIMMING POOL": { municipality: "Bokod", code: "409 - Pools and Springs" },
    "KISSING CLOUDS AGRICULTURAL FARM": { municipality: "Tuba", code: "302 - Farm and Ranch" },
    "KIWAS RESORT": { municipality: "Tuba", code: "413 - Resort Complex" },
    "KIYOMIE'S GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LA TRINIDAD VEGETABLE TRADING POST": { municipality: "La Trinidad", code: "502 - Open Air Market, Traditional Market Area" },
    "LALLY'S GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LAS-ANG ECOTRAIL AND CABIN": { municipality: "Atok", code: "407 - Nature Trail and Path" },
    "LAY-ODAN FARM": { municipality: "Mankayan", code: "302 - Farm and Ranch" },
    "LEAVES & PETALS ECO-GARDEN RESORT": { municipality: "Sablan", code: "413 - Resort Complex" },
    "LEPANTO GOLF": { municipality: "Mankayan", code: "401 - Golf" },
    "LEPANTO MINE CAMP": { municipality: "Mankayan", code: "201 - Fort" },
    "LES-ENG RICE TERRACES": { municipality: "Kibungan", code: "207 - Unique Cultural Heritage" },
    "LILY OF THE VALLEY ORGANIC FARM": { municipality: "La Trinidad", code: "302 - Farm and Ranch" },
    "LIVING GIFTS NURSERY": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "LONGOG CAVE": { municipality: "Kapangan", code: "107 - Caves (inland)" },
    "LOURDES GROTTO": { municipality: "Atok", code: "202 - Church, Mosque or Temples" },
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
    "MT. CAMISONG FOREST PARKS AND EVENTS": { municipality: "Itogon", code: "411 - Parks" },
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
    "MUNICIPAL TOWN HALL (FESTIVAL/EVENTS/ACTIVITIES)": { municipality: "Kibungan", code: "701 - Exposition" },
    "NARO'S FARM": { municipality: "Kapangan", code: "302 - Farm and Ranch" },
    "NATIONAL MUSEUM": { municipality: "Kabayan", code: "205 - Museum" },
    "NATURE LOVER'S GARDEN": { municipality: "Tublay", code: "301 - Man-made Parks / Gardens / View Decks" },
    "NEVERLAND": { municipality: "Tuba", code: "413 - Resort Complex" },
    "NORTHERN BLOSSOM FLOWER FARM": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "ONGONG FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "OPDAS BURIAL CAVE": { municipality: "Kabayan", code: "208 - Archaeological/Historic Sites" },
    "ORGANIC FARMS(CARMELITA SACLEY'S FARM)": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "OSUCAN TUNNEL": { municipality: "Atok", code: "304 - Arts and Craft" },
    "OUR LADY OF LOURDES PARISH CHURCH": { municipality: "Kibungan", code: "202 - Church, Mosque or Temples" },
    "OVEK CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "PAHAK RESORT": { municipality: "Itogon", code: "413 - Resort Complex" },
    "PALANSA PANORAMIC VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "PALINA RICE TERRACES": { municipality: "Kibungan", code: "207 - Unique Cultural Heritage" },
    "PALM GROVE": { municipality: "Tuba", code: "413 - Resort Complex" },
    "PATAWID GYAYARI": { municipality: "La Trinidad", code: "207 - Unique Cultural Heritage" },
    "PATERNO CAVE": { municipality: "Tublay", code: "107 - Caves (inland)" },
    "PATTAN FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "PAYAY ROCK CLIMBING": { municipality: "Tublay", code: "414 - Other Sports and Recreational Activities" },
    "PEY-OG FALLS": { municipality: "Kapangan", code: "102 - Falls" },
    "PICKLES THORN FLOWER GARDEN": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "PIGINGAN/ BAJOMBONG FALLS": { municipality: "Bokod", code: "102 - Falls" },
    "PIKAW FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "POLIG'S BERRY FARM": { municipality: "Tublay", code: "302 - Farm and Ranch" },
    "PUGAD NI ARTS STUDIO": { municipality: "La Trinidad", code: "304 - Arts and Craft" },
    "PUGUIS COMMUNAL FOREST": { municipality: "La Trinidad", code: "101 - Mountains/hills/highlands" },
    "RIVERVIEW WATER PARK": { municipality: "Tuba", code: "409 - Pools and Springs" },
    "ROCKY MOUNTAIN ADVENTURE/  MT. TAYAWAN ECO PARK": { municipality: "La Trinidad", code: "412 - Leisure-land, Theme Park" },
    "ROCKY MOUNTAIN RESORT": { municipality: "La Trinidad", code: "413 - Resort Complex" },
    "SABLAN FRUIT FESTIVAL": { municipality: "Sablan", code: "602 - Festivals" },
    "SABLAN HILLS": { municipality: "Sablan", code: "101 - Mountains/hills/highlands" },
    "SADJATAN VIEWPOINT": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "SAGPAWE HIDDEN GARDEN": { municipality: "La Trinidad", code: "301 - Man-made Parks / Gardens / View Decks" },
    "SAGUIBALETE PARK (FORMERLY BALITE TREE)": { municipality: "Tublay", code: "411 - Parks" },
    "SIAM SIAM FALLS": { municipality: "Tublay", code: "102 - Falls" },
    "SINOT HOT SPRING": { municipality: "Tuba", code: "801 - Hot Spring" },
    "SPILL WAY VIEW": { municipality: "Bokod", code: "301 - Man-made Parks / Gardens / View Decks" },
    "STELLAR VIEW": { municipality: "Atok", code: "301 - Man-made Parks / Gardens / View Decks" },
    "STOBOSA HILLSIDE HOMES ARTWORKS": { municipality: "La Trinidad", code: "304 - Arts and Craft" },
    "SULFURIN HOT SPRING": { municipality: "Tuba", code: "801 - Hot Spring" },
    "SUVANI'S AVONG": { municipality: "Kapangan", code: "302 - Farm and Ranch" },
    "TACADANG MIGHTY GATES": { municipality: "Kibungan", code: "104 - River and Landscape (includes subterranean rivers)" },
    "TANAP RICE TERRACES": { municipality: "Kibungan", code: "207 - Unique Cultural Heritage" },
    "TAYAO FARMS": { municipality: "Atok", code: "302 - Farm and Ranch" },
    "TEKIP FALLS": { municipality: "Bakun", code: "102 - Falls" },
    "TIMBAC ROCKSHELTERS": { municipality: "Kabayan", code: "208 - Archaeological/Historic Sites" },
    "TINONGCHOL BURIAL ROCK": { municipality: "Kabayan", code: "208 - Archaeological/Historic Sites" },
    "TOWING WATERFALLS": { municipality: "Sablan", code: "102 - Falls" },
    "TUBLAY PASALUBONG CENTER": { municipality: "Tublay", code: "503 - Souvenirs And Delicacies" },
    "TUMPAO RESORT": { municipality: "Tuba", code: "413 - Resort Complex" },
    "UM-A FARM": { municipality: "Tuba", code: "302 - Farm and Ranch" },
    "VALLEYWOOD ADVENTURE PARK": { municipality: "La Trinidad", code: "412 - Leisure-land, Theme Park" },
    "WAGANGAN ROCK FORMATION": { municipality: "Atok", code: "108 - Unique Natural Landscape / Seascape" },
    "WINACA ECO CULTURAL VILLAGE AND FOREST HOMES": { municipality: "Tublay", code: "207 - Unique Cultural Heritage" }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from("visitor_records")
      .insert([{
        month,
        year,
        municipality,
        municipality_name: municipality, // <-- ADD THIS LINE RIGHT HERE
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
      }]);

    setIsSaving(false);

    if (error) {
      alert("Error saving record: " + error.message);
    } else {
      router.push("/visitor-records");
      router.refresh();
    }
  };

  return (
    <main className="p-8 max-w-5xl mx-auto">
      
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 mb-4 text-sm text-zinc-400 font-medium">
        <Link href="/visitor-records" className="hover:text-white transition-colors">Visitor Records</Link>
        <span className="text-zinc-600">{'>'}</span>
        <span className="text-zinc-200">New Record</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">Create Tourist Attraction Record</h1>

      <form onSubmit={handleSubmit} className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 shadow-xl">
        
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
              onChange={(e) => {
                const selectedAtt = e.target.value;
                setAttractionName(selectedAtt);
                
                // Automatically fill municipality AND attraction code!
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

          {/* Municipality Dropdown */}
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

          {/* Attraction Code Standard Select Dropdown */}
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
            {isSaving ? "Saving..." : "Save Record"}
          </button>
        </div>

      </form>
    </main>
  );
}