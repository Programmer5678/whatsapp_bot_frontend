
# WhatsApp Automation Dashboard - Architecture Documentation

## Overview
This application uses **strict feature-based organization** where components and types are placed based on their actual usage, not potential reusability.

## Core Principle: Colocation by Usage

**Rule: If a component/type is used in only ONE place, it lives in THAT place.**

- Used only in header → `header/`
- Used only in new-actions → `workspace/new-actions/`
- Used only in current-jobs → `workspace/current-jobs/`
- Used across multiple sections → `shared/`

## Directory Structure

```
src/
├── header/                          # Header section (always visible)
│   ├── ConnectionStatus.tsx         # Main header component
│   ├── types.ts                     # Header-specific types (ConnectionStateResponse)
│   └── ui/
│       └── Dialog.tsx               # QR code modal (used only in header)
│
├── workspace/                       # Main workspace section
│   ├── WorkspaceLayout.tsx          # Tab management and composition
│   │
│   ├── new-actions/                 # New Actions tab
│   │   ├── NewActionForm.tsx        # Main form component
│   │   ├── types.ts                 # Action request models (Raf0, Mavdak, etc.)
│   │   └── ui/                      # Components used only in new-actions
│   │       ├── Input.tsx
│   │       ├── Label.tsx
│   │       └── Card.tsx
│   │
│   └── current-jobs/                # Current Jobs tab
│       ├── JobTree.tsx              # Main tree component
│       ├── types.ts                 # Job-specific types (Job, JobTreeResponse)
│       ├── ui/                      # Components used only in current-jobs
│       │   └── Badge.tsx            # Job status badges
│       └── utils/
│           └── jobTree.ts           # Tree parsing logic
│
├── shared/                          # ONLY truly shared code
│   ├── api/
│   │   └── client.ts                # API client (used by all sections)
│   ├── ui/
│   │   └── Button.tsx               # Used in header AND workspace
│   └── utils/
│       └── helpers.ts               # cn(), formatDate() (used everywhere)
│
├── pages/
│   └── Dashboard.tsx                # Composition layer
│
├── App.tsx
├── index.tsx
├── index.css
└── tailwind.config.js
```

## Component Placement Logic

### Header Section (`header/`)
**Contains:** Everything used ONLY in the header

- `ConnectionStatus.tsx` - Main component
- `types.ts` - ConnectionStateResponse (used only here)
- `ui/Dialog.tsx` - QR code modal (used only here)

### Workspace - New Actions (`workspace/new-actions/`)
**Contains:** Everything used ONLY in the new-actions tab

- `NewActionForm.tsx` - Main component
- `types.ts` - All action request models (Raf0, Mavdak, Hakhana, VeadatKeva)
- `ui/Input.tsx` - Form input (used only here)
- `ui/Label.tsx` - Form label (used only here)
- `ui/Card.tsx` - Form container (used only here)

### Workspace - Current Jobs (`workspace/current-jobs/`)
**Contains:** Everything used ONLY in the current-jobs tab

- `JobTree.tsx` - Main component
- `types.ts` - Job, JobTreeResponse (used only here)
- `ui/Badge.tsx` - Status badges (used only here)
- `utils/jobTree.ts` - Tree parsing (used only here)

### Shared (`shared/`)
**Contains:** ONLY components/utilities used by MULTIPLE sections

- `api/client.ts` - Used by header, new-actions, current-jobs
- `ui/Button.tsx` - Used in header (refresh/reconnect) AND workspace (submit/refresh)
- `utils/helpers.ts` - cn() and formatDate() used everywhere

## Why This Matters

### ❌ Wrong Thinking
"Badge might be reused someday, so put it in shared/ui/"

### ✅ Correct Thinking
"Badge is only used in JobTree right now, so it lives in workspace/current-jobs/ui/"

**If you need it elsewhere later, THEN move it to shared.**

## Import Path Examples

```tsx
// Header importing its own types
import { ConnectionStateResponse } from './types';

// Header importing its own UI
import { Dialog } from './ui/Dialog';

// Header importing shared Button
import { Button } from '../shared/ui/Button';

// New Actions importing its own types
import { Raf0RequestModel } from './types';

// New Actions importing its own UI
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Card } from './ui/Card';

// Current Jobs importing its own types
import { Job } from './types';

// Current Jobs importing its own UI
import { Badge } from './ui/Badge';

// Current Jobs importing its own utils
import { buildJobTree } from './utils/jobTree';

// API client importing types from their sources
import { ConnectionStateResponse } from '../../header/types';
import { JobTreeResponse } from '../../workspace/current-jobs/types';
import { Raf0RequestModel } from '../../workspace/new-actions/types';
```

## Data Flow

### Header Section
```
ConnectionStatus
    ↓ (uses header/types.ts)
Fetch via shared/api/client
    ↓ (uses shared/ui/Button.tsx)
Show QR modal (header/ui/Dialog.tsx)
```

### Workspace - New Actions
```
NewActionForm
    ↓ (uses new-actions/types.ts)
Render fields (new-actions/ui/Input, Label, Card)
    ↓ (uses shared/ui/Button.tsx)
Submit via shared/api/client
```

### Workspace - Current Jobs
```
WorkspaceLayout fetches jobs
    ↓ (uses current-jobs/types.ts)
Parse tree (current-jobs/utils/jobTree.ts)
    ↓
JobTree renders (current-jobs/ui/Badge.tsx)
    ↓ (uses shared/ui/Button.tsx for delete)
Delete via shared/api/client
```

## When to Move to Shared

Move a component/type to `shared/` when:

1. **It's used in 2+ different sections** (header + workspace, or new-actions + current-jobs)
2. **Not before**

Example: If you add a new "Analytics" tab that also needs Badge for status display, THEN move Badge to shared/ui/.

## Adding New Features

### Adding to Header
1. Create component in `header/`
2. Add types to `header/types.ts`
3. Add UI components to `header/ui/`
4. Only use `shared/` for truly shared items (Button, api, utils)

### Adding New Workspace Tab
1. Create `workspace/new-tab/`
2. Add main component
3. Add `types.ts` for tab-specific types
4. Add `ui/` for tab-specific components
5. Add `utils/` for tab-specific utilities
6. Update `WorkspaceLayout.tsx`

### Example: Adding Analytics Tab
```
workspace/analytics/
├── AnalyticsView.tsx
├── types.ts              # Analytics-specific types
├── ui/
│   ├── Chart.tsx         # Used only in analytics
│   └── MetricCard.tsx    # Used only in analytics
└── utils/
    └── calculations.ts   # Analytics calculations
```

## Best Practices

1. **Start local, move to shared only when needed**
2. **Don't predict future reuse** - optimize for current usage
3. **Colocation over DRY** - it's okay to duplicate if it keeps code local
4. **Types follow components** - if a type is used in one place, it lives there
5. **UI components are not special** - same rules apply as any other code

## Technology Stack

- React 18 + TypeScript
- Tailwind CSS
- Radix UI (for accessible primitives)
- Lucide React (icons)
- Vite

## Summary

This architecture prioritizes:
- **Clarity**: Easy to find where code lives
- **Locality**: Related code stays together
- **Simplicity**: No premature abstraction
- **Maintainability**: Changes are isolated

**Golden Rule: If it's used in one place, it lives in that place.**
