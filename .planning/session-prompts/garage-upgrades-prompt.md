# Garage & Upgrades (Phase C) — Session Prompt for Claude Code
## Copy the prompt below and paste as first message in a new Claude Code session
---

```
Du arbeitest am Spiel KART PETS (c:\Users\admin\Desktop\Pet Kart APP Spiel\kart-pets).
Lies ZUERST die Claud.md, Kontext.md und Plan.md im übergeordneten Ordner
(c:\Users\admin\Desktop\Pet Kart APP Spiel\) — sie enthalten Vision, Design-Regeln und Roadmap.
Antworte auf Deutsch, knapp, mit klarer Empfehlung. Design strikt im Stil der Mockups
(dunkelblau/violett, runde Buttons mit Glow, Pet-Farben).

## Aufgabe: Phase C – Kart-Garage & Upgrades (Prompt 4)

### Worum geht es?
Der Spieler soll sein Kart mit Münzen verbessern können: Motor (Tempo), Reifen (Kontrolle),
Booster (Beschleunigung), Panzer (Schutz/Rempel-Stabilität). Upgrades kosten Münzen, haben
mehrere Stufen, und wirken SPÜRBAR im Rennen. Ziel: ein Garage-Screen im hochwertigen Mobile-
Game-UI plus die Anbindung der Upgrade-Werte an die Fahrphysik. Danach folgen Phase D
(Progression/Tagesaufgaben/Pet-Eier), E (Shop/Season-Pass), F (PWA/Store), G (Marke).

### Was ES SCHON GIBT (nicht neu bauen!) — diese Dateien ZUERST komplett lesen

1. `src/store/gameStore.ts` (~49 Zeilen, COMPLETE) — zustand + persist (localStorage key
   'kart-pets-save'). Hat: screen, selectedPetId, selectedTrackId, coins, totalPoints,
   petXp, lastXpGain, lastResult. Aktionen: setScreen, selectPet, selectTrack, finishRace.
   -> HIER kommen Upgrade-State + Kaufaktion + Münz-Abzug rein. Muster für neue Felder:
   exakt wie petXp (Record + Spread-Update).
2. `src/game/raceSim.ts` (~204 Zeilen, COMPLETE) — Arcade-Physik. `KartState` (~10) enthält
   schon `pet` und `level`. `levelBonus()` (~70), `maxSpeedFor()` (~76), `turnRateFor()` (~86)
   zeigen das Muster, wie Boni multiplikativ einfließen. ACCEL/BOOST_MULT als Konstanten oben.
   -> HIER fließen Upgrade-Stufen als Faktoren ein (analog zu levelBonus).
3. `src/game/RaceScene.tsx` (~271 Zeilen, COMPLETE) — Renn-Loop. `makeKart()` (~33) baut
   KartState; `RaceScene` Props haben `playerLevel`. -> Upgrade-Werte hier in den Spieler-Kart
   reichen (analog zu playerLevel).
4. `src/screens/RaceScreen.tsx` (~53 Zeilen) — liest Store, berechnet playerLevel via
   `levelFromXp`, übergibt an RaceScene. -> Upgrade-Werte hier aus Store holen & übergeben.
5. `src/screens/MainMenu.tsx` (~103 Zeilen) — Welt-Auswahl, Pet-Auswahl, Pet-Karte mit
   "Profil ›"-Button (setScreen('petprofile')), CTA. -> Garage-Button ergänzen.
6. `src/screens/PetProfile.tsx` (~84) + `src/data/progression.ts` (~42) — Vorlage für einen
   neuen Vollbild-Screen (back-btn, profile-card) und für ein Stufen-/Werte-Datenmodul.
7. `src/types/index.ts` (~37) — `Screen` Union ('menu'|'race'|'result'|'petprofile').
   -> 'garage' ergänzen. Hier liegen Pet/EarType/RaceResult-Typen.
8. `src/index.css` (~639) — Theme-Variablen (:root), .screen, .profile-card, .cta, .rarity,
   .back-btn, StatBar. -> Garage-UI mit diesen Klassen/Variablen gestalten (kein neues Theme).

Routing: `src/App.tsx` (~16) rendert Screens nach store.screen. Neuer Screen = hier eintragen.

### Was FEHLT (deine Aufgabe — N Lücken schließen)

**Lücke 1: Upgrade-Datenmodell** `src/data/upgrades.ts` (neu)
- Es gibt keine Upgrade-Definitionen. Erstelle 4 Bereiche (motor, reifen, booster, panzer)
  mit je: id, name, emoji, beschreibung, maxLevel (z.B. 5), Kosten je Stufe (steigend) und
  Effekt je Stufe. Plus Helfer `effectFor(area, level)` und `costFor(area, level)`.
- Muster: analog `src/data/progression.ts` (reine Funktionen + Konstanten).

**Lücke 2: Upgrade-State im Store** `src/store/gameStore.ts`
- Ergänze `upgrades: Record<string, number>` (Bereich -> Stufe, Default {}) und Aktion
  `buyUpgrade(area)`: prüft Kosten via costFor, zieht Münzen ab, erhöht Stufe (nur wenn
  genug Münzen & < maxLevel). Muster exakt wie `petXp`/`finishRace` (Spread-Update).
- persist speichert automatisch mit.

**Lücke 3: Upgrades wirken im Rennen** `src/game/raceSim.ts` + `RaceScene.tsx` + `RaceScreen.tsx`
- KartState um Upgrade-Faktoren erweitern (z.B. `upgrades: {speed,control,accel,armor}`),
  in `makeKart` setzen (Spieler aus Store, KI = neutrale 0-Werte). In `maxSpeedFor`/
  `turnRateFor`/ACCEL bzw. Boost die Faktoren multiplikativ einrechnen (analog `levelBonus`).
  Panzer reduziert Tempoverlust in `resolveCollisions` (~150).
- RaceScreen liest `upgrades` aus Store, rechnet via effectFor in Faktoren um, übergibt an
  RaceScene -> makeKart (gleicher Weg wie playerLevel).

**Lücke 4: Garage-Screen** `src/screens/Garage.tsx` (neu) + `App.tsx` + `MainMenu.tsx` + types
- Vollbild-Screen wie PetProfile: zeigt 4 Upgrade-Bereiche mit aktueller Stufe (Balken via
  StatBar), Effekt, Kosten der nächsten Stufe und Kauf-Button (deaktiviert wenn zu teuer /
  max). Münzstand oben. back-btn zum Menü.
- `Screen`-Union um 'garage' erweitern; App.tsx Route ergänzen; MainMenu einen Garage-Button
  (setScreen('garage')) ergänzen (neben/unter "Profil ›" oder als eigene Aktion).

### Constraints
- Bestehenden Code NICHT umbauen; nur erweitern. Muster der vorhandenen Module übernehmen.
- zustand + persist beibehalten (localStorage key 'kart-pets-save'); neue Felder mit Defaults,
  damit alte Spielstände nicht brechen.
- Mobile-First & Touch: alles mit dem Daumen bedienbar; vorhandene CSS-Variablen/Klassen nutzen.
- Upgrade-Boni FAIR halten (kein extremer Sprung); multiplikativ wie `levelBonus` (~+3–15%).
- Echtzeit-Eingaben bleiben in `src/game/controls.ts` (kein React-State im Loop).
- GLTF-Assets in `public/models/` (inkl. `Textures/colormap.png`) NICHT verschieben/umbenennen.
- `npm run build` muss am Ende fehlerfrei sein (tsc-strict: keine ungenutzten Imports/Vars).

### Workflow
1. Alle gelisteten Dateien KOMPLETT lesen, bevor du planst.
2. Lücken als isolierte, unabhängige Änderungen planen.
3. Eine Lücke nach der anderen umsetzen, je mit Build-/Typecheck.
4. Am Ende: voller Build als Regressionstest. Danach im Browser prüfen
   (npm run dev) — Upgrade kaufen, Münzen sinken, Effekt im Rennen spürbar.
5. Pro Lücke ein klarer, beschreibender Commit (Repo ist evtl. noch kein git — dann optional).

### Verification
- `cd "c:\Users\admin\Desktop\Pet Kart APP Spiel\kart-pets" && npm run build`
- `npm run dev` und im Browser: Menü -> Garage -> Upgrade kaufen (Münzen sinken,
  Stufe steigt) -> Rennen starten -> Effekt spürbar (Tempo/Kontrolle/Boost).
- Reload-Test: Browser neu laden -> Upgrades & Münzen bleiben erhalten (localStorage).
- Headless-Render-Check (optional): vorhandenes Muster aus den scratchpad-Skripten der
  Vorsession (Playwright, langer Screenshot-Timeout wegen Software-WebGL).

### Was du NICHT tun sollst
- NICHT die Renn-Physik-Werte (ACCEL/TURN/BASE_MAX etc.) grundlegend ändern — nur Upgrade-
  Faktoren ergänzen. Das Fahrgefühl ist abgenommen.
- NICHT die GLTF-Karts, PetFigure, Theme-Welten oder Effekte umbauen — sind fertig & abgenommen.
- NICHT den persist-Key oder bestehende Store-Felder umbenennen (bricht Spielstände).
- KEINE neue Physik-Engine / kein neues State-Management einführen.
- KEINE Dateien löschen ohne Nachfrage; kein `git push --force`.
- KEIN neues UI-Theme — die vorhandenen CSS-Variablen/Klassen in src/index.css verwenden.
```
