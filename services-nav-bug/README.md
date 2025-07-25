# Services Page Navigation Highlight Bug

## Context

This is a Next.js/React project with a services page that features a sticky sub-navigation bar. The subnav highlights the active section as the user scrolls through the page. Each section is wrapped in a `SectionWrapper` component. There are also special sections for "POTS & Dysautonomia" and "Complete Services Directory" at the bottom of the page.

## Problem

- As the user scrolls between service sections (e.g., from "Diagnostics" to "Treatments & Therapies"), there are brief gaps where the first button ("Diagnostics") is incorrectly highlighted as active, even though the user is not in that section.
- The same issue occurs between other sections: the previous section's button deactivates before the next one activates, causing the fallback ("Diagnostics") to show as active in the gap.
- When scrolling past the "POTS & Dysautonomia" section into the "Complete Services Directory" section, no button is active (which is correct). However, the main issue is the flashing of the wrong button between the main service sections.

## Attempts to Fix

- The scroll detection logic uses `getBoundingClientRect()` to determine which section is in view, with a threshold of 200px from the top of the viewport.
- The vertical margin between sections has been removed to try to eliminate gaps.
- The logic for activating a section is:
  - If the POTS section is visible, highlight its button.
  - If the Complete Services section is visible, no button is active.
  - Otherwise, for each service section, if its top is <= 200 and its bottom > 150, highlight its button.
- Despite these changes, the problem persists: there are still small gaps where the wrong button is highlighted.

## Desired Behavior

- As the user scrolls, only the button for the section currently in view should be highlighted.
- There should be no gaps where the wrong button (especially "Diagnostics") is highlighted between sections.
- When the user is in the "Complete Services Directory" section, no button should be active.

## Files Included

- `ServicesPageClient.tsx`: The main file for the services page, including the scroll detection logic and section rendering.
- `section-wrapper.tsx`: The wrapper component for each section, now updated to forward refs and have no vertical margin.

## How to Reproduce

1. Open the services page in the browser.
2. Slowly scroll between the main service sections (Diagnostics, Treatments & Therapies, Cardiac Wellness, Special Services).
3. Observe that as you scroll between sections, the "Diagnostics" button (or the first service category) is briefly highlighted as active in the gap between sections.
4. Scroll past the POTS section into the Complete Services Directory section; no button is active (this is correct).

## Goal

Find a robust solution so that the navigation highlighting is always accurate, with no gaps or flashing of the wrong button between sections. 