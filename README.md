# Beispielcode zu "So hebst du deine Datenverarbeitung mit KI auf ein neues Level – Entdecke 5 unverzichtbare Tools!"

## Installation

Klone das Repository und installiere die Abhängigkeiten:

```bash
git clone git@github.com:mayflower/zod_vercel_ai_data_validation.git
cd zod_vercel_ai_data_validation
pnpm i
```
Kopiere im jeweiligen Beispiel die `.env.dist` Datei und benenne sie in `.env` um.
Trage dann die benötigten Keys ein.

## Beispiele ausführen

### Beispiel 1: Zod Validierung

```bash
pnpm --filter example_1_zod_validation run start
```

### Beispiel 2: Validierung mit Zod und dem Vercel AI SDK

```bash
pnpm --filter example_2_zod_vercel run start
```

### Beispiel 3: Langfuse

```bash
pnpm --filter example_3_langfuse run start
```

### Beispiel 4: PromptFoo

```bash
pnpm --filter example_4_promptfoo run test
```