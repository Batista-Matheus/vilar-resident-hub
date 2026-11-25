<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- App shell (header, bottom dock nav, toaster) lives in `src/routes/__root.tsx`; each tab is its own route file. Why: one layout, crawlable per-tab URLs.
- Feature UI lives in `src/components/vilar/`, mock data in `src/data/mock.ts`. Why: swap mock data for real sources without touching components.
- Theme is a `.dark` class on `<html>` set by an inline head script from localStorage. Why: avoids light/dark flash on load.
- Business rules (filters, translation lookup) are pure functions in `src/lib/*.ts`, tested in `src/test/`. Why: logic stays testable apart from UI.

- OpenLobby courier steps and audit views stay in `src/components/vilar/openlobby/`, with access rules isolated in `src/lib/openlobby.ts`. Why: the local simulation can later be replaced without changing the shared shell.
