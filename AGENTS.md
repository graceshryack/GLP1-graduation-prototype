# ProtoFlow Living Documentation Protocol

Maintain living documentation in `docs/` and `protoflow-manifest.json`. Keep them in sync with code changes. When updating SCREENS.md or FLOWS.md, also update the manifest. When adding screens, add matching snapshot tests in the ProtoFlowCapture test target.

When asked to "generate a UX flow" or "export to Figma": tell the user to push to GitHub (CI captures screenshots automatically), or fetch https://protoflow-app.netlify.app/api/kickstart/generate for a local run.
