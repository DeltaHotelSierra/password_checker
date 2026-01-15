# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-15

### 🎉 Major Reorganization

#### Added

- **New Directory Structure**: Organized project into logical folders
  - `src/components/` - React components
  - `src/utils/` - Shared utility functions
  - `public/` - Public assets
  - `assets/fonts/` - Font files
  - `docs/` - Documentation
  - `archive/` - Legacy code
- **Shared Utilities Module**: `passwordStrength.js` with reusable functions
  - `calculateEntropy()` - Password randomness calculation
  - `detectPatterns()` - Weak pattern detection
  - `checkPasswordStrength()` - Comprehensive strength analysis
  - `generatePassword()` - Secure password generation
  - `copyToClipboard()` - Clipboard utility
  - `isPasswordValid()` - Password validation
- **Enhanced Documentation**:
  - Comprehensive README.md with features and setup
  - Detailed CODE_STRUCTURE.md explaining architecture
  - CONTRIBUTING.md with contribution guidelines
  - CHANGELOG.md (this file)
- **Project Configuration**:
  - package.json with metadata and scripts
  - Improved .gitignore with comprehensive rules
  - LICENSE file (MIT)
  - VSCode workspace settings
- **Advanced Password Features**:
  - Entropy calculation in bits
  - Time to crack estimation
  - Pattern detection (sequential, repeated, keyboard, common words)
  - Improved strength algorithm with pattern penalties

#### Changed

- **Reorganized File Structure**: Moved all files to appropriate directories
- **Updated index.html**: New paths for reorganized structure
- **Enhanced Password Strength Algorithm**: Now includes pattern detection and penalties
- **Improved Documentation**: More detailed and beginner-friendly

#### Removed

- Root-level component files (moved to `src/components/`)
- Root-level styles.css (moved to `public/`)

---

## [1.0.0] - 2025-XX-XX

### Initial Release

#### Added

- Password Generator component
- Password Strength Tester component (single and bulk modes)
- Security Tips component with interactive modals
- Matrix-style animated background (LetterGlitch)
- Responsive design with snap-scroll sections
- File upload for bulk password testing
- Real-time password strength feedback
- Copy to clipboard functionality
- Click-to-edit individual characters in generator
- Python/Tkinter legacy version

---

## Legend

- 🎉 Major changes
- ✨ New features
- 🐛 Bug fixes
- 📝 Documentation
- 🔧 Configuration
- ♻️ Refactoring
- 🔐 Security
- 💄 UI/Styling
- ⚡ Performance
- 🗑️ Deprecated
