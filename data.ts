import { TripData } from './components/types';

export const tripData: TripData = {
  versionIdentifier: 'bali-2025-v8',
  title: 'Cestovní plán 2025 – Bali',
  dates: '16. - 28. října 2025',
  usefulLinks: [
    { id: 1, title: 'Oficiální e-Visa (e-VoA) a e-CD', url: 'https://evisa.imigrasi.go.id/' },
    { id: 2, title: 'MZV ČR: Registrace cestovatelů (DROZD)', url: 'https://drozd.mzv.gov.cz/' },
    { id: 3, title: 'MZV ČR: Doporučení pro cesty do Indonésie', url: 'https://www.mzv.cz/jakarta' },
    { id: 4, title: 'Grab (místní doprava a jídlo)', url: 'https://www.grab.com/id/en/' },
    { id: 5, title: 'Gojek (konkurence Grab)', url: 'https://www.gojek.com/' },
    { id: 6, title: 'GetYourGuide (aktivity a výlety)', url: 'https://www.getyourguide.com/bali-l344/' },
    { id: 7, title: 'Klook (aktivity a výlety)', url: 'https://www.klook.com/city/3-bali-things-to-do/' },
    { id: 8, title: 'The Bali Bible (průvodce a tipy)', url: 'https://www.thebalibible.com/' },
    { id: 9, title: 'Bali Spirit (jóga a wellness)', url: 'https://www.balispirit.com/' },
    { id: 10, title: 'Emirates: Přeprava nebezpečného zboží', url: 'https://www.emirates.com/cz/czech/before-you-fly/travel/dangerous-goods-policy/' },
  ],
  itinerary: [
    {
      sectionTitle: '16.10. Let na Bali',
      travelInfo: {
        title: 'Cesta: Praha → Dubaj → Denpasar',
        description: `Odlet z Prahy (PRG, Terminál 1) v 16:10, let EK0140. Přílet do Dubaje (DXB, Terminál 3) v 23:55.
Mezipřistání. Odlet z Dubaje v 3:25, let EK0368. Přílet na Bali (DPS) v 16:35.

POZN.: Zavazadlo 25kg + 7kg (55x38x22), max 100ml tekutin.`,
        distance: 'cca 11 900 km',
        duration: 'cca 12h 35m (čistý letový čas)',
      },
      places: [],
    },
    {
      sectionTitle: '17.10.–27.10. Pobyt na Bali',
      accommodation: {
          name: "VILLA THE RIMBA",
          address: "G76H+7FX, Tegallalang, Gianyar Regency, Bali 80552, Indonésie",
          mapLink: "https://www.google.com/maps/search/?api=1&query=VILLA+THE+RIMBA+Tegallalang"
      },
      places: [
        { id: 1, title: 'Pláž Purnama', tags: ['Pláž', 'cca 20 km'], description: 'Jedna z nejbližších pláží od ubytování s černým vulkanickým pískem. Známá pro surfování a klidnou atmosféru, méně vhodná na klasické koupání.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Purnama+Beach+Sukawati' },
        { id: 2, title: 'Pláž Melasti', tags: ['Pláž', 'cca 55 km'], description: 'Nádherná pláž s bílým pískem a tyrkysovou vodou, obklopená vysokými vápencovými útesy. Ideální místo pro relaxaci a koupání.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Melasti+Beach+Ungasan' },
        { id: 3, title: 'Pláž Nusa Dua', tags: ['Pláž', 'cca 45 km'], description: 'Krásná, udržovaná pláž s bílým pískem a klidnou vodou. Ideální pro plavání a vodní sporty. V okolí se nachází luxusní resorty.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Nusa+Dua+Beach' },
        { id: 4, title: 'Rýžové terasy Tegalalang a houpačky', tags: ['Příroda', 'cca 5 km'], description: 'Ikonické rýžové terasy s možností projít se a vyzkoušet slavné adrenalinové houpačky s výhledem do údolí.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tegalalang+Rice+Terrace' },
        { id: 5, title: 'Rýžové terasy Jatiluwih (UNESCO)', tags: ['Příroda', 'cca 40 km'], description: 'Rozlehlé a dechberoucí rýžové terasy zapsané na seznamu UNESCO. Nabízejí několik turistických tras a mnohem klidnější atmosféru než Tegalalang.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Jatiluwih+Rice+Terraces' },
        { id: 6, title: 'Kávová plantáž Satria', tags: ['Zážitek', 'cca 6 km'], description: 'Navštivte místní plantáž, kde uvidíte, jak se pěstuje a zpracovává káva, včetně slavné Kopi Luwak. Součástí je i degustace různých druhů kávy a čajů.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Satria+Coffee+Plantation' },
        { id: 7, title: 'Čokoládovna Pod Bali', tags: ['Zážitek', 'cca 25 km'], description: 'Navštivte továrnu na čokoládu, kde se dozvíte vše o jejím zpracování od bobu až po tabulku. Možnost ochutnávek a workshopů.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Pod+Chocolate+Factory+%26+Cafe' },
        { id: 8, title: 'Pyramidy Chi: Zvuková terapie', tags: ['Wellness', 'cca 12 km'], description: 'Unikátní zážitek ve dvou obrovských pyramidách. Relaxace při zvukové lázni, která využívá sílu vibrací a frekvencí pro hlubokou meditaci.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Pyramids+of+Chi+Ubud', webLink: 'https://pyramidsofchi.com/' },
        { id: 9, title: 'Kakaová ceremonie', tags: ['Ceremonie', 'cca 10 km'], description: 'Tradiční rituál pití ceremoniálního kakaa, který otevírá srdce a podporuje meditaci a propojení. Skvělý způsob, jak se naladit na duchovní atmosféru ostrova.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Cacao+Ceremony+Ubud' },
        { id: 10, title: 'Vodní očistná ceremonie (Melukat)', tags: ['Ceremonie', 'cca 8 km'], description: 'Navštivte chrám Tirta Empul, posvátné místo s prameny, kde se můžete zúčastnit tradičního očistného rituálu Melukat pro duchovní očistu.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tirta+Empul+Temple' },
        { id: 11, title: 'Trh Ubud (Pasar Seni Ubud)', tags: ['Nákupy', 'cca 10 km'], description: 'Slavný trh v srdci Ubudu, kde najdete širokou škálu suvenýrů, oblečení, uměleckých předmětů a ručních výrobků. Otevřeno denně, doporučuje se smlouvat.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Ubud+Art+Market' },
        { id: 12, title: 'Trans Studio Mall Bali', tags: ['Nákupy', 'cca 30 km'], description: 'Moderní nákupní centrum v Denpasaru s množstvím obchodů, restaurací, kinem a vnitřním zábavním parkem.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Trans+Studio+Mall+Bali' },
        { id: 13, title: 'Chrám Uluwatu & Tanec Kecak', tags: ['Kultura', 'cca 50 km'], description: 'Majestátní chrám na útesu s dechberoucím výhledem na oceán při západu slunce. Následuje tradiční ohnivý tanec Kecak, který vypráví příběh Rámájany.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Uluwatu+Temple' },
        { id: 14, title: 'Opičí les Sangeh', tags: ['Příroda', 'cca 20 km'], description: 'Méně turistická alternativa k ubudskému Monkey Forest. Les plný makaků a vysokých muškatovnikových stromů s chrámem Pura Bukit Sari uprostřed.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Sangeh+Monkey+Forest' },
        { id: 15, title: 'Sloní jeskyně (Goa Gajah)', tags: ['Historie', 'cca 15 km'], description: 'Významná archeologická lokalita z 9. století s fascinujícím vchodem do jeskyně ve tvaru démonické tváře. V areálu se nachází i lázně a buddhistické památky.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Goa+Gajah' },
        { id: 16, title: 'Garuda Wisnu Kencana (GWK)', tags: ['Kultura', 'cca 50 km'], description: 'Kulturní park, kterému dominuje jedna z nejvyšších soch světa. Nabízí kulturní představení, výstavy a úžasné výhledy.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Garuda+Wisnu+Kencana+Cultural+Park' },
        { id: 17, title: 'Chrám Lempuyang (Nebeská brána)', tags: ['Kultura', 'cca 55 km'], description: 'Jeden z nejstarších a nejposvátnějších chrámů na Bali, proslulý svou "Nebeskou bránou" s úchvatným výhledem na sopku Agung. Doporučuje se přijet brzy ráno.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Pura+Lempuyang+Luhur' },
        { id: 18, title: 'Vodní palác Tirta Gangga', tags: ['Historie', 'cca 45 km'], description: 'Královský vodní palác s labyrintem bazénů, fontán a kamenných soch. Můžete se zde projít po nášlapných kamenech mezi kapry a obdivovat krásnou zahradní architekturu.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tirta+Gangga' },
        { id: 19, title: 'Tradiční vesnice Penglipuran', tags: ['Kultura', 'cca 15 km'], description: 'Jedna z nejzachovalejších tradičních vesnic na Bali. Projděte se po kamenné ulici lemované identickými domy a nahlédněte do života místních obyvatel a jejich unikátní kultury.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Penglipuran+Village' },
        { id: 20, title: 'Památník Bajra Sandhi', tags: ['Historie', 'cca 30 km'], description: 'Monumentální památník v Denpasaru, který symbolizuje boj balijského lidu za nezávislost. Uvnitř se nachází dioráma zobrazující klíčové momenty historie Bali.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Bajra+Sandhi+Monument' },
        { id: 21, title: 'Památník války Margarana', tags: ['Historie', 'cca 25 km'], description: 'Památník věnovaný plukovníkovi I Gusti Ngurah Raiovi a jeho jednotkám, které padly v bitvě proti nizozemským silám v roce 1946. Klíčové místo boje za nezávislost Indonésie.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Margarana+War+Memorial' },
        { id: 22, title: 'Japonská jeskyně (Goa Jepang)', tags: ['Historie', 'cca 45 km'], description: 'Síť umělých jeskyní a bunkrů vybudovaných během japonské okupace za druhé světové války. Nachází se na útesu s výhledem na řeku.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Goa+Jepang+Klungkung' },
        { id: 23, title: 'Chrám Tanah Lot', tags: ['Kultura', 'cca 30 km'], description: 'Ikonický mořský chrám postavený na skále v moři. Je proslulý svými dramatickými západy slunce. Během odlivu je možné k němu dojít pěšky.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tanah+Lot+Temple' },
        { id: 24, title: 'Chrám Ulun Danu Beratan', tags: ['Kultura', 'cca 40 km'], description: 'Malebný chrámový komplex na břehu jezera Beratan. Věnován bohyni jezera, zdá se, jako by plul na vodní hladině. Místo s klidnou a chladnější atmosférou.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Ulun+Danu+Beratan+Temple' },
        { id: 25, title: 'Chrám Besakih (Mateřský chrám)', tags: ['Kultura', 'cca 25 km'], description: 'Největší a nejposvátnější komplex hinduistických chrámů na Bali, umístěný na svazích sopky Agung. Skládá se z 23 samostatných chrámů.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Besakih+Temple' },
        { id: 26, title: 'Vodopád Tegenungan', tags: ['Příroda', 'cca 15 km'], description: 'Jeden z mála vodopádů na Bali, který se nenachází v horách. Je snadno dostupný a nabízí možnost koupání v přírodním bazénku pod vodopádem.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tegenungan+Waterfall' },
        { id: 27, title: 'Vodopád Tukad Cepung', tags: ['Příroda', 'cca 20 km'], description: 'Unikátní vodopád ukrytý v jeskyni. Sluneční paprsky pronikající shora vytvářejí magickou světelnou show. Pro přístup je nutné projít krátce potokem.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Tukad+Cepung+Waterfall' },
        { id: 28, title: 'Vyhlídka Kintamani', tags: ['Příroda', 'cca 20 km'], description: 'Oblast s úchvatným panoramatickým výhledem na aktivní sopku Batur a její kalderové jezero. Ideální místo pro oběd v jedné z mnoha restaurací s výhledem.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Kintamani+Viewpoint' },
        { id: 29, title: 'Hřebenová cesta Campuhan', tags: ['Procházka', 'cca 10 km'], description: 'Nenáročná a malebná procházka po dlážděném chodníku na hřebeni s výhledem na zelená údolí. Skvělé místo pro ranní nebo pozdně odpolední aktivitu v blízkosti Ubudu.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Campuhan+Ridge+Walk' },
        { id: 30, title: 'Bali Safari a Mořský Park', tags: ['Zážitek', 'cca 20 km'], description: 'Velký zvířecí park, kde můžete zblízka vidět zvířata z Indonésie, Afriky a Indie při safari projížďce. Součástí jsou i různá představení a malý vodní park.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Bali+Safari+and+Marine+Park' },
        { id: 31, title: 'Bali Zoo', tags: ['Zážitek', 'Zvířata', 'cca 15 km'], description: 'Populární zoologická zahrada s více než 500 druhy zvířat. Nabízí interaktivní zážitky jako krmení zvířat nebo snídaně s orangutany.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Bali+Zoo' },
        { id: 32, title: 'Mason Elephant Park', tags: ['Zážitek', 'Zvířata', 'cca 12 km'], description: 'Etický park a útočiště pro sumaterské slony. Můžete se zde slony koupat, krmit je a dozvědět se více o jejich ochraně.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Mason+Elephant+Park' },
        { id: 33, title: 'Bali Bird Park', tags: ['Zážitek', 'Zvířata', 'cca 16 km'], description: 'Domov pro více než 1000 ptáků z 250 různých druhů. Projděte se voliériami, které napodobují přirozené prostředí ptáků z Indonésie a celého světa.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Bali+Bird+Park' },
        { id: 34, title: 'Kemenuh Butterfly Park', tags: ['Zážitek', 'Příroda', 'cca 15 km'], description: 'Tropická zahrada, kde můžete obdivovat stovky barevných motýlů v jejich přirozeném prostředí. Klidné a fotogenické místo.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Kemenuh+Butterfly+Park' },
        { id: 35, title: 'Kurz vaření (Paon Bali)', tags: ['Zážitek', 'Gastronomie', 'cca 8 km'], description: 'Naučte se připravovat autentické balijské pokrmy na tradičním kurzu vaření. Začíná návštěvou místního trhu a končí společnou hostinou.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Paon+Bali+Cooking+Class' },
        { id: 36, title: 'Opuštěné letadlo (Boeing 737)', tags: ['Zajímavost', 'cca 55 km'], description: 'Záhadně odstavený Boeing 737 uprostřed pole. Stala se z něj populární a trochu bizarní turistická atrakce. Nachází se nedaleko pláže Pandawa.', mapLink: 'https://www.google.com/maps/search/?api=1&query=Abandoned+Aircraft+Bali' },
      ],
    },
    {
      sectionTitle: 'Návrh Bali s Janetou',
      recommendation: {
          title: "Návrh programu Bali 2025 od Janety",
          text: `2.Den (pá 17.10.) Přílet, seznámení
3.Den (so 18.10.) výlet na rýžové terasy a houpačky, Kávová plantáž, zvuková terapie v Pyramidác
4.Den (ne 19.10.) Volno, Kakaová ceremonie začátek ve 4 odpoledne
5.Den (po 20.10.) Chrám Uluwatu, Kecak ohnivý tanec a bílá písečná pláž Melasti 
6.Den (út 21.10.) Volno 
7.Den (st 22.10.) Opičí les Sangeh a Melukat vodní ceremonie
8.Den (čt 23.10.) Výšlap na sopku Batur nebo možnost se připojit k horkým pramenům a zažít tak okolí sopky i bez výšlapu
9.Den (pá 24.10.) Sloní jeskyně a bílá písečná pláž Melasti
10.Den (so 25.10.) Volno
11.Den (ne 26.10.) Udara festival 
12.Den (po 27.10.) Volno a večer odlet`
      },
      places: [],
    },
    {
      sectionTitle: '28.10. Let zpět do Čech',
      isFinalDay: true,
      travelInfo: {
        title: 'Cesta: Denpasar → Dubaj → Praha',
        description: `Odlet z Bali (DPS) v 00:25, let EK0399. Přílet do Dubaje (DXB, Terminál 3) v 5:45.
Mezipřistání. Odlet z Dubaje v 8:45, let EK0139. Přílet do Prahy (PRG, Terminál 1) v 12:30.`,
        distance: 'cca 11 900 km',
        duration: 'cca 16h 10m (čistý letový čas)',
      },
      places: [],
    },
  ],
};
