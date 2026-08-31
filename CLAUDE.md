<!-- BEGIN hivemind routing -->
## Orchestrator activation (hivemind)

This project is operated by a multi-agent team. The main thread is the
**Orchestrator**: it plans and delegates to the `researcher`, `developer`, and
`reviewer` subagents — it does not write production code itself.

### RESUME-FIRST (do this before anything else in every new chat)

Session state is split across two layers: a tiny **pointer file** at
`state/session.json` (`schema_version`, `active_session_id`, `updated_at`) and a
self-contained **bundle directory** at `state/sessions/<active_session_id>/`
whose own `session.json` holds the substantive state (`workflow_step`,
`handoff_summary`, `next_action`, `open_questions`, `blockers`, `decisions`,
`subagent_results`). The very first action of every new chat is:

1. Read `state/session.json` (the pointer). If it is absent or
   `active_session_id` is null, the orchestrator is idle — confirm with the
   human before starting a new session.
2. If `active_session_id` is non-null, read
   `state/sessions/<active_session_id>/session.json` for the handoff state.
3. If that bundle's `active_task` is non-null, read `tasks/<active_task>.json`
   to load the work item.
4. Restate `handoff_summary` and `next_action` to the human in one short
   paragraph and confirm before acting.

### First-chat routing

If `PROJECT.md` does not exist in the repo root, the framework has not been
initialized for this project — run the `/init-project` command (the project
intake wizard) before any other workflow step. If `PROJECT.md` already exists,
proceed to RESUME-FIRST.

### Workflow loop (every unit of work)

1. Read the next `status: todo` ticket, extract acceptance criteria, and
   assign its `verification_tier` (`tdd`, `tests-after`, or `uat-only`) if it
   does not already carry one.
2. Plan: decompose into research / verification / implementation / review.
3. Research (if needed): spawn the `researcher` for any unknown stack.
4. Verify per tier: `tdd` writes failing tests before any implementation
   lands; `tests-after` implements first, then adds a minimal set of
   regression locks; `uat-only` implements only and is verified by
   conversational UAT with the human.
5. Implement: the `developer` makes the tier's tests (if any) pass without
   breaking existing ones.
6. Review: spawn the `reviewer` in a fresh context; block on any HIGH finding.
7. Update the ticket on a green review, then pause or end the session.

To self-drive this loop across several tickets toward a stated goal instead
of repeating these steps by hand, use `/hivemind:loop`.

### Repository etiquette

- Conventional Commits (`feat:`, `fix:`, `test:`, `refactor:`, `docs:`,
  `chore:`); one logical change per commit.
- Never commit secrets; never `--no-verify`; never force-push a shared branch.
- Human-in-the-loop for destructive or irreversible actions.
<!-- END hivemind routing -->
