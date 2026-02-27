# Product & Technical Decisions

<!-- ProtoFlow Living Document — Updated automatically as the prototype evolves -->

## D001: Single-file vanilla JS architecture
- **Date**: 2026-02-11
- **Decision**: Build the entire app as a single `index.html` file with vanilla JavaScript
- **Rationale**: Fastest path for prototyping; no build step needed for iOS testing; all logic in one place for rapid iteration
- **Trade-off**: File is very large; no component reuse; harder to maintain long-term

## D002: Consolidated single-program model (no phases)
- **Date**: 2026-02-12
- **Decision**: Remove the 3-phase model (Foundation/Transition/Maintenance) and consolidate into a single 16-week GLP-1 Graduation program
- **Rationale**: Phases created confusion; users don't think in phases. A single progressive program with weekly/block goals is clearer.

## D003: 8-block model with 2-week blocks
- **Date**: 2026-02-20
- **Decision**: Structure the 16-week program as 8 two-week blocks aligned with CGM sensor periods (each sensor lasts ~15 days)
- **Rationale**: CGM sensors last 2 weeks; having different goals each week within a sensor period created timeline confusion. 2-week blocks align with sensor periods naturally.

## D004: Intermittent CGM (4 sensors across 16 weeks)
- **Date**: 2026-02-20
- **Decision**: Use 4 intermittent CGM sensors (Blocks 1, 3, 6, 8) instead of continuous wear
- **Rationale**: Reduces cost (4 sensors vs 8); prevents sensor dependency; off-CGM blocks build confidence in internal signals; each sensor has a specific mission (baseline → proof → validation → graduation)

## D005: Hunger Coach as primary off-CGM tool
- **Date**: 2026-02-18
- **Decision**: Elevate the Hunger Coach during off-CGM blocks as the user's primary biofeedback tool
- **Rationale**: During 8 of 16 weeks, users have no real-time glucose data. The coach fills this gap with skill-based guidance, historical glucose references, and hunger pattern analysis.

## D006: Personalized block ordering from onboarding
- **Date**: 2026-02-16
- **Decision**: Reorder Blocks 2 and 4 based on the user's ranked struggles from onboarding
- **Rationale**: Users who struggle most with sleep should get sleep content earlier; users who struggle with protein should get nutrition earlier. Fixed blocks (1: baseline+CGM, 3: movement+CGM) stay in place.

## D007: Purple unified theme
- **Date**: 2026-02-14
- **Decision**: Use purple (#7c3aed) as the single accent color throughout the app
- **Rationale**: Eliminates phase-specific color confusion; creates consistent brand identity for the Graduation program.

## D008: Weight maintenance band from day 1
- **Date**: 2026-02-13
- **Decision**: Show the ±3–5% maintenance band on the weight graph from the first day of the program
- **Rationale**: Pre-emptive normalization. If users see the band before any weight regain, the first +2 lbs registers as "within band" rather than "failure."

## D009: Hunger framed as a skill, not a problem
- **Date**: 2026-02-17
- **Decision**: Frame all hunger interactions as "hunger awareness" skill-building with mastery levels
- **Rationale**: GLP-1 users have a complicated relationship with hunger. Framing it as a learnable skill (with visible progress) is more empowering than framing it as a problem to manage.

## D010: Glucose-hunger integration engine
- **Date**: 2026-02-19
- **Decision**: Build `getGlucoseContext()` and `getGlucoseHungerInsight()` to connect glucose data with hunger signals throughout the app
- **Rationale**: The unique value of having CGM data is explaining *why* users feel hungry. No other app connects these two data streams. This is the key differentiator.
