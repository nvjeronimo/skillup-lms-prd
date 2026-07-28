# Design System Discovery — Demo Session (16 Jun 2026)

Transcrição reconstruída por OCR das legendas do vídeo. Aproximada, limpa à mão a partir do OCR. Timestamps para saltar no vídeo. Palavras incertas marcadas com [?].

Participantes (tiles): Nelson Jerónimo, Navdeep Malhotra, Vikas Goyal, Komal Raj, Pintu Badal, Nilesh Dabhi, Mohammad Rashid.

---

## Abertura e contexto (00:00–01:30)
Komal apresenta o doc de discovery. Recomendação: adotar Storybook no código existente, Design Tokens e sincronização com Figma. Mantém CSS Modules. Partilhou um doc com Rashid. Passa pelo assessment: India ~1.001 componentes React (~128 partilhados), US ~1.034 (~102 partilhados), CSS Modules + Bootstrap. "We are not using any other package [framework], somewhere we are using [hooks]."

## Tokens e naming (01:30–03:30)
- Komal: pilot components criados e testados com sucesso em Storybook + Next.js 15 + custom CSS modules.
- Sobre a estrutura de tokens: "We can go with the primitive tokens for colors, spacing and typography... and then the component [tokens], common buttons and modal and card design... do our token name that I added as an example, that will be convenient." (mostra `--sk-color-brand`, `--sk-cl...`)
- Continuar a usar CSS Variables em vez de Tailwind. Introduzir spacing, typography, radius e shadow tokens.
- Vikas/alguém: "Can you show me the naming convention?"
- **Decisão de naming:** "Okay, just adding the prefix of SK... yeah, that it's a good idea. And this will be decided by us, Design Team... decide according to design and Nadeem [Navdeep]."

## Governance & Ownership (03:30–04:30)
- Slide "5. Governance & Ownership Model". Design Team: own token values, manage Figma definitions, validate UI consistency. Frontend Team: own Storybook.
- "Azure [assure] custom CSS variables in our files."
- Navdeep/Nelson: "No more questions from my side, I'll check this document in more detail."

## Workshop de naming proposto (04:30–05:12)
- "As we start naming... defining what should be the naming convention... whether we should add SK in front, then how should the tokens be named."
- **Proposta:** "We can go into a quick workshop mode where developers and designers can [align]... maybe a 45 minutes [session]... [to decide] whether that naming convention is [right]."

## Tailwind vs CSS Variables (05:30–07:40)
- Vikas: "Why are we not using Tailwind? Why are we sticking to CSS variables? What's the difference, or does it have [advantages]?"
- Resposta (Komal): everything is in our code system; everywhere we use our custom [CSS], following same rules. Discussão de vantagem/desvantagem de não usar Tailwind. "We are using CSS to show our design... Tailwind doesn't apply where [we need]."
- "The point is that our system is too much old and there are many people who [work on it]... it would be a very huge task for us."

## Plataforma nova vs legacy (07:40–13:10)  ← ponto crítico
- "But definitely it has to be [rebuilt], you know... first we need to make a discovery."
- "If you want a good and tested way... you might need to rewrite entire [design system or CSS and styling system]."
- "Next version of the platform... that means you don't go into [the legacy and] correct it or tweak it or patchwork it."
- "Then definitely we would like to go with the [new]... because I believe we are talking about setting up a new platform."
- "Revamp any existing code — because we have not been using Tailwind, patching that will be a huge task and disturb the code. So that is the [trade-off]: look at the legacy foundation vs a new platform with a new code. Could be an advantage."
- "I believe we are thinking of setting up a completely new platform from scratch... code is working on the legacy and to start even migrating it."
- "This is a new discovery task. Once we go deeper... with a view on what we are planning to implement."
- AI tooling: "We are using GitHub [PRs] everywhere. Cursor and Claude [clod], we are heavily using this right now... on the legacy platform."

## Storybook ↔ Figma sync (13:30–18:00)
- Komal mostra screenshot do Storybook com componentes criados. "How it will look in the front end after adding the storybook component, and how further we can use [it]."
- "Automation that Untitled [UI] probably provides in keeping this storybook in sync with the components in Figma."
- **Figma como origem:** "Treating Figma components as the origin... that's where the components get originated, finalized, and signed off, and then they become manifested in Storybook. So we always have components which [match]."
- **Clarificação importante:** "This does not mean the website is going to be updated... [just because] components in live pages or on the new platform get updated. No — [you push] the code into build and then publishing."
- Fluxo de variantes: Figma updated com novo botão → Storybook → "published with due notification", não atualiza em silêncio no background. "If a new variant got added... how and when it got updated... once we are having entire design [system]."
- "It's too early to decide how to go with that. Right now it's a discovery point."
- Sobre overkill: "Is it an overkill, or maintaining it as a workflow with manual processes good enough?"

## Próximos passos (18:00–21:00)
- "Discovery is completed from our side. Live demo done."
- "Pintu and Nelson will check our discovery." Se quiserem aprofundar e levar 1–2 dias, sem problema.
- "We need a POC kind of thing that we can decide [on]."
- "Can we arrange a next live demo within this week so we can finalize?" — "Yes, sure, I'll let you know."
- **Bloqueador potencial:** "Will this become a blocker for our ICP development work planning to start next sprint?" — "Definitely that will be a [factor]."
- **Timeline dev:** "We are planning to move the course outline and the video player section as a development task for the upcoming sprint, which starts coming Wednesday."
- Navdeep pede a Pintu/Nelson um timeline estimado para rever o doc e dar feedback. "We have a week's time. Let's complete our analysis before [Wednesday]."
