# ADBS MongoDB Notepad

Projekt realizowany na potrzeby przedmiotu Advanced Database Systems 2025 - Uniwersytet Merito

Autor: Hubert Lipiński <br/>
Licencja: MIT

## Funkcjonalności
- Tworzenie edycja i zarządzanie notatkami.
- Wyszukiwanie notatek po tytule, tagach i geolokalizacji (w promieniu x kilometrów).
- Logowanie, rejestracja i zarządzanie kontem.
- Wybór lokalizacji na mapie z obsługą współrzędnych.
- Przechowywanie danych w MongoDB z indeksami dla tagów i lokalizacji.

### Link do demo: [https://adbs-mongodb-notepad.vercel.app](https://adbs-mongodb-notepad.vercel.app)

## Setup

### Wymagania:
- **Node: `v22.15`**
- **npm: `10.9`**

## Instalacja zależności:
```bash
npm install
```

## Konfiguracja zmiennych środowiskowych:
```bash
# windows
copy .env.example .env

# linux
cp .env.example .env
```

### Zmienne środowiskowe projektu

- `MONGODB_URI=''` - adres połączenia z MongoDB
- `MONGODB_DEFAULT_COLLECTION='notepad_data'` - nazwa kolekcji w której znajdują się nasze dane
- `AUTH_ORIGIN='http://localhost:<PORT>/api/auth'` - należy zmienić `<PORT>` jeśli aplikacja została uruchomiona na innym porcie niż domyślny

<br/>

> [!WARNING]  
> W pliku .env należy uzupełnić `MONGODB_URI=` na adres bazy danych np `MONGODB_URI='mongodb://localhost:<mongoDB_port>'`

<br/>

## Seeder Bazy danych

Po konfiguracji zmiennych środowiskowych możemy zassedować bazę danych:

```bash
# Destrukcyjne - usuwamy wszystkie dane z kolekcji (fresh seed)
npm run db:seed:fresh

# Niedestrukcyjne - dodajemy nowe dane do bazy
npm run db:seed
```
Hasło dla seedwoanych użytkowników to domyślnie `zaq1@WSX`
Domyślnie seeder dodaje `50` uzytkowników i `20` notatek dla kazdego użytkownika. Parametry mozna zmienić w pliku `server/seeders/index.ts`

## Uruchomienie serwera

Po wykonaniu poniższej komendy serwer uruchomi się na adresie `http://localhost:3000`:

```bash
npm run dev
```
<br/>