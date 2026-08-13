## Summary

-

## Target branch

- [ ] `develop` (feature work)
- [ ] `main` (release from `develop` only)

## Test plan

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm format:check`
- [ ] `pnpm build`
- [ ] `pnpm docker:up` / `pnpm db:migrate` if database or Docker files changed
- [ ] GitHub Actions `CI` check is green

## Notes

- Flow: `feature/* → develop → main`. Do not push directly to protected branches.
- No production secrets or credentials in the repository.
