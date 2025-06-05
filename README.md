# ADBS MongoDB Notepad

Projekt realizowany na potrzeby przedmiotu Advanced Database Systems 2025 - Merito

Autor: Hubert Lipiński <br/>
Licencja: MIT

## Funkcjonalności
- Tworzenie edycja i zarządzanie notatkami.
- Wyszukiwanie notatek po tytule i tagach.
- Logowanie, rejestracja i zarządzanie kontem.
- Wybór lokalizacji na mapie z obsługą współrzędnych.
- Przechowywanie danych w MongoDB z indeksami dla tagów i lokalizacji.

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
- `AUTH_ORIGIN='http://localhost:<PORT>/api/auth'` jeśli aplikacja została uruchomiona na innym porcie niż domyślny

<br/>

> [!WARNING]  
> W pliku .env należy uzupełnić `MONGODB_URI=` na adres bazy danych np `MONGODB_URI='mongodb://localhost:<mongoDB_port>'`

<br/>

## Uruchomienie serwera

Domyślnie serwer uruchomi się na adresie `http://localhost:3000`:

```bash
npm run dev
```
<br/>