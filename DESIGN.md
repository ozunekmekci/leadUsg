---
version: alpha
name: leadUsg Precision Clinical
description: Ultra-sharp, high-precision biomedical ultrasound telemetry identity. Designed for medical imaging broker platform leadUsg.
colors:
  primary: "#0F172A"
  secondary: "#0369A1"
  tertiary: "#06B6D4"
  neutral: "#F8FAFC"
  surface-dark: "#090D16"
  doppler-red: "#EF4444"
  doppler-blue: "#3B82F6"
  delta-amber: "#D97706"
  border-sharp: "#E2E8F0"
typography:
  h1:
    fontFamily: "Space Grotesk"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: "1.1"
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Space Grotesk"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1rem"
    lineHeight: "1.6"
  mono-telemetry:
    fontFamily: "IBM Plex Mono"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "2px"
  md: "4px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
  button-consultation:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  card-matrix:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
  badge-delta:
    backgroundColor: "{colors.delta-amber}"
    textColor: "#000000"
    rounded: "{rounded.sm}"
  hud-console:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
  doppler-scale:
    backgroundColor: "{colors.doppler-blue}"
    textColor: "#051622"
    rounded: "{rounded.sm}"
  doppler-high:
    backgroundColor: "{colors.doppler-red}"
    textColor: "#000000"
    rounded: "{rounded.sm}"
  panel-border:
    backgroundColor: "{colors.border-sharp}"
---

## Overview

High-precision biomedical ultrasound broker and differential comparison platform for medical professionals (radiologists, cardiologists, OB/GYN specialists, hospital procurement managers). Designed to eliminate generic SaaS blue tropes in favor of an authentic diagnostic console visual language (ultrasound sector wedge cone, Doppler flow velocity scale, HUD calipers, sharp 2-4px geometry).

## Colors

- **Primary (#0F172A):** Surgical Charcoal for high-contrast headers, primary text, and high-intent actions.
- **Secondary (#0369A1):** Clinical Sky/Teal for diagnostic accents and active states.
- **Tertiary (#06B6D4):** High-luminance Beamformer Cyan for live telemetry highlights and scan lines.
- **Neutral (#F8FAFC):** Clinical Slate 50 paper background for clean reading and spec review.
- **Surface Dark (#090D16):** Ultrasound Diagnostic Monitor backdrop for live scan HUD.
- **Doppler Red (#EF4444) & Doppler Blue (#3B82F6):** Vascular Doppler flow velocity indicators (+62cm/s to -62cm/s).
- **Delta Amber (#D97706):** Differential highlight tag (`⌐ FARK`) for contrasting device technical specs.

## Typography

- **Space Grotesk:** Headlines and brand displays with technical character.
- **Plus Jakarta Sans:** Primary body text and UI interface labels.
- **IBM Plex Mono:** Biomedical telemetry, transducer frequencies, gain, frame rate, and technical spec values.

## Layout & Spacing

Structured 12-column grid layout with 24px container gridlines. Hairline borders (`1px border-slate-200`) and high-density technical comparison tables.

## Elevation & Depth

Flat, surgical precision layout. Zero blurry shadows or rounded pill shapes; 1px crisp borders and dark diagnostic inset panels (`#090D16`).

## Shapes

Sharp, defined corners (`2px` to `4px` radius) reflecting precision medical instrumentation.

## Components

- `button-primary`: Dark surgical charcoal with cyan hover state for technical interaction.
- `ultrasound-console`: Dark HUD diagnostic screen displaying real sonograms, ECG line, and Doppler scales.
- `delta-badge`: Highlighting line-by-line technical specification differences (`⌐ FARK`).

## Do's and Don'ts

- **Do:** Use real ultrasound Doppler scan visuals, transducer specs, and `IBM Plex Mono` for numerical values.
- **Do:** Highlight technical differences using the `⌐ FARK` tag.
- **Don't:** Fall back to generic rounded dark-blue SaaS cards, generic stock images, or blurry gradients.
