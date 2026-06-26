# Phase D – Progression & Belohnungs-Loop — Session Prompt für Claude Code
## Kopiere den Prompt unten und füge ihn als erste Nachricht in eine neue Claude-Code-Session ein
---

```
Du arbeitest am Spiel KART PETS (c:\Users\admin\Desktop\Pet Kart APP Spiel\kart-pets).
Lies ZUERST die Claud.md, Kontext.md und Plan.md im übergeordneten Ordner
(c:\Users\admin\Desktop\Pet Kart APP Spiel\) — sie enthalten Vision, Design-Regeln und Roadmap.
Antworte auf Deutsch, knapp, mit klarer Empfehlung. Design strikt im Stil der Mockups
(dunkelblau/violett, runde Buttons mit Glow, Pet-Farben).

## Aufgabe: Phase D – Progression, Tagesaufgaben, Pet-Eier & Belohnungen (Prompt 5)

### Worum geht es?
Phase A–C lieferten Rennen, Pets und Garage-Upgrades. Jetzt fehlt der MOTIVATIONS-LOOP, der
zum Weiterspielen anregt: Tägliche Aufgaben mit Münz-Belohnung, ein Spieler-Meta-Level
(getrennt von der Pet-Stufe), Pet-Eier zum Freischalten neuer Pets, eine neue freischaltbare
Strecke (Sternen-Kolonie) und Truhen als Zufallsbelohnung. Ziel: Nach jedem Rennen gibt es
einen Grund weiterzuspielen — fair, ohne Bezahlzwang. Danach folgen Phase E (Shop/Season-Pass),
F (PWA/Store), G (Marke).

### Was ES SCHON GIBT (nicht neu bauen!) — diese Dateien ZUERST komplett lesen

1. `src/store/gameStore.ts` (~75 Zeilen, COMPLETE) — zustand + persist (localStorage key
   'kart-pets-save'). Hat: screen, selectedPetId, selectedTrackId, coins, totalPoints, petXp,
   upgrades, lastXpGain, lastResult. Aktionen: setScreen, selectPet, selectTrack, buyUpgrade,
   finishRace. -> HIER kommen Progression-State (Tagesaufgaben, ownedPets, unlockedTracks,
   Spieler-XP, Truhen) + neue Aktionen rein. Muster für neue Felder: exakt wie `upgrades`/`petXp`
   (Record + Spread-Update); Kauf-/Abzug-Logik wie `buyUpgrade`.
2. `src/data/progression.ts` (~48, COMPLETE) — reine Funktionen + Konstanten: xpNeededForLevel,
   stageForLevel, STAGE_EMOJI, levelFromXp, xpFromPoints. -> Vorlage/Heimat für neue
   Progression-Helfer (Spieler-Level, Tagesaufgaben-Definitionen analog aufbauen).
3. `src/data/upgrades.ts` (~95, COMPLETE) — Vorlage für ein NEUES Datenmodul: Konstanten-Array
   (UPGRADES) + Lookup (getUpgrade) + reine Helfer (effectFor/costFor). Tagesaufgaben & Eier-
   Tabellen GENAU so strukturieren.
4. `src/game/RaceScene.tsx` (~280, COMPLETE) — Renn-Loop, ruft am Ende `onFinish(RaceResult)`
   (~230) mit { entries, playerRank, points, coins }. -> Falls Tagesaufgaben Renn-Metriken
   brauchen (Drifts, Booster-Nutzung), HIER zählen und in RaceResult ergänzen. Drift/Boost-State
   liegt im KartState (drifting, boostTime) in `src/game/raceSim.ts`.
5. `src/store/gameStore.ts` `finishRace` (~Zeile 48) — verteilt schon coins/points/petXp und
   setzt screen='result'. -> HIER Tagesaufgaben-Fortschritt & Spieler-XP & Truhen-Drop einhängen.
6. `src/screens/ResultScreen.tsx` (~87, COMPLETE) — zeigt Platz, Punkte/Münzen/XP-Reward,
   Level-Up, Standings. Nutzt reward-row/reward/levelup-Klassen. -> Vorlage für Belohnungs-
   Anzeige; hier ggf. erfüllte Tagesaufgaben / Truhen-Drop einblenden.
7. `src/screens/MainMenu.tsx` (~118, COMPLETE) — Welt-Auswahl (TRACKS.map, ~46), Pet-Auswahl
   (PETS.map, ~66), menu-actions mit Garage- + Start-Button (~108). -> Strecken nach
   unlockedTracks sperren; nur ownedPets als wählbar zeigen; Buttons für Tagesaufgaben & Eier.
8. `src/data/tracks.ts` (~129, COMPLETE) — 4 TrackDefs (fluesterwald, candychaos, vulkanrasen,
   skylinecity) + getTrack + ROAD_WIDTH. Sternen-Kolonie (5. Strecke aus Kontext.md) FEHLT.
   -> 5. TrackDef ergänzen (Muster exakt wie skylinecity: theme + 10 points).
9. `src/data/pets.ts` (~87, COMPLETE) — 5 Kern-Pets (fynnox, pompao, zippo, drako, neko) +
   getPet + AI_STYLES. Kontext.md listet 18 Pets im Roster. -> Für Pet-Eier weitere Pet-Defs
   ergänzen (gleiche GLB-Modelle/earTypes wiederverwenden) und Freischalt-Status über Store.
10. `src/index.css` (~740) + `src/ui/StatBar.tsx` — Theme-Variablen (:root), .screen,
    .profile-card, .cta(.secondary), .currency, .back-btn, .menu-actions, StatBar. -> Neue
    Screens/Karten mit DIESEN Klassen gestalten (kein neues Theme).
11. `src/types/index.ts` (~43) — `Screen` Union ('menu'|'race'|'result'|'petprofile'|'garage').
    -> Neue Screens ergänzen ('dailies', evtl. 'eggs'). Pet/RaceResult-Typen liegen hier.

Routing: `src/App.tsx` (~19) rendert Screens nach store.screen. Neuer Screen = hier eintragen.

### Was FEHLT (deine Aufgabe — 4 Lücken schließen)

**Lücke 1: Tägliche Aufgaben** `src/data/dailyTasks.ts` (neu) + Store + neuer Screen
- Es gibt keine Aufgaben. Erstelle 3–4 Aufgaben-Definitionen (id, beschreibung, emoji, Zielwert,
  Münz-Belohnung), die aus VERFÜGBAREN Renn-Daten messbar sind: „Beende 3 Rennen", „Gewinne
  1 Rennen", „Sammle 30 Münzen". Muster: reine Konstanten/Helfer wie `src/data/upgrades.ts`.
- Store: `dailyProgress: Record<string, number>` + `claimedTasks: string[]` + Aktion
  `claimTask(id)` (zahlt Belohnung aus wenn Ziel erreicht & nicht beansprucht). `finishRace`
  erhöht die relevanten Zähler. Tages-Reset über gespeichertes Datum (z. B. `dailyDate`):
  beim Öffnen prüfen, ob neuer Tag -> Fortschritt/Claims zurücksetzen.
- Neuer Vollbild-Screen `src/screens/DailyTasks.tsx` (Vorlage: Garage.tsx/PetProfile.tsx):
  Liste mit Fortschrittsbalken (StatBar), Belohnung, „Abholen"-Button (deaktiviert bis Ziel
  erreicht). back-btn + Münzstand oben. Button im MainMenu + Route in App.tsx + Screen-Typ.

**Lücke 2: Strecken-Freischaltung + neue Strecke** `src/data/tracks.ts` + Store + `MainMenu.tsx`
- Aktuell sind alle 4 Strecken frei wählbar; es gibt keine 5. Strecke. Ergänze die 5. TrackDef
  „Sternen-Kolonie" (Schwer, sky:'night', eigenes theme + 10 points) — Muster exakt skylinecity.
- Store: `unlockedTracks: string[]` (Default `['fluesterwald']`) + Freischalt-Regel (z. B. per
  Spieler-Level ODER Kauf mit Münzen via Aktion `unlockTrack(id)`). Lege je Track eine
  Freischalt-Bedingung fest (kleine Tabelle in tracks.ts, z. B. `unlockAtPoints`).
- MainMenu: gesperrte Strecken ausgegraut + 🔒 + nicht wählbar (selectTrack nur wenn unlocked).

**Lücke 3: Spieler-Meta-Level** `src/data/progression.ts` + Store + UI
- `totalPoints` wird summiert, aber daraus entsteht kein Spieler-Level. Ergänze `playerLevelFromPoints`
  (analog `levelFromXp`) — ein vom Pet getrenntes Spieler-Profil-Level, das z. B. Strecken/Eier
  freischaltet. Im finishRace nichts Neues nötig (totalPoints existiert), nur Anzeige + Nutzung
  als Freischalt-Gate (Lücke 2/4).
- UI: Spieler-Level im MainMenu-topbar (neben Münzen) und/oder als kleine Leiste anzeigen.

**Lücke 4: Pet-Eier (neue Pets freischalten)** `src/data/pets.ts` + Store + neuer Screen/Sektion
- Aktuell sind alle 5 Pets sofort spielbar. Ergänze weitere Pet-Defs aus dem Roster (Kontext.md:
  z. B. Lupix/Owlio/Flami/Pingu) — GLB-Modelle & earTypes der 5 Kern-Pets WIEDERVERWENDEN.
- Store: `ownedPets: string[]` (Default = die 5 Kern-Pet-IDs) + Aktion `hatchEgg()`: kostet
  Münzen (Muster wie `buyUpgrade`), schaltet ein zufälliges noch nicht besessenes Pet frei.
- MainMenu Pet-Auswahl zeigt nur `ownedPets` als wählbar; Rest als 🔒-Slot. Ei-Kauf als eigener
  Screen `src/screens/PetEggs.tsx` ODER Sektion (Vorlage Garage.tsx) mit Münz-Kosten + „Ei öffnen".

### Constraints
- Bestehenden Code NICHT umbauen; nur erweitern. Muster der vorhandenen Module übernehmen
  (Datenmodule wie upgrades.ts; Store-Aktionen wie buyUpgrade/finishRace; Screens wie Garage.tsx).
- zustand + persist beibehalten (localStorage key 'kart-pets-save'); ALLE neuen Felder mit
  Defaults (`?? 0`, `?? []`), damit alte Spielstände nicht brechen.
- Belohnungen FAIR halten (kein Pay-to-Win): nur Münzen als Währung, keine echte Bezahlung.
  Tagesaufgaben-Belohnungen moderat (z. B. 50–150 Münzen), Ei-/Strecken-Kosten spürbar aber
  erreichbar (im Verhältnis zu ~50–150 Münzen pro Rennen).
- Mobile-First & Touch: alles mit dem Daumen bedienbar; vorhandene CSS-Variablen/Klassen nutzen,
  kein neues Theme.
- Tages-Reset rein lokal über gespeichertes Datum — KEINE Server/Netzwerk-Abhängigkeit.
- GLTF-Assets in `public/models/` NICHT verschieben/umbenennen; neue Pets nutzen vorhandene GLBs.
- `npm run build` muss am Ende fehlerfrei sein (tsc-strict: keine ungenutzten Imports/Vars).
- Echtzeit-Eingaben bleiben in `src/game/controls.ts` (kein React-State im Renn-Loop).

### Workflow
1. Alle gelisteten Dateien KOMPLETT lesen, bevor du planst.
2. Lücken als isolierte, unabhängige Änderungen planen. Reihenfolge-Empfehlung:
   Lücke 3 (Spieler-Level, klein) -> 1 (Tagesaufgaben) -> 2 (Strecken) -> 4 (Eier).
3. Eine Lücke nach der anderen umsetzen, je mit Build-/Typecheck.
4. Am Ende: voller Build als Regressionstest. Danach im Browser prüfen (npm run dev) —
   Rennen fahren -> Tagesaufgabe erfüllt sich -> Belohnung abholen (Münzen steigen) ->
   Strecke/Ei freischalten -> Reload-Test (alles bleibt erhalten).
5. Pro Lücke ein klarer, beschreibender Commit (Repo ist evtl. noch kein git — dann optional).

### Verification
- `cd "c:\Users\admin\Desktop\Pet Kart APP Spiel\kart-pets" && npm run build`
- `npm run dev` und im Browser: Menü -> Tagesaufgaben -> Rennen fahren -> Aufgabe erfüllt ->
  „Abholen" -> Münzen steigen. Strecke freischalten -> wird wählbar. Ei öffnen -> neues Pet
  wählbar.
- Reload-Test: Browser neu laden -> Münzen, Aufgaben-Fortschritt, freigeschaltete Strecken &
  Pets bleiben erhalten (localStorage 'kart-pets-save').
- Tages-Reset-Test: gespeichertes `dailyDate` im localStorage manuell auf gestern setzen ->
  Reload -> Aufgaben sind zurückgesetzt.

### Was du NICHT tun sollst
- NICHT die Renn-Physik (raceSim.ts: ACCEL/TURN/BASE_MAX, levelBonus, maxSpeedFor) oder die
  Garage-Upgrade-Faktoren ändern — Phase A–C sind abgenommen.
- NICHT die GLTF-Karts, PetFigure, Theme-Welten oder Effekte umbauen — fertig & abgenommen.
- NICHT den persist-Key oder bestehende Store-Felder/Aktionen umbenennen (bricht Spielstände).
- KEINE echte Bezahlung / Premium-Währung / Server-Anbindung einführen (das ist Phase E/F).
- KEINE neue Physik-Engine / kein neues State-Management; zustand + persist bleibt.
- KEINE Dateien löschen ohne Nachfrage; kein `git push --force`.
- KEIN neues UI-Theme — die vorhandenen CSS-Variablen/Klassen in src/index.css verwenden.
```
