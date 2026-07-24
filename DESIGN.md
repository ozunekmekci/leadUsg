---
version: alpha
name: leadUsg
description: High-contrast, dark mode B2B medical imaging equipment broker and comparison platform.
colors:
  primary: "#0F172A"
  secondary: "#1E293B"
  tertiary: "#2563EB"
  neutral: "#F8FAFC"
typography:
  h1:
    fontFamily: "Geist Sans"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: "Geist Sans"
    fontSize: "1rem"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: "12px"
  button-primary-hover:
    backgroundColor: "#1D4ED8"
---

## Overview

High-contrast, dark mode B2B medical imaging equipment broker and comparison platform design system. Created to convey clinical precision, trust, and effortless comparison between high-value medical hardware.

## Colors

- **Primary (#0F172A):** Deep Slate 900 for canvas and page backgrounds.
- **Secondary (#1E293B):** Slate 800 for card containers, SpecTable panels, and borders.
- **Tertiary (#2563EB):** Electric Blue 600 for high-intent CTAs (Teklif Al) and interactive highlights.
- **Neutral (#F8FAFC):** Slate 50 for primary headlines and clinical specification text.

## Typography

Geist Sans for primary UI typography, Geist Mono for numerical spec values and technical identifiers.

## Layout & Spacing

Structured 12-column grid layout with 16px to 24px container padding. Card grids scale responsively from 1 column on 375px mobile screens to 3-4 columns on desktop views.

## Shapes

Rounded cards (`12px` / `16px`) with subtle slate borders (`#334155`) and glassmorphism backdrops.

## Components

`button-primary` serves as the high-emphasis call-to-action for proposal requests, while `button-secondary` handles comparison toggles and secondary navigation.

## Do's and Don't's

- **Do:** Use structured spec tables with clear category demarcation for medical parameters.
- **Do:** Ensure high contrast for numerical technical values.
- **Don't:** Use bright decorative colors that distract from biomedical specification evaluation.
