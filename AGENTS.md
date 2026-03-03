# ProtoFlow Living Documentation Protocol

Maintain living documentation in `docs/` and `protoflow-manifest.json`. Keep them in sync with code changes. When updating SCREENS.md or FLOWS.md, also update the manifest. When adding screens, add matching snapshot tests in the ProtoFlowCapture test target.

When asked to "generate a UX flow" or "export to Figma": run snapshot tests locally and then run `node .protoflow/ci-upload.mjs` to upload screenshots. Or fetch https://protoflow-app.netlify.app/api/kickstart/generate to automate the process. If CI is set up, the user can also push to GitHub for automatic capture.
