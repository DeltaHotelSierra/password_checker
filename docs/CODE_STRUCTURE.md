# SecureEnough - Code Structure Guide

This document explains how the SecureEnough password tool is organized and how each part works together.

## Project Overview

SecureEnough is a web-based password generator and strength analyzer built with React and vanilla JavaScript. It allows users to:

- **Generate** secure random passwords with customizable options
- **Test** passwords to see how strong they are
- **Analyze** multiple passwords at once (bulk mode)
- **Learn** about password security best practices

## Directory Structure

```
password-strength-tester/
├── index.html                          # Entry point - loads all components
├── package.json                        # Project metadata and scripts
├── .gitignore                          # Git ignore rules
│
├── src/                                # Source code
│   ├── components/                     # React components
│   │   ├── MainApp.jsx                # Root component & layout
│   │   ├── PasswordGenerator.jsx      # Password creation tool
│   │   ├── PasswordStrengthTester.jsx # Password testing tool
│   │   ├── SecurityTips.jsx           # Security best practices
│   │   └── LetterGlitch.js            # Animated background
│   │
│   └── utils/                          # Utility functions
│       └── passwordStrength.js         # Shared password logic
│
├── public/                             # Public assets
│   └── styles.css                      # All styling
│
├── assets/                             # Media files
│   └── fonts/                          # Custom fonts
│       └── MatrixCodeNfi-YPPj.otf     # Matrix-style font
│
├── docs/                               # Documentation
│   ├── README.md                       # Main documentation
│   └── CODE_STRUCTURE.md              # This file
│
└── archive/                            # Legacy code
    └── password_tester.py             # Original Python version
```

## Component Architecture

### Data Flow

```
index.html
    │
    ├─→ Loads passwordStrength.js utilities
    │
    ├─→ Loads React components
    │   │
    │   └─→ MainApp.jsx (Root)
    │       │
    │       ├─→ LetterGlitch.js (Background)
    │       │
    │       ├─→ PasswordGenerator.jsx
    │       │   └─→ Uses passwordStrength utils
    │       │
    │       ├─→ PasswordStrengthTester.jsx
    │       │   └─→ Uses passwordStrength utils
    │       │
    │       └─→ SecurityTips.jsx
    │
    └─→ Applies styles.css
```

## Key Files Explained

### 1. **passwordStrength.js** (Utilities) 🛠️

**Purpose:** Shared password logic used by multiple components

**Exports:**

#### Constants

- `charSets` - Character sets for password generation
- `strengthColors` - Strength level to color mapping

#### Functions

- `calculateEntropy(password)` - Measures password randomness
- `detectPatterns(password)` - Identifies weak patterns
- `checkPasswordStrength(password)` - Evaluates password strength
- `generatePassword(length, options)` - Creates random password
- `copyToClipboard(text)` - Copies text to clipboard
- `isPasswordValid(password)` - Validates password meets all criteria

#### Password Strength Algorithm

```javascript
Points Awarded:
- Length 8+ chars: +20 points
- Length 12+ chars: +10 bonus
- Length 16+ chars: +10 bonus
- Length 20+ chars: +5 bonus
- Has UPPERCASE: +15 points
- Has lowercase: +15 points
- Has numbers: +15 points
- Has special: +15 points
- Pattern penalties: -10 per pattern

Strength Levels (0-100):
Very Weak: < 30    | Red
Weak: 30-49       | Orange
Medium: 50-69     | Yellow
Strong: 70-84     | Light Green
Very Strong: 85+  | Dark Green
```

### 2. **PasswordGenerator.jsx** 🔐

**Purpose:** Creates random secure passwords with customizable options

**Key Functions:**

- `generatePassword()` - Creates password based on selected options
- `editCharacter(index)` - Allows clicking individual characters to change them
- `copyToClipboard()` - Copies password to clipboard
- `handleOptionChange(option)` - Toggles character type options

**State:**

- `password` - Generated password string
- `length` - Password length (4-32)
- `options` - { uppercase, lowercase, numbers, special }
- `copied` - Copy success indicator
- `strength` / `strengthScore` - Password strength metrics

### 3. **PasswordStrengthTester.jsx** 🧪

**Purpose:** Tests and analyzes password strength in single or bulk mode

**Key Functions:**

- `handlePasswordChange(e)` - Updates and analyzes password
- `analyzeBulkPasswords()` - Tests multiple passwords
- `handleFileUpload(e)` - Imports passwords from text file
- `addPasswordField()` / `removePasswordField()` - Manage bulk inputs

**State:**

- `mode` - 'single' or 'bulk'
- `password` - Current test password
- `strength` / `score` - Strength metrics
- `criteriaMet` - Security criteria tracking
- `bulkPasswords` - Array of test passwords
- `bulkResults` - Bulk analysis results

### 4. **SecurityTips.jsx** 📚

**Purpose:** Educates users about password security

**Features:**

- Interactive tip cards
- Modal popups with detailed info
- Examples and best practices
- Security standard references

**Topics:**

1. Length is King
2. Complexity Matters
3. Avoid Common Patterns
4. Use a Password Manager

### 5. **LetterGlitch.js** ✨

**Purpose:** Matrix-style animated background

**Configuration:**

- `glitchColors` - Color array
- `glitchSpeed` - Update frequency
- `smooth` - Smooth transitions
- `centerVignette` - Center darkening
- `outerVignette` - Edge darkening

### 6. **MainApp.jsx** 🏠

**Purpose:** Root component managing layout and navigation

**Structure:**

- Home section with hero content
- Generator section
- Tester section
- Security tips section
- Footer section

## Development Guide

### Running Locally

```bash
npm run dev
# Or
python3 -m http.server 8000
```

### Making Changes

1. **Components**: Edit `src/components/*.jsx`
2. **Utilities**: Edit `src/utils/passwordStrength.js`
3. **Styles**: Edit `public/styles.css`
4. **Structure**: Edit `index.html`

### Code Style

- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions focused and small
- Follow React best practices
- Use ES6+ features

## Security Notes

- All processing happens client-side
- No passwords sent to server
- No data stored or logged
- Uses browser APIs for clipboard

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

**Required APIs:**

- ES6+ JavaScript
- Canvas API
- Clipboard API
- File API
- CSS Grid/Flexbox

---

**Last Updated:** January 15, 2026  
**Version:** 2.0.0
