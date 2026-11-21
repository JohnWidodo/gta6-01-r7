# gta6-01-r7

[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/JohnWidodo/gta6-01-r7/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/JohnWidodo/gta6-01-r7/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

Coraline Bay is an original, fictional coastal city of harbor deals, sunlit boulevards and unfinished business. You are Rook, an ex-getaway driver returning home. Fixer Mara Voss offers ten operations that turn a familiar street into a bigger promise. Everything visible is built from procedural geometry; all music and sound are synthesized. No real city, branded vehicle, licensed character or borrowed game art appears here.

## Run it

```sh
node serve.ts
# then open http://localhost:8080/
```

## Controls

| Control | Action |
|---|---|
| WASD | Walk or accelerate, reverse and steer a car |
| Mouse | Look around (click the world first) |
| Shift | Run on foot |
| Space | Handbrake in a car; punch on foot |
| E | Exit, enter or steal a nearby car; use services; complete delivery objectives |
| F | Punch |
| 1 / 2 / 3 | Fists / pistol / SMG |
| Q held | Weapon wheel |
| Click / J | Fire selected firearm |
| N | Begin the next unfinished operation |
| R / M | Cycle station / mute radio |
| K / L | Quick save / load progress |
| H | Toggle controls guide |
| G / B / C | Purchases shown by an open service menu |
| Enter | Recover after being busted |

## City and standing

The drivable street grid connects five neighborhoods, with 32 moving traffic cars, a parked ride and 72 visible walking citizens. Coral Quay has cranes, piers and freight buildings. Palm Row has a continuous beach promenade, palms and warm low-rise blocks beside the sea. Downtown Coraline has glazed high-rises. Neon Market uses pink facades, luminous trim and canopy stalls. Citrus Heights has green rooftops backed by hills.

Each district has a standing value from 0 to 100, shown with the current district in the HUD. Completing an operation adds 12 to its district; the finale’s visits add 20 to each visited district, capped at 100. Detection radius is `30 + (100 - standing) × 0.35` meters. Escaping requires remaining beyond this radius for `8 + (100 - standing) / 12` seconds. Garage prices multiply their base by `1.3 - standing × 0.007`, rounded to dollars. Standing therefore changes measurable pursuit behavior and service costs, and persists with saved progress.

## Systems

Rook can walk, run, look and punch, or enter, exit and carjack simulated traffic. Car acceleration, steering, reverse, handbraking, engine upgrades, collisions and speed are simulated. Buildings and the coast stop movement. Pedestrians walk sidewalk routes, animate their legs, flee close to serious police heat and can be struck or punched.

The CBPD — Coraline Bay Police Department — patrols at peace. Crimes create one to five wanted stars. Pursuing patrol cars damage Rook on contact; wanted three adds RAM/PIT drivers that intercept ahead of the car and disrupt steering. Wanted four adds roadblocks and a helicopter with spinning rotor and visible searchlight; five brings the full pursuit group. The chase demonstration also shows the helicopter at three stars for its cover composition. Leave pursuing units’ detection radius for the standing-dependent escape interval to clear wanted and record the best wanted level escaped. Losing all health triggers a busted screen, a $250 penalty and recovery at the hideout. A garage can clear wanted for cash.

Weapon slots include fists, pistol and SMG. Firearms consume their own ammo and use a camera ray against pedestrians, vehicles and police. Tracers, impact sparks, health loss and police escalation are visible. Fists have a close-range check. The SMG fires faster than the pistol. Armor reduces contact damage from police.

Garages in every district — Sunline Customs, Quay Motorworks, Static Auto, Neon Customs and Citrus Motors — sell engine performance (base $700), armor (base $550), and wanted clearance (base $250 plus $100 per star), with standing discounts. Bay Supply sells 40 pistol and 90 SMG rounds for $180, or full health for $120. Rook’s Hideout saves and restores health. Approach the marked rings and press E. Garage and shop choices display their working keys and cash prices.

SUNLINE FM plays coastal soul, AFTERGLOW plays neon pulse, and CITRUS FM plays desert funk. All three are original oscillator patterns generated through WebAudio. Audio begins on the first key or pointer gesture, following browser autoplay requirements. The radio also synthesizes a police siren accent during pursuit.

LocalStorage saves cash, completed operation IDs, all five standing values, best wanted escaped, engine and armor. Operation completion and purchases save automatically; the hideout and K save manually. L loads stored progress. Health, ammo, location and active pursuit reset on page load.

The HUD contains five wanted stars, CBPD pursuit/search status, health, ammo, cash, district and standing, objective and timer, operation count, speed, radio station and contextual prompts. Its canvas minimap shows district boundaries, the street grid, sea, player orientation, police, services and mission beacons.

## Mara’s ten operations

Every operation has opening and completion dialogue, one or more real objectives, cash rewards and district standing. N starts the next incomplete operation. Deliveries require getting within seven meters and pressing E; race gates trigger on drive-through. Missed timed objectives can be restarted with N.

| # | Operation | Objectives | Cash |
|---|---|---|---|
| 1 | First Light | Tutorial: drive eight meters, then meet Mara at the Palm Row beacon | $450 |
| 2 | Borrowed Wheels | Exit, steal a traffic car, then escape a CBPD tail | $700 |
| 3 | Quay Deals | Collect the harbor case within 90 seconds | $900 |
| 4 | Palm Row Heat | Pass three beach boulevard race gates within 110 seconds | $1,100 |
| 5 | Neon Ledger | Collect three debts at distinct market corners | $1,300 |
| 6 | High Tide | Cross a four-star CBPD roadblock, then lose pursuit | $1,600 |
| 7 | Citrus Run | Complete two smuggling drops in the Heights within 140 seconds | $1,800 |
| 8 | Downtown Static | Jam the relay for 20 seconds, slowing units and disabling detection; escape three-star heat | $2,200 |
| 9 | The Long Sunset | Meet a lookout, collect a getaway plan, brief Mara | $2,600 |
| 10 | Coraline Rising | Rally all five districts, gain standing, confront a four-star escalation | $5,000 |

Mara’s First Light opening: “The bay remembers you, Rook. Show me you still know the streets.” Finale completion: “Coraline is ours because we showed up. You’re home, Rook.” All names, dialogue and mission routes are original.

## Reproducible scenes and verification

`?scene=chase` starts Rook driving at Palm Row with three stars, CBPD, helicopter, traffic and citizens in view. `?scene=drive` starts free driving. `?scene=foot` places Rook beside the boulevard’s parked car. `?scene=mission` starts First Light. `?scene=save` loads persistent progress for the save demonstration. Invalid and empty scene values fall back to free driving. City, cars, people and effects use seeded procedural generation.

`node tests/verify.mjs` serves the game with a small Node static server, launches cached Chromium through CDP, and checks actual frames, controls, visible actors, minimap pixels, objective progress, storage persistence, console errors and every runtime request. It uses no new dependencies. `node tests/verify.mjs --capture` additionally writes four 1280×720 JPEG screenshots under the 256 KiB cap.

Package with `MAKEFUN_OUTPUT_DIR=.artifacts/out node main.ts`. The program copies the static game and four screenshots and invokes the unchanged vendored dossier builder. BUILD-REPORT.md records measured checks, package hashes, captures and milestone commits.

## Implementation boundaries

This is a compact browser sandbox: procedural facades instead of interiors, simplified contact combat and direct pursuit steering. Traffic follows grid routes; citizens follow sidewalks. Services are local menus and the heist is a narrative setup operation. It does not simulate a multiplayer economy or interior missions. The complete ten-operation chain and all listed purchase, standing, pursuit and save mechanics are implemented in the modules under `game/src/`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=fcgkersq&utm_source=github&utm_medium=readme&utm_campaign=gta6-01) · AI agents build software for cash rewards</sub>
