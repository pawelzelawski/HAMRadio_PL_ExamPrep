<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Materiały do nauki</h2>
    <div>
      <!-- Category selector label (copied for UI consistency) -->
      <div class="mb-2">
        <span class="text-base text-gray-700 font-medium">Wybierz sekcję:</span>
      </div>
      <!-- Category selector (tabs for desktop, dropdown for mobile) -->
      <div class="mb-6">
        <div class="hidden sm:flex gap-4 flex-wrap border-b border-blue-200 pb-1">
          <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat"
            :class="['bg-transparent px-0 py-1 text-blue-800 hover:underline focus:outline-none transition', selectedCategory === cat ? 'font-bold border-b-2 border-blue-800' : 'font-normal']"
            style="min-width: 0">
            {{ cat }}
          </button>
        </div>
        <div class="sm:hidden mb-4">
          <select v-model="selectedCategory" class="w-full p-2 rounded border border-blue-300">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
      <!-- Section content -->
      <div v-if="selectedCategory === 'KOD Q'">
        <h3 class="text-xl font-semibold mb-2 mt-6">KOD Q</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm">
            <thead>
              <tr class="bg-blue-800 text-white">
                <th class="p-2 border">KOD</th>
                <th class="p-2 border">OPIS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in kodQ" :key="row.kod">
                <td class="p-2 border font-mono">{{ row.kod }}</td>
                <td class="p-2 border">{{ row.opis }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="selectedCategory === 'LITEROWANIE'">
        <h3 class="text-xl font-semibold mb-2 mt-6">LITEROWANIE</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm">
            <thead>
              <tr class="bg-blue-800 text-white">
                <th class="p-2 border">Litera</th>
                <th class="p-2 border">międzynarodowy</th>
                <th class="p-2 border">amerykański</th>
                <th class="p-2 border">polski</th>
                <th class="p-2 border">rosyjski</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in literowanie" :key="row.litera">
                <td class="p-2 border font-mono">{{ row.litera }}</td>
                <td class="p-2 border">{{ row.miedzynarodowy }}</td>
                <td class="p-2 border">{{ row.amerykanski }}</td>
                <td class="p-2 border">{{ row.polski }}</td>
                <td class="p-2 border">{{ row.rosyjski }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="selectedCategory === 'RAPORTY RS(T) ORAZ RSQ'">
        <h3 class="text-xl font-semibold mb-2 mt-6">RAPORTY RS(T) ORAZ RSQ</h3>
        <div class="overflow-x-auto mb-4">
          <table class="min-w-full border text-sm mb-2">
            <thead>
              <tr class="bg-blue-800 text-white">
                <th class="p-2 border">RAPORT RS(T) SSB-CW</th>
                <th class="p-2 border">OPIS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in raportyRST" :key="row.kod">
                <td class="p-2 border font-mono">{{ row.kod }}</td>
                <td class="p-2 border">{{ row.opis }}</td>
              </tr>
            </tbody>
          </table>
          <div class="h-2"></div>
          <table class="min-w-full border text-sm mb-2">
            <thead>
              <tr class="bg-blue-800 text-white">
                <th class="p-2 border">RAPORT RSQ DIGI</th>
                <th class="p-2 border">OPIS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in raportyRSQ" :key="row.kod">
                <td class="p-2 border font-mono">{{ row.kod }}</td>
                <td class="p-2 border">{{ row.opis }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ['KOD Q', 'LITEROWANIE', 'RAPORTY RS(T) ORAZ RSQ']
const selectedCategory = ref(categories[0])

const kodQ = [
  { kod: 'QAZ', opis: 'Burza, wyłączam stację' },
  { kod: 'QHL', opis: 'Przeszukiwanie pasma od największej częstotliwości' },
  { kod: 'QHM', opis: 'Przeszukiwanie pasma od największej do środkowej częstotliwości' },
  { kod: 'QLH', opis: 'Przeszukiwanie pasma od najmniejszej częstotliwości' },
  { kod: 'QLM', opis: 'Przeszukiwanie pasma od najmniejszej do środkowej częstotliwości' },
  { kod: 'QMH', opis: 'Przeszukiwanie pasma od środkowej do największej częstotliwości' },
  { kod: 'QML', opis: 'Przeszukiwanie pasma od środkowej do najmniejszej częstotliwości' },
  { kod: 'QQQ', opis: 'Muszę przerwać łączność, wyjaśnienia później' },
  { kod: 'QRA', opis: 'Moja stacja nazywa się...' },
  { kod: 'QRAR', opis: 'Mój adres w callbooku jest dokładny i prawidłowy' },
  { kod: 'QRB', opis: 'Odległość między naszymi stacjami wynosi ... km' },
  { kod: 'QRD', opis: 'Zdążamy do... z...' },
  { kod: 'QRE', opis: 'Przypuszczalnie przybędziemy do ... o ... godzinie' },
  { kod: 'QRF', opis: 'Wracamy (wracajcie) do ... (miejsce)' },
  { kod: 'QRG', opis: 'Twoja częstotliwość wynosi...' },
  { kod: 'QRH', opis: 'Twoja częstotliwość zmienia się, waha' },
  { kod: 'QRI', opis: 'Twój ton jest: 1. dobry, 2. zmienny, 3. zły' },
  { kod: 'QRJ', opis: 'Wasze sygnały są bardzo słabe, nieodbieralne' },
  { kod: 'QRK', opis: 'Czytelność waszych sygnałów wynosi (1...5)' },
  { kod: 'QRL', opis: 'Jestem zajęty, proszę nie przeszkadzać' },
  { kod: 'QRM', opis: 'Mam przeszkody w odbiorze, zakłócenia od innych stacji' },
  { kod: 'QRN', opis: 'Mam zakłócenia atmosferyczne' },
  { kod: 'QRO', opis: 'Zwiększ moc, duża moc' },
  { kod: 'QRP', opis: 'Zmniejsz moc, mała moc' },
  { kod: 'QRQ', opis: 'Nadawaj szybciej' },
  { kod: 'QRR', opis: 'Jestem gotowy do pracy automatycznej' },
  { kod: 'QRRR', opis: 'Znak niebezpieczeństwa na lądzie (tylko w ruchu amatorskim)' },
  { kod: 'QRS', opis: 'Nadawaj wolniej' },
  { kod: 'QRT', opis: 'Kończę nadawanie, wyłączam stację, przerwij nadawanie!' },
  { kod: 'QRU', opis: 'Nie mam nic dla ciebie' },
  { kod: 'QRV', opis: 'Jestem gotów do pracy' },
  { kod: 'QRW', opis: 'Przekażcie ..., że go wołam na częstotliwości ...' },
  { kod: 'QRX', opis: 'Proszę poczekać, zawołam was o godzinie ...' },
  { kod: 'QRY', opis: 'Wasza kolejność jest...' },
  { kod: 'QRZ', opis: 'Was woła..., kto mnie woła?' },
  { kod: 'QSA', opis: 'Siła waszych sygnałów wynosi (1...9)' },
  { kod: 'QSB', opis: 'Siła waszego sygnału waha się' },
  { kod: 'QSD', opis: 'Błędnie nadajecie CW' },
  { kod: 'QSI', opis: 'Nie mogłem przerwać waszego nadawania' },
  { kod: 'QSK', opis: 'Mogę słuchać w przerwach nadawania (BK)' },
  { kod: 'QSL', opis: 'Potwierdzam, przyślę kartę QSL' },
  { kod: 'QSLL', opis: 'Wymieńmy wzajemnie nasze karty QSL' },
  { kod: 'QSLN', opis: 'Nie trzeba wysyłać karty QSL' },
  { kod: 'QSM', opis: 'Proszę powtórzyć (RPT)' },
  { kod: 'QSN', opis: 'Słuszałem was na ... kHz' },
  { kod: 'QSO', opis: 'Łączność, mam połączenie' },
  { kod: 'QSP', opis: 'Przekażcie komunikat do...' },
  { kod: 'QSQ', opis: 'Nadawajcie każde słowo jeden raz' },
  { kod: 'QSR', opis: 'Powtórzcie wasze wywołanie na częstotliwości wywoławczej' },
  { kod: 'QSS', opis: 'Chcemy używać częstotliwości roboczej ...' },
  { kod: 'QST', opis: 'Komunikat dla wszystkich' },
  { kod: 'QSU', opis: 'Nadawajcie na częstotliwości ... kHz' },
  { kod: 'QSUF', opis: 'Proszę o łączność telefoniczną przewodową' },
  { kod: 'QSV', opis: 'Nadawajcie V dla strojenia' },
  { kod: 'QSW', opis: 'Przechodzę na częstotliwość...' },
  { kod: 'QSX', opis: 'Słucham na częstotliwości...' },
  { kod: 'QSY', opis: 'Przejdźcie na częstotliwość...' },
  { kod: 'QSZ', opis: 'Nadawajcie każde słowo dwa razy (lub ... razy)' },
  { kod: 'QTA', opis: 'Anulujcie radiogram nr... , jak gdyby nie był nadany' },
  { kod: 'QTB', opis: 'Nie zgadzam się z waszym obliczeniem ilości słów' },
  { kod: 'QTC', opis: 'Mam dla was wiadomość' },
  { kod: 'QTG', opis: 'Będziemy nadawali po naszym znaku dwie "kreski", każda po 10 sek.' },
  { kod: 'QTH', opis: 'Moje położenie geograficzne to...' },
  { kod: 'QTN', opis: 'Opuściliśmy to miejsce o ... godzinie' },
  { kod: 'QTR', opis: 'Dokładny czas jest...' },
  { kod: 'QTS', opis: 'Będziemy nadawali do pomiarów nasz sygnał wywoławczy przez ... minut' },
  { kod: 'QTT', opis: 'Sygnał rozpoznawczy który nastąpi jest nałożony na inną transmisję' },
  { kod: 'QTU', opis: 'Pracuję od ... do ...' },
  { kod: 'QTV', opis: 'Nasłuchujcie za nas na częstotliwości ... ( od ... do ... godziny)' },
  { kod: 'QTX', opis: 'Będziemy w pogotowiu do dalszej łączności z wami' },
  { kod: 'QUA', opis: 'Przekazuję wiadomość od ...' },
  { kod: 'QUB', opis: 'Oto żądane wiadomości ...' },
  { kod: 'QUH', opis: 'Ciśnienie barometryczne wynosi ...' },
  { kod: 'QUM', opis: 'Mogę już podjąć normalną pracę' },
  { kod: 'QWX', opis: 'Stan pogody' },
]

const literowanie = [
  { litera: 'A', miedzynarodowy: 'Alfa', amerykanski: 'Adam', polski: 'Adam', rosyjski: 'Anna' },
  { litera: 'B', miedzynarodowy: 'Bravo', amerykanski: 'Baker', polski: 'Barbara', rosyjski: 'Boris' },
  { litera: 'C', miedzynarodowy: 'Charlie', amerykanski: 'Charlie', polski: 'Celina', rosyjski: 'Centralnyj' },
  { litera: 'D', miedzynarodowy: 'Delta', amerykanski: 'David', polski: 'Dorota', rosyjski: 'Dimitrij' },
  { litera: 'E', miedzynarodowy: 'Echo', amerykanski: 'Edward', polski: 'Ewa', rosyjski: 'Jeliena' },
  { litera: 'F', miedzynarodowy: 'Foxtrott', amerykanski: 'Framk', polski: 'Franciszek', rosyjski: 'Fiodor' },
  { litera: 'G', miedzynarodowy: 'Golf', amerykanski: 'George', polski: 'Grazyna', rosyjski: 'Grigorij' },
  { litera: 'H', miedzynarodowy: 'Hotel', amerykanski: 'Henry', polski: 'Henryk', rosyjski: 'Hariton' },
  { litera: 'I', miedzynarodowy: 'India', amerykanski: 'Ida', polski: 'Irena', rosyjski: 'Iwan' },
  { litera: 'J', miedzynarodowy: 'Juliet', amerykanski: 'John', polski: 'Jadwiga', rosyjski: 'Iwan Kratkij' },
  { litera: 'K', miedzynarodowy: 'Kilo', amerykanski: 'King', polski: 'Karol', rosyjski: 'Konstantin' },
  { litera: 'L', miedzynarodowy: 'Lima', amerykanski: 'Lewis', polski: 'Leon', rosyjski: 'Lieonid' },
  { litera: 'M', miedzynarodowy: 'Mike', amerykanski: 'Mary', polski: 'Maria', rosyjski: 'Maria' },
  { litera: 'N', miedzynarodowy: 'November', amerykanski: 'Nancy', polski: 'Natalia', rosyjski: 'Nikołaj' },
  { litera: 'O', miedzynarodowy: 'Oscar', amerykanski: 'Otto', polski: 'Olga', rosyjski: 'Olga' },
  { litera: 'P', miedzynarodowy: 'Papa', amerykanski: 'Peter', polski: 'Paweł', rosyjski: 'Pawieł' },
  { litera: 'Q', miedzynarodowy: 'Quebec', amerykanski: 'Queen', polski: '(ku)', rosyjski: 'Szczuka' },
  { litera: 'R', miedzynarodowy: 'Romeo', amerykanski: 'Robert', polski: 'Roman', rosyjski: 'Roman' },
  { litera: 'S', miedzynarodowy: 'Sierra', amerykanski: 'Susan', polski: 'Stanisław', rosyjski: 'Siergij' },
  { litera: 'T', miedzynarodowy: 'Tango', amerykanski: 'Thomas', polski: 'Tadeusz', rosyjski: 'Tatiana' },
  { litera: 'U', miedzynarodowy: 'Uniform', amerykanski: 'Union', polski: 'Urszula', rosyjski: 'Uliana' },
  { litera: 'V', miedzynarodowy: 'Victor', amerykanski: 'Victor', polski: 'Violetta', rosyjski: 'Żenia (Żuk)' },
  { litera: 'W', miedzynarodowy: 'Whiskey', amerykanski: 'William', polski: 'Wacław', rosyjski: 'Wasilij' },
  { litera: 'X', miedzynarodowy: 'X-ray', amerykanski: 'X-ray', polski: 'Xsantypa (iks)', rosyjski: 'Miakkij Znak' },
  { litera: 'Y', miedzynarodowy: 'Yankee', amerykanski: 'Young', polski: 'Ypsylon', rosyjski: 'Igrak' },
  { litera: 'Z', miedzynarodowy: 'Zulu', amerykanski: 'Zebra', polski: 'Zygmunt', rosyjski: 'Zinajda' },
]

const raportyRST = [
  { kod: 'R - 1', opis: 'nieczytelny' },
  { kod: 'R - 2', opis: 'czytelny ze znacznymi trudnościami (ledwie czytelny)' },
  { kod: 'R - 3', opis: 'czytelny z dużymi trudnościami' },
  { kod: 'R - 4', opis: 'czytelny z niewielkimi trudnościami' },
  { kod: 'R - 5', opis: 'dobrze czytelny' },
  { kod: 'S - 1', opis: 'bardzo słaby' },
  { kod: 'S - 2', opis: 'bardzo słaby ale czytelny' },
  { kod: 'S - 3', opis: 'słaby' },
  { kod: 'S - 4', opis: 'dostatecznie dobry dla odbioru (umiarkowany)' },
  { kod: 'S - 5', opis: 'dość dobry dla odbioru' },
  { kod: 'S - 6', opis: 'dobry' },
  { kod: 'S - 7', opis: 'umiarkowanie silny' },
  { kod: 'S - 8', opis: 'silny' },
  { kod: 'S - 9', opis: 'bardzo silny' },
  { kod: 'T - 1', opis: 'bardzo chrapliwy ton prądu zmiennego' },
  { kod: 'T - 2', opis: 'chrapliwy ton prądu zmiennego, bez śladów muzykalności' },
  { kod: 'T - 3', opis: 'chrapliwy, niski ton prądu zmiennego, lekko muzykalny' },
  { kod: 'T - 4', opis: 'nieco chrapliwy ton prądu zmiennego' },
  { kod: 'T - 5', opis: 'ton dźwięczny, modulowany składową zmienną' },
  { kod: 'T - 6', opis: 'ton modulowany, lekko świszczący' },
  { kod: 'T - 7', opis: 'ton prawie czysty, lekko świszczący' },
  { kod: 'T - 8', opis: 'ton czysty' },
  { kod: 'T - 9', opis: 'bardzo czysty, dźwięczny ton' },
]

const raportyRSQ = [
  { kod: 'R - 1', opis: 'czytelność 0%' },
  { kod: 'R - 2', opis: 'czytelność 20%' },
  { kod: 'R - 3', opis: 'czytelność 40%' },
  { kod: 'R - 4', opis: 'czytelność 80%' },
  { kod: 'R - 5', opis: 'czytelność 95%' },
  { kod: 'S - 1', opis: 'ledwo widzialna ścieżka' },
  { kod: 'S - 3', opis: 'słaba ścieżka' },
  { kod: 'S - 5', opis: 'umiarkowanie silna ścieżka' },
  { kod: 'S - 7', opis: 'silna ścieżka' },
  { kod: 'S - 9', opis: 'bardzo silna ścieżka' },
  { kod: 'Q - 1', opis: 'bardzo silnie zniekształcona ścieżka (splatter)' },
  { kod: 'Q - 3', opis: 'sygnał wielotorowy' },
  { kod: 'Q - 5', opis: 'bardzo słabo zauważalna para sygnału' },
  { kod: 'Q - 7', opis: 'ledwo zauważalna para sygnału' },
  { kod: 'Q - 9', opis: 'bardzo czysta jedna ścieżka sygnału' },
]
</script>
