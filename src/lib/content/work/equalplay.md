---
title: "Fair playing time for youth sports, without the mental arithmetic"
company: "Equal Play"
role: "Built independently"
period: "2026"
summary: "A mobile-first web app that generates fair team rotations for youth sports coaches. Handles substitutions, late arrivals and injuries, and tracks cumulative fairness across a session."
order: 4
published: true
url: "https://equalplay.io"
---

## Context

In youth sport, equal playing time matters. Leagues often require it, parents expect it and players notice when they spend longer on the bench than others.

Managing that during a live game is difficult. A typical squad might have 10 to 14 players competing for 7 or 9 positions. The coach is rotating players, handling substitutions, tracking time, dealing with late arrivals and injuries, and still trying to coach the game.

Most of this is done mentally or on paper. It works until it doesn't. When someone asks why a player had less time on the pitch, there is rarely a clear answer.

Equal Play handles this. The coach sets up the squad and game format, the app generates a rotation and substitutions are stepped through during play. If something changes, the rotation adjusts.

## Problem

Managing fairness in real time is cognitively demanding. Coaches are juggling multiple responsibilities and tracking playing time is easy to get wrong.

Manual plans break quickly. A late arrival or injury invalidates any pre-written rotation and forces on-the-fly decisions.

There is no record. When playing time is questioned, there is nothing to refer back to.

Fairness often needs to span multiple short games rather than a single session.

## Approach

### Sport-agnostic model

The system is built around generic concepts: positions, bench and substitutions. The coach configures the number of positions and the structure of the session.

This allows it to work across football, rugby, hockey, basketball and other team sports.

### Linear interaction

The flow follows the way a coach already operates:

- Select or create a team
- Add players
- Configure positions and games
- Generate a rotation
- Step through substitutions
- Move to the next game or end the session

Each step is simple and designed for use on a touchline with limited attention.

### Handling disruption

This is where most manual approaches fail.

If a player arrives late, they are added and the rotation adjusts. If a player is injured, the remaining players absorb the time.

Recalculation happens immediately and the system stays consistent.

### Fairness tracking

A summary view shows playing time across the session. The coach can see whether time is balanced without doing the calculation manually.

### Live sharing

Game state can be shared across devices. An assistant coach or parent can follow the rotation without needing to ask.

### Progressive Web App

The app runs in the browser with no installation. It works offline, so it remains usable during a game even if connectivity drops.

### No accounts

There is no login. Data is stored locally on the device.

## Tradeoffs

### Client-side only

All data is stored on the device. If it is lost or cleared, the data is gone.

This fits the session-based nature of the product but limits long-term tracking.

### No monetisation

The app is free, with no ads or data collection.

This keeps the experience simple but would need revisiting if usage increased significantly.

### Sport-agnostic limitations

Not targeting a specific sport means the system does not handle positional constraints or tactical groupings.

A more specialised product could go deeper, but at the cost of generality.

### No analytics

There are no tracking scripts. Product decisions are based on direct feedback rather than usage data.

## Outcome

The app is live and used by youth coaches across different sports.

The most consistent feedback focuses on disruption handling and fairness tracking. These are the areas where manual approaches tend to fail.

The PWA approach fits the use case well. Coaches do not want to install an app for something used during a single session. A URL they can open and reuse is enough.
