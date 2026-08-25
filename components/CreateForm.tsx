"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import Link from "next/link";

export default function CreateForm() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Basic Info State
  const [name, setName] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [accType, setAccType] = useState("");
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  
  // Capacity & Occupancy State
  const [noOfRooms, setNoOfRooms] = useState(0);
  const [roomsOccupied, setRoomsOccupied] = useState(0);
  
  // STAFFS MALE AND FEMALE
  const [maleStaff, setMaleStaff] = useState(0);
  const [femaleStaff, setFemaleStaff] = useState(0);

  // Arrivals (Guests) State
  const [gaPh, setGaPh] = useState(0);
  const [gaNonFil, setGaNonFil] = useState(0);
  const [gaOverseas, setGaOverseas] = useState(0);
  const [gaUnspecified, setGaUnspecified] = useState(0);

  // Nights State
  const [gnPh, setGnPh] = useState(0);
  const [gnNonFil, setGnNonFil] = useState(0);
  const [gnOverseas, setGnOverseas] = useState(0);
  const [gnUnspecified, setGnUnspecified] = useState(0);

  // Origin Tracking
  const [filipinoOrigin, setFilipinoOrigin] = useState("");
  const [foreignOrigin, setForeignOrigin] = useState("");
  const [overseasOrigin, setOverseasOrigin] = useState("");

  // Auto-calculate total nights instantly
  const totalNights = Number(gnPh) + Number(gnNonFil) + Number(gnOverseas) + Number(gnUnspecified);
  const totalGuests = Number(gaPh) + Number(gaNonFil) + Number(gaOverseas) + Number(gaUnspecified);

  // The 13 Municipalities of Benguet
  const benguetMunicipalities = [
    "Atok", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan", 
    "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan", "Tuba", "Tublay"
  ];

  // Master list of 178 accommodations
  const accommodationsMasterList = [
    "3RD FLOOR MULTI-PURPOSE BUILDING, TINONGDAN",
    "5J'S CAMPSITE AND HOMESTAY",
    "ABBAO RESORT",
    "ABONG NEN JUAN",
    "ABONG NEN JUAN TAN TENIA",
    "ADELLE'S TRANSIENT",
    "AGNES HOMESTAY",
    "AKIKI TOURIST INN",
    "ALOS HOMESTAY",
    "ALPHALAND BAGUIO MOUNTAIN LODGES",
    "ALPINE G'S LODGE AND RESTAURANT",
    "AMAPOLA CLIFF TRANSIENT HOUSE",
    "AMBROCIO HOMESTAY",
    "AMIGO HOMESTAY",
    "ANGLUBEN HOMESTAY",
    "ARLENE HOMESTAY",
    "ASIN HOTSPRING POOTEN RESORT",
    "ATOK HAVEN TRANSIENT HOUSE",
    "AVIC'S HOMESTAY",
    "AVONG NEN SUVANI CULTURAL HERITAGE HOME",
    "BABAN BOY HOMESTAY",
    "BABAN HOMESTAY- NEDA (04)",
    "BABAN'S HOMESTAY- JALLEN  (05)",
    "BABAN'S HOMESTAY- SUSAN  (02)",
    "BABAN'S HOMESTAY-SYLVIA (03)",
    "BAGAYAO HOMESTAY",
    "BAHAY NI KUYA ROLI HOMESTAY",
    "BAKUN CENTRAL SCHOOL H.E. BUILDING",
    "BAKUN MUNICIPAL GUEST HOUSE",
    "BALAI TAKO (BY NOBLE NEST REALTY AND SERVICES)",
    "BALAY NA KAHOY",
    "BALEY NEN KAMORA",
    "BALI BEATA LODGING HOME",
    "BALLAY TRANSIENT HOUSE",
    "BAPTC GUESTEL",
    "BARANGAY GUEST ROOM",
    "BATAKAGAN HOMESTAY",
    "BCV TRANSIENT HOUSE",
    "BENITOS HOMESTAY",
    "BERNARD HOMESTAY",
    "BEYONDBAGUIO CAFÉ",
    "BEZ AND OH LODGING HOME",
    "BONTIGI'S TRANSIENT HOUSE",
    "BOTEL RESORT",
    "BREEZY HOMESTAY",
    "BRGY. TINONGDAN HOMESTAY",
    "BRUCELENESS HOMESTAY",
    "BSU GLADIOLA CENTER",
    "BSU-BUGUIAS GUEST HOUSE",
    "BUDA'S TRANSIENT",
    "BURTON'S CABIN AND YARD",
    "CAMSOL INN formerly JACS HOMESTAY",
    "CASA YSABELLE",
    "CHERRY MAE'S TRANSIENT",
    "CITYSIDE BED NAD BREAKFAST (MANAGED BY BIG BELLY BUFFET)",
    "CJ PEARL TRANSIENT",
    "CLEOS TRANSIENT HOUSE",
    "CLOUDFIELD TRANSIENT HOUSE",
    "CLOUDGAZER HOMESTAY",
    "CORNELIA HOMESTAY",
    "COSMIC FARM",
    "DENCIO'S HOMESTAY",
    "DITAS HOMESTAY",
    "ED'S HOMESTAY",
    "ELENA'S RESORT",
    "ERGIM TRANSIENT HOUSE",
    "ESAY HOMESTAY",
    "EVA HOMESTAY",
    "EVER LODGE",
    "Everest Lodge",
    "FELICIANO HOMESTAY",
    "FERNANDEZ HOMESTAY",
    "FRED AGUINSE HOMESTAY",
    "G4D'S TRANSIENT HOUSE",
    "GARCIA HOMESTAY",
    "GARDEN NEN INES",
    "GOOD MORNING POTTINGSHED",
    "HAIGHT'S  COZY CHALET",
    "HAIGHT'S PLACE",
    "HEARTSVILLE TRANSIENT HOUSE",
    "HELP ENGLISH LANGUAGE PROGRAM",
    "HERITAGE FARM HOMESTAY",
    "HI-ACRES CAMP",
    "HIGHLAND BLOSSOMS",
    "INA PURINGS TRANSIENT HOUSE",
    "ISAAC JORDAN TRANSIENT",
    "ITOGON MOUNTAIN VILLAGE CABINS",
    "Imeelou Inn & Resort",
    "JENELIN HOMESTAY",
    "JEWEL IGOROT BUILDING",
    "JONELIN HOMESTAY",
    "JRL TRANSIENT HOUSE",
    "JS LODGE",
    "JUBAN HOMESTAY",
    "KALAHAN HOMESTAY",
    "KINGS CABIN TRANSIENT HOUSE",
    "KOMEDOR CAFÉ AND INN (CHERYL ANN A. CAJIGAN)",
    "Kabatuan I nn & Resort",
    "LA TRINIDAD HOMESTAY",
    "LA-FE HOMESTAY",
    "LAY-ODAN FARM (HECTOR D. DELA CRUZ)",
    "LAZY BEAR",
    "LEAVES & PETALS ECO-GARDEN RESORT",
    "LEAVES & SPIKES TRANSIENT HOUSE",
    "LOLA BEEZ TRANSIENT",
    "LOLA NILDA'S AGRITOURISM PARK-HOMESTAY",
    "LOLA'S CASA RENTAL",
    "LOLA'S GRAND HOMESTAY",
    "LOLO CANCIO'S TRAVELODGE",
    "LOYUNG'S HOMESTAY",
    "LUPONAN MULTIPURPOSE BUILDING",
    "LUSTREA TRANSIENT HOUSE",
    "M-LLANA'S TRANSIENT HOUSE",
    "MAGIC LODGE",
    "MAMITAS HOMESTAY",
    "MANUEL HOMESTAY",
    "MARK'S TRAVELLERS VIEW DECK INN",
    "MAYFLOR'S FASTFOOD HAUS AND LODGING",
    "MAYOR'S QAURTER",
    "ME-AN HOMESTAY",
    "MICHELLE P. MANGALLAY",
    "MILBUR HOMESTAY",
    "MT. PULAG FOREVER",
    "MUNICIPAL BUILDING",
    "MUNICIPAL GUEST HOUSE",
    "MUNICIPAL TOURISM GUESTROOM",
    "NANAY HONORIA",
    "NATURE TOWER HOTEL",
    "NEWMOON CHALET",
    "NIVERA HOMESTAY",
    "NORTHERN BLOSSOM TRANSIENT",
    "NORTHERN BLOSSOMS FARM LODGING",
    "OMAG-MUNICIPAL NURSERY GUEST HOUSE",
    "ORLENES HOMESTAY",
    "OSDAWEN HOMESTAY",
    "OUR LADY OF LOURDES PARISH GUEST HOUSE",
    "OUR NORTHERN HOME TRANSIENT HOUSE",
    "PALM GROVE HOTSPRING AND MOUNTAIN RESORT",
    "PINE CONE LODGE",
    "POBLACION EVACUATION CENTER",
    "PRECIOUS TWINS LODGE (REYNALDO D. PALOMO)",
    "PULTAK LODGE",
    "RAG HOMESTAY",
    "REGINE HOMESTAY",
    "RIDDLEVIEW TRANSIENT HOUSE",
    "RIVERFRONT HOMESTAY",
    "RIVERVIEW WATERPARK",
    "RK'S GARDEN BREEZE HOTEL AND RESTAURANT",
    "RKK'S TRANSIENT HOUSE",
    "ROMEO HOMESTAY",
    "ROUTE 49 TRANSIENT HOUSE",
    "RYAN HOMESTAY",
    "SABLAN HILLS",
    "SAGUDAY BUILDING",
    "SALTNIGHT TRANSIENT",
    "SHIELDONS HOMESTAY",
    "SINACBAT BARANGAY HALL",
    "SLAB HOUSE",
    "SMR HOMESTAY",
    "ST. JOHN EVANGELIST GUEST HOUSE",
    "STRAWBERRY VALLEY HOTEL & RESTAURANT",
    "SUMMIT GEMS HOMESTAY",
    "SUMMITVIEW BABAN'S HOMESTAY-ELLEN (01)",
    "SUNRISE CABIN TRAVELLERS INN",
    "TABBAK MULTIPURPOSE BUILDING",
    "TAMID-AY HOMESTAY",
    "TANAW PRESA",
    "TENGLAWAN MULTIPURPOSE COOPERATIVE BUILDING",
    "TEPEE HOUSE",
    "THE PRIDE HOUSE HOMESTAY",
    "TINONGDAN GYMNASIUM WING",
    "TREKKERS HOMESTAY",
    "UPSIDE DOWN CAFÉ AND HOMESTAY",
    "VALLEYPOINT CAMPSITE",
    "WAKIT HOMESTAY",
    "WANARA HOMESTAY",
    "WANAY'S ROCKY MOUNTAIN HOMESTAY",
    "WINACA ECO-CULTURAL VILLAGE"
  ];
  
  // Auto-fill Mapping for Municipality, Type, and Rooms
  const accommodationDetails: Record<string, { municipality: string; type: string; rooms: number }> = {
    "3RD FLOOR MULTI-PURPOSE BUILDING, TINONGDAN": { municipality: "Itogon", type: "OTH", rooms: 3 },
    "5J'S CAMPSITE AND HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "ABBAO RESORT": { municipality: "Buguias", type: "OTH", rooms: 2 },
    "ABONG NEN JUAN": { municipality: "Kabayan", type: "OTH", rooms: 8 },
    "ABONG NEN JUAN TAN TENIA": { municipality: "Bokod", type: "TIN", rooms: 5 },
    "ADELLE'S TRANSIENT": { municipality: "La Trinidad", type: "HSS", rooms: 3 },
    "AGNES HOMESTAY": { municipality: "Kabayan", type: "OTH", rooms: 4 },
    "AKIKI TOURIST INN": { municipality: "Kabayan", type: "OTH", rooms: 3 },
    "ALOS HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 3 },
    "ALPHALAND BAGUIO MOUNTAIN LODGES": { municipality: "Itogon", type: "HTL", rooms: 55 },
    "ALPINE G'S LODGE AND RESTAURANT": { municipality: "Buguias", type: "OTH", rooms: 8 },
    "AMAPOLA CLIFF TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 3 },
    "AMBROCIO HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "AMIGO HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "ANGLUBEN HOMESTAY": { municipality: "Bakun", type: "OTH", rooms: 5 },
    "ARLENE HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "ASIN HOTSPRING POOTEN RESORT": { municipality: "Tuba", type: "RST", rooms: 15 },
    "ATOK HAVEN TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 2 },
    "AVIC'S HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 3 },
    "AVONG NEN SUVANI CULTURAL HERITAGE HOME": { municipality: "Kapangan", type: "OTH", rooms: 2 },
    "BABAN BOY HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BABAN HOMESTAY- NEDA (04)": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "BABAN'S HOMESTAY- JALLEN  (05)": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BABAN'S HOMESTAY- SUSAN  (02)": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BABAN'S HOMESTAY-SYLVIA (03)": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BAGAYAO HOMESTAY": { municipality: "Bakun", type: "HSS", rooms: 3 },
    "BAHAY NI KUYA ROLI HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "BAKUN CENTRAL SCHOOL H.E. BUILDING": { municipality: "Bakun", type: "OTH", rooms: 2 },
    "BAKUN MUNICIPAL GUEST HOUSE": { municipality: "Bakun", type: "OTH", rooms: 4 },
    "BALAI TAKO (BY NOBLE NEST REALTY AND SERVICES)": { municipality: "Tuba", type: "OTH", rooms: 1 },
    "BALAY NA KAHOY": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "BALEY NEN KAMORA": { municipality: "Bokod", type: "TIN", rooms: 5 },
    "BALI BEATA LODGING HOME": { municipality: "La Trinidad", type: "OTH", rooms: 5 },
    "BALLAY TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "BAPTC GUESTEL": { municipality: "La Trinidad", type: "HTL", rooms: 30 },
    "BARANGAY GUEST ROOM": { municipality: "Kibungan", type: "OTH", rooms: 2 },
    "BATAKAGAN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BCV TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "BENITOS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "BERNARD HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "BEYONDBAGUIO CAFÉ": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "BEZ AND OH LODGING HOME": { municipality: "Tuba", type: "OTH", rooms: 10 },
    "BONTIGI'S TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 1 },
    "BOTEL RESORT": { municipality: "Buguias", type: "OTH", rooms: 1 },
    "BREEZY HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BRGY. TINONGDAN HOMESTAY": { municipality: "Kabayan", type: "OTH", rooms: 2 },
    "BRUCELENESS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "BSU GLADIOLA CENTER": { municipality: "La Trinidad", type: "HTL", rooms: 8 },
    "BSU-BUGUIAS GUEST HOUSE": { municipality: "Buguias", type: "OTH", rooms: 3 },
    "BUDA'S TRANSIENT": { municipality: "Atok", type: "OTH", rooms: 6 },
    "BURTON'S CABIN AND YARD": { municipality: "Atok", type: "OTH", rooms: 2 },
    "CAMSOL INN formerly JACS HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 4 },
    "CASA YSABELLE": { municipality: "Buguias", type: "OTH", rooms: 7 },
    "CHERRY MAE'S TRANSIENT": { municipality: "Atok", type: "OTH", rooms: 1 },
    "CITYSIDE BED NAD BREAKFAST (MANAGED BY BIG BELLY BUFFET)": { municipality: "Itogon", type: "OTH", rooms: 6 },
    "CJ PEARL TRANSIENT": { municipality: "Atok", type: "OTH", rooms: 13 },
    "CLEOS TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 2 },
    "CLOUDFIELD TRANSIENT HOUSE": { municipality: "Tuba", type: "OTH", rooms: 4 },
    "CLOUDGAZER HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "CORNELIA HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "COSMIC FARM": { municipality: "La Trinidad", type: "OTH", rooms: 8 },
    "DENCIO'S HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "DITAS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "ED'S HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 1 },
    "ELENA'S RESORT": { municipality: "Bokod", type: "RST", rooms: 2 },
    "ERGIM TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 2 },
    "ESAY HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "EVA HOMESTAY": { municipality: "Kabayan", type: "OTH", rooms: 2 },
    "EVER LODGE": { municipality: "Tuba", type: "OTH", rooms: 16 },
    "Everest Lodge": { municipality: "Mankayan", type: "OTH", rooms: 9 },
    "FELICIANO HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "FERNANDEZ HOMESTAY": { municipality: "Bakun", type: "HSS", rooms: 3 },
    "FRED AGUINSE HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "G4D'S TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 2 },
    "GARCIA HOMESTAY": { municipality: "Kabayan", type: "OTH", rooms: 2 },
    "GARDEN NEN INES": { municipality: "La Trinidad", type: "OTH", rooms: 2 },
    "GOOD MORNING POTTINGSHED": { municipality: "Itogon", type: "OTH", rooms: 5 },
    "HAIGHT'S  COZY CHALET": { municipality: "Atok", type: "OTH", rooms: 3 },
    "HAIGHT'S PLACE": { municipality: "Atok", type: "OTH", rooms: 8 },
    "HEARTSVILLE TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "HELP ENGLISH LANGUAGE PROGRAM": { municipality: "La Trinidad", type: "HTL", rooms: 140 },
    "HERITAGE FARM HOMESTAY": { municipality: "Tuba", type: "HSS", rooms: 3 },
    "HI-ACRES CAMP": { municipality: "Sablan", type: "OTH", rooms: 0 },
    "HIGHLAND BLOSSOMS": { municipality: "La Trinidad", type: "OTH", rooms: 3 },
    "INA PURINGS TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 2 },
    "ISAAC JORDAN TRANSIENT": { municipality: "Atok", type: "OTH", rooms: 4 },
    "ITOGON MOUNTAIN VILLAGE CABINS": { municipality: "Itogon", type: "OTH", rooms: 7 },
    "Imeelou Inn & Resort": { municipality: "Mankayan", type: "OTH", rooms: 11 },
    "JENELIN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "JEWEL IGOROT BUILDING": { municipality: "La Trinidad", type: "HTL", rooms: 64 },
    "JONELIN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "JRL TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 3 },
    "JS LODGE": { municipality: "La Trinidad", type: "HTL", rooms: 13 },
    "JUBAN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "KALAHAN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "KINGS CABIN TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 1 },
    "KOMEDOR CAFÉ AND INN (CHERYL ANN A. CAJIGAN)": { municipality: "Mankayan", type: "OTH", rooms: 5 },
    "Kabatuan I nn & Resort": { municipality: "Mankayan", type: "OTH", rooms: 10 },
    "LA TRINIDAD HOMESTAY": { municipality: "La Trinidad", type: "HSS", rooms: 3 },
    "LA-FE HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "LAY-ODAN FARM (HECTOR D. DELA CRUZ)": { municipality: "Mankayan", type: "OTH", rooms: 3 },
    "LAZY BEAR": { municipality: "Itogon", type: "OTH", rooms: 6 },
    "LEAVES & PETALS ECO-GARDEN RESORT": { municipality: "Sablan", type: "RST", rooms: 3 },
    "LEAVES & SPIKES TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 1 },
    "LOLA BEEZ TRANSIENT": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "LOLA NILDA'S AGRITOURISM PARK-HOMESTAY": { municipality: "La Trinidad", type: "HSS", rooms: 2 },
    "LOLA'S CASA RENTAL": { municipality: "Atok", type: "OTH", rooms: 1 },
    "LOLA'S GRAND HOMESTAY": { municipality: "Itogon", type: "OTH", rooms: 4 },
    "LOLO CANCIO'S TRAVELODGE": { municipality: "Bokod", type: "TIN", rooms: 3 },
    "LOYUNG'S HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 4 },
    "LUPONAN MULTIPURPOSE BUILDING": { municipality: "Bakun", type: "OTH", rooms: 2 },
    "LUSTREA TRANSIENT HOUSE": { municipality: "Sablan", type: "OTH", rooms: 1 },
    "M-LLANA'S TRANSIENT HOUSE": { municipality: "Itogon", type: "OTH", rooms: 3 },
    "MAGIC LODGE": { municipality: "Itogon", type: "OTH", rooms: 13 },
    "MAMITAS HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 1 },
    "MANUEL HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "MARK'S TRAVELLERS VIEW DECK INN": { municipality: "Buguias", type: "OTH", rooms: 6 },
    "MAYFLOR'S FASTFOOD HAUS AND LODGING": { municipality: "Kapangan", type: "OTH", rooms: 3 },
    "MAYOR'S QAURTER": { municipality: "Kibungan", type: "OTH", rooms: 3 },
    "ME-AN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "MICHELLE P. MANGALLAY": { municipality: "Mankayan", type: "OTH", rooms: 5 },
    "MILBUR HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 5 },
    "MT. PULAG FOREVER": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "MUNICIPAL BUILDING": { municipality: "Bakun", type: "OTH", rooms: 2 },
    "MUNICIPAL GUEST HOUSE": { municipality: "Kibungan", type: "OTH", rooms: 2 },
    "MUNICIPAL TOURISM GUESTROOM": { municipality: "Bokod", type: "OTH", rooms: 2 },
    "NANAY HONORIA": { municipality: "Kabayan", type: "OTH", rooms: 3 },
    "NATURE TOWER HOTEL": { municipality: "La Trinidad", type: "HTL", rooms: 17 },
    "NEWMOON CHALET": { municipality: "Atok", type: "OTH", rooms: 3 },
    "NIVERA HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "NORTHERN BLOSSOM TRANSIENT": { municipality: "Kabayan", type: "OTH", rooms: 5 },
    "NORTHERN BLOSSOMS FARM LODGING": { municipality: "Atok", type: "OTH", rooms: 7 },
    "OMAG-MUNICIPAL NURSERY GUEST HOUSE": { municipality: "Kibungan", type: "OTH", rooms: 3 },
    "ORLENES HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "OSDAWEN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "OUR LADY OF LOURDES PARISH GUEST HOUSE": { municipality: "Kibungan", type: "OTH", rooms: 3 },
    "OUR NORTHERN HOME TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 2 },
    "PALM GROVE HOTSPRING AND MOUNTAIN RESORT": { municipality: "Tuba", type: "RST", rooms: 23 },
    "PINE CONE LODGE": { municipality: "Kabayan", type: "OTH", rooms: 12 },
    "POBLACION EVACUATION CENTER": { municipality: "Bakun", type: "OTH", rooms: 6 },
    "PRECIOUS TWINS LODGE (REYNALDO D. PALOMO)": { municipality: "Mankayan", type: "OTH", rooms: 7 },
    "PULTAK LODGE": { municipality: "Kabayan", type: "OTH", rooms: 4 },
    "RAG HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "REGINE HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 4 },
    "RIDDLEVIEW TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 2 },
    "RIVERFRONT HOMESTAY": { municipality: "Itogon", type: "OTH", rooms: 3 },
    "RIVERVIEW WATERPARK": { municipality: "Tuba", type: "RST", rooms: 20 },
    "RK'S GARDEN BREEZE HOTEL AND RESTAURANT": { municipality: "Buguias", type: "OTH", rooms: 8 },
    "RKK'S TRANSIENT HOUSE": { municipality: "Tuba", type: "OTH", rooms: 3 },
    "ROMEO HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "ROUTE 49 TRANSIENT HOUSE": { municipality: "Atok", type: "OTH", rooms: 3 },
    "RYAN HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "SABLAN HILLS": { municipality: "Sablan", type: "OTH", rooms: 2 },
    "SAGUDAY BUILDING": { municipality: "Bakun", type: "OTH", rooms: 2 },
    "SALTNIGHT TRANSIENT": { municipality: "Atok", type: "OTH", rooms: 1 },
    "SHIELDONS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "SINACBAT BARANGAY HALL": { municipality: "Bakun", type: "OTH", rooms: 3 },
    "SLAB HOUSE": { municipality: "Bokod", type: "TIN", rooms: 2 },
    "SMR HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "ST. JOHN EVANGELIST GUEST HOUSE": { municipality: "Mankayan", type: "OTH", rooms: 5 },
    "STRAWBERRY VALLEY HOTEL & RESTAURANT": { municipality: "La Trinidad", type: "HTL", rooms: 48 },
    "SUMMIT GEMS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "SUMMITVIEW BABAN'S HOMESTAY-ELLEN (01)": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "SUNRISE CABIN TRAVELLERS INN": { municipality: "Atok", type: "OTH", rooms: 12 },
    "TABBAK MULTIPURPOSE BUILDING": { municipality: "Bakun", type: "OTH", rooms: 2 },
    "TAMID-AY HOMESTAY": { municipality: "Bakun", type: "HSS", rooms: 4 },
    "TANAW PRESA": { municipality: "La Trinidad", type: "HSS", rooms: 2 },
    "TENGLAWAN MULTIPURPOSE COOPERATIVE BUILDING": { municipality: "Bakun", type: "OTH", rooms: 5 },
    "TEPEE HOUSE": { municipality: "Kapangan", type: "OTH", rooms: 3 },
    "THE PRIDE HOUSE HOMESTAY": { municipality: "Atok", type: "OTH", rooms: 1 },
    "TINONGDAN GYMNASIUM WING": { municipality: "Itogon", type: "OTH", rooms: 5 },
    "TREKKERS HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "UPSIDE DOWN CAFÉ AND HOMESTAY": { municipality: "Mankayan", type: "OTH", rooms: 3 },
    "VALLEYPOINT CAMPSITE": { municipality: "Tuba", type: "OTH", rooms: 2 },
    "WAKIT HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 3 },
    "WANARA HOMESTAY": { municipality: "Kabayan", type: "HSS", rooms: 2 },
    "WANAY'S ROCKY MOUNTAIN HOMESTAY": { municipality: "La Trinidad", type: "HSS", rooms: 4 },
    "WINACA ECO-CULTURAL VILLAGE": { municipality: "Tublay", type: "RST", rooms: 8 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { data, error } = await supabase
      .from("accommodations")
      .insert([
        {
          name,
          municipality,
          type: accType, 
          month,
          year,
          no_of_rooms: noOfRooms,
          rooms_occupied: roomsOccupied,
          male_staff: maleStaff,
          female_staff: femaleStaff,
          ga_ph_count: gaPh,
          ga_non_fil_count: gaNonFil,
          ga_overseas_filipinos: gaOverseas,
          ga_unspecified: gaUnspecified,
          gn_ph_count: gnPh,
          gn_non_fil_count: gnNonFil,
          gn_overseas_filipinos: gnOverseas,
          gn_unspecified: gnUnspecified,
          filipino_origin: filipinoOrigin,
          foreign_origin: foreignOrigin,
          overseas_origin: overseasOrigin,
          number_of_nights: totalNights,
        }
      ])
      .select()
      .single();

    setIsSaving(false);

    if (error) {
      alert("Error saving record: " + error.message);
    } else if (data) {
      router.push(`/accommodations`);
      router.refresh(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#18181b] border border-zinc-800 rounded-xl p-8 mt-6">
      
      {/* Basic Information */}
      <h2 className="text-xl text-white mb-6 font-semibold border-b border-zinc-800 pb-4">📝 Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* The Dropdown that triggers everything */}
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Accommodation Name</label>
          <select 
            required 
            value={name} 
            onChange={(e) => {
              const selectedName = e.target.value;
              setName(selectedName);
              
              // 🪄 THE MAGIC AUTO-FILL: Fill Municipality, Type, and Rooms instantly!
              const details = accommodationDetails[selectedName];
              if (details) {
                setMunicipality(details.municipality);
                setAccType(details.type);
                setNoOfRooms(details.rooms);
              }
            }} 
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="" disabled>Select an accommodation...</option>
            {accommodationsMasterList.map((acc) => (
              <option key={acc} value={acc}>{acc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Municipality</label>
          <select 
            required 
            value={municipality} 
            onChange={(e) => setMunicipality(e.target.value)} 
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="" disabled>Select a municipality...</option>
            {benguetMunicipalities.map((muni) => (
              <option key={muni} value={muni}>{muni}</option>
            ))}
          </select>
        </div>

        {/* The Accommodation Type Box */}
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Type</label>
          <select 
            required 
            value={accType} 
            onChange={(e) => setAccType(e.target.value)} 
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="" disabled>Select type...</option>
            <option value="HTL">HTL - Hotel</option>
            <option value="RST">RST - Resort</option>
            <option value="HSS">HSS - Homestay</option>
            <option value="TIN">TIN - Tourist Inn</option>
            <option value="MAB">MAB - Mabuhay Accommodation</option>
            <option value="APT">APT - Apartelle</option>
            <option value="PEN">PEN - Pension House</option>
            <option value="MOT">MOT - Motel</option>
            <option value="OTH">OTH - Other</option>
          </select>
        </div>

        {/* NEW: Month Dropdown */}
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Reporting Month</label>
          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="JANUARY">JANUARY</option>
            <option value="FEBRUARY">FEBRUARY</option>
            <option value="MARCH">MARCH</option>
            <option value="APRIL">APRIL</option>
            <option value="MAY">MAY</option>
            <option value="JUNE">JUNE</option>
            <option value="JULY">JULY</option>
            <option value="AUGUST">AUGUST</option>
            <option value="SEPTEMBER">SEPTEMBER</option>
            <option value="OCTOBER">OCTOBER</option>
            <option value="NOVEMBER">NOVEMBER</option>
            <option value="DECEMBER">DECEMBER</option>
          </select>
        </div>

        {/* NEW: Year Dropdown */}
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Reporting Year</label>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

      </div>

      {/* Capacity & Staffing */}
      <h2 className="text-xl text-white mb-6 font-semibold border-b border-zinc-800 pb-4">🏢 Capacity & Staffing</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Total Rooms Available</label>
          <input type="number" value={noOfRooms} onChange={(e) => setNoOfRooms(Number(e.target.value))} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Rooms Occupied</label>
          <input type="number" value={roomsOccupied} onChange={(e) => setRoomsOccupied(Number(e.target.value))} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Male Staff</label>
          <input type="number" value={maleStaff} onChange={(e) => setMaleStaff(Number(e.target.value))} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-violet-500" />
        </div>
        <div>
          <label className="block text-zinc-400 text-sm font-bold mb-2">Female Staff</label>
          <input type="number" value={femaleStaff} onChange={(e) => setFemaleStaff(Number(e.target.value))} className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-pink-500" />
        </div>
      </div>

      {/* Guests & Nights */}
      <h2 className="text-xl text-white mb-6 font-semibold border-b border-zinc-800 pb-4 mt-8">👥 Guests & Nights Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* FILIPINO RESIDENTS */}
        <div className="bg-[#27272a] p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm">
          <h3 className="text-emerald-500 font-bold mb-4 uppercase text-sm tracking-wider">Filipino Residents</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Arrivals</label>
              <input type="number" value={gaPh} onChange={(e) => setGaPh(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Nights Stayed</label>
              <input type="number" value={gnPh} onChange={(e) => setGnPh(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
            </div>
          </div>
          <label className="block text-zinc-400 text-xs font-bold mb-2">Origin Municipality / Province</label>
          <input type="text" value={filipinoOrigin} onChange={(e) => setFilipinoOrigin(e.target.value)} placeholder="e.g., Baguio, Manila..." className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
        </div>

        {/* FOREIGN VISITORS */}
        <div className="bg-[#27272a] p-5 rounded-xl border-l-4 border-blue-500 shadow-sm">
          <h3 className="text-blue-500 font-bold mb-4 uppercase text-sm tracking-wider">Foreign Visitors</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Arrivals</label>
              <input type="number" value={gaNonFil} onChange={(e) => setGaNonFil(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Nights Stayed</label>
              <input type="number" value={gnNonFil} onChange={(e) => setGnNonFil(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <label className="block text-zinc-400 text-xs font-bold mb-2">Origin Country</label>
          <input type="text" value={foreignOrigin} onChange={(e) => setForeignOrigin(e.target.value)} placeholder="e.g., USA, Japan, Spain..." className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-blue-500" />
        </div>

        {/* OVERSEAS FILIPINOS */}
        <div className="bg-[#27272a] p-5 rounded-xl border-l-4 border-amber-500 shadow-sm">
          <h3 className="text-amber-500 font-bold mb-4 uppercase text-sm tracking-wider">Overseas Filipinos</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Arrivals</label>
              <input type="number" value={gaOverseas} onChange={(e) => setGaOverseas(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Nights Stayed</label>
              <input type="number" value={gnOverseas} onChange={(e) => setGnOverseas(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500" />
            </div>
          </div>
          <label className="block text-zinc-400 text-xs font-bold mb-2">Origin Country</label>
          <input type="text" value={overseasOrigin} onChange={(e) => setOverseasOrigin(e.target.value)} placeholder="e.g., Canada, UAE, Australia..." className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-amber-500" />
        </div>

        {/* UNSPECIFIED GUESTS */}
        <div className="bg-[#27272a] p-5 rounded-xl border-l-4 border-zinc-400 shadow-sm">
          <h3 className="text-zinc-400 font-bold mb-4 uppercase text-sm tracking-wider">Non-Specified Guests</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Arrivals</label>
              <input type="number" value={gaUnspecified} onChange={(e) => setGaUnspecified(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-zinc-500" />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold mb-2">Nights Stayed</label>
              <input type="number" value={gnUnspecified} onChange={(e) => setGnUnspecified(Number(e.target.value))} className="w-full bg-[#18181b] border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:border-zinc-500" />
            </div>
          </div>
        </div>

      </div>

      {/* Auto-Calculating Grand Totals */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#27272a] border-l-4 border-amber-500 p-5 rounded-lg flex justify-between items-center">
          <div><h4 className="text-white font-bold">Total Guests</h4></div>
          <div className="text-3xl font-bold text-amber-500">{totalGuests}</div>
        </div>
        <div className="bg-[#27272a] border-l-4 border-amber-500 p-5 rounded-lg flex justify-between items-center">
          <div><h4 className="text-white font-bold">Total Nights</h4></div>
          <div className="text-3xl font-bold text-amber-500">{totalNights}</div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-zinc-800 pt-6">
        <Link href="/accommodations" className="px-6 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-semibold">
          Cancel
        </Link>
        <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg transition-colors font-semibold disabled:opacity-50">
          <Save size={20} />
          {isSaving ? "Saving..." : "Save Record"}
        </button>
      </div>
    </form>
  );
}