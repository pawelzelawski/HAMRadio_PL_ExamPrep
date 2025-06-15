# Egzamin KF – Aplikacja do nauki i powtórek przed egzaminem krótkofalarskim

## Co to jest?
Aplikacja webowa służąca do nauki, powtórek i przygotowania do polskiego egzaminu krótkofalarskiego (klasa A). Pozwala na wygodne przeglądanie bazy pytań, naukę z fiszek oraz rozwiązywanie testów próbnych.

**Działająca wersja online:**
https://egzaminkf.pzelawski.xyz/

## Funkcje aplikacji
- Przeglądanie pełnej bazy pytań egzaminacyjnych z podziałem na kategorie
- Tryb fiszek (fiszki z pytaniami, zapamiętywanie znanych/nieznanych)
- Test próbny (losowy zestaw 20 pytań, natychmiastowa informacja zwrotna)
- Sekcja nauki: kody Q, literowanie, raporty, skróty i inne przydatne tabele

## Nowoczesne możliwości
- W pełni responsywny interfejs (działa na komputerach, tabletach i smartfonach)
- PWA: możliwość instalacji na urządzeniu (Android/iOS/PC)
- Działa offline – po pierwszym załadowaniu można korzystać bez dostępu do internetu
- Szybki, lekki i nowoczesny interfejs (Vue 3 + Vite + Tailwind CSS)

## Jak zbudować i uruchomić aplikację samodzielnie?
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/pawelzelawski/HAMRadio_PL_ExamPrep.git
   cd HAMRadio_PL_ExamPrep
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Zbuduj aplikację produkcyjną:
   ```bash
   npm run build
   ```
4. Wygenerowany katalog `dist/` możesz umieścić na dowolnym serwerze www (np. za Nginx).

## Zgłaszanie błędów
Jeśli znalazłeś błąd lub masz sugestię, utwórz zgłoszenie (issue) na GitHubie w tym repozytorium.

## Licencja
Projekt dostępny na licencji MIT. Szczegóły w pliku [LICENSE](./LICENSE).
