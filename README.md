# SecureEnough

A modern, professional web-based password strength tester and generator with an animated Matrix-style background effect. Built with React, vanilla JavaScript, HTML, and CSS.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 🏠 Home Section

- Clean, modern landing page
- Call-to-action buttons for quick navigation
- Smooth scroll indicators

### 🔐 Password Generator

- 🎲 **Random Password Generation** - Create secure passwords instantly
- 📏 **Adjustable Length** - Slider control from 4 to 32 characters
- 🔧 **Character Options**:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%^&\*)
- 📊 **Real-time Strength Display** - See password strength as you generate
- 📋 **One-Click Copy** - Copy passwords to clipboard instantly
- ✏️ **Click to Edit** - Click individual characters to randomly change them
- 🎯 **Entropy Calculation** - Shows password randomness in bits
- ⏱️ **Time to Crack** - Estimates how long to break the password

### 🧪 Password Tester

- 🔍 **Single Password Testing** - Test individual passwords in real-time
- 📦 **Bulk Password Analysis** - Analyze multiple passwords at once
  - Overall security score
  - Strength distribution chart
  - Individual password breakdown
  - Color-coded results
- 📄 **File Upload** - Import passwords from text files
- ✅ **Password Requirements Checklist**:
  - Minimum 8 characters
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters
- 👁️ **Show/Hide Password** - Toggle password visibility
- 📈 **Visual Progress Bar** - Color-coded strength indicator
- 🔬 **Pattern Detection** - Identifies weak patterns (sequential, repeated, keyboard, common words)
- 🧮 **Advanced Metrics**:
  - Entropy calculation
  - Time to crack estimation
  - Pattern analysis

### 📚 Security Tips

- 📏 **Length is King** - Longer passwords exponentially increase security
- 🔤 **Complexity Matters** - Mix uppercase, lowercase, numbers, and special characters
- 🚫 **Avoid Common Patterns** - Stay away from dictionary words and predictable patterns
- 🔐 **Use a Password Manager** - Let technology handle secure password storage
- 💬 **Interactive Learning** - Click tip cards for detailed explanations
- 📖 **Modal Popups** - Comprehensive security information with examples

### ✨ Animated Background

- **Letter Glitch Animation** - Matrix-style animated background
- Customizable colors (teal/green theme)
- Smooth opacity transitions
- Outer vignette effect for focus
- Fully responsive canvas animation

## 🚀 Getting Started

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Quick Start

1. **Clone the repository**:

```bash
git clone https://github.com/DeltaHotelSierra/password_checker.git
cd password_checker
```

2. **Open in browser**:

   - Simply open `index.html` in your web browser
   - Or use the built-in dev server:

   ```bash
   npm run dev
   ```

   Then navigate to `http://localhost:8000`

3. **Navigate between sections**:
   - Use smooth scroll or anchor links
   - Each section fills the full viewport
   - Smooth snap-scroll behavior

## 📂 Project Structure

```
password-strength-tester/
├── index.html                          # Main entry point
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
│   ├── README.md                       # This file
│   └── CODE_STRUCTURE.md              # Beginner's guide
│
└── archive/                            # Legacy code
    └── password_tester.py             # Original Python version
```

## 🔧 Technical Details

### Password Strength Scoring

```
Points Awarded For:
- Length 8+ chars: +20 points
- Length 12+ chars: +10 bonus
- Length 16+ chars: +10 bonus
- Length 20+ chars: +5 bonus
- Has UPPERCASE: +15 points
- Has lowercase: +15 points
- Has numbers (0-9): +15 points
- Has special (!@#$%): +15 points
- Pattern penalties: -10 per pattern

Total possible: 100 points
Very Weak: < 30    | Red
Weak: 30-49       | Orange
Medium: 50-69     | Yellow
Strong: 70-84     | Light Green
Very Strong: 85+  | Dark Green
```

### Entropy Calculation

- Measures password randomness in bits
- Higher entropy = harder to crack
- Formula: `log2(poolSize^length)`

### Time to Crack Estimation

- Assumes 10 billion guesses/second (modern GPU)
- Calculates average case scenario
- Provides human-readable time estimate

## 🛠️ Development

### Running Locally

```bash
# Using Python 3
npm run dev

# Or manually
python3 -m http.server 8000
```

### Project Structure Philosophy

- **Separation of Concerns**: Components, utilities, and assets are clearly separated
- **Reusability**: Shared logic extracted to utilities module
- **Maintainability**: Clear folder structure with logical grouping
- **Documentation**: Comprehensive inline comments and external docs

## 📝 Features in Detail

### Password Generator Component

- Uses cryptographically secure random generation
- Character pool customization
- Real-time strength feedback
- Interactive character editing
- Clipboard integration

### Password Strength Tester Component

- Two modes: Single and Bulk testing
- Advanced pattern detection
- File upload support for bulk analysis
- Detailed strength metrics
- Visual feedback with color coding

### Security Tips Component

- Educational content about password security
- Interactive modal popups
- Real-world examples and best practices
- 2025-updated security guidelines

### Letter Glitch Background

- Canvas-based animation
- Configurable colors and speed
- Smooth transitions
- Performance optimized
- Responsive design

## 🔐 Security Best Practices (2025)

1. **Minimum 16 characters** for strong passwords
2. **Use all character types** (uppercase, lowercase, numbers, symbols)
3. **Avoid patterns** (sequential, repeated, keyboard patterns)
4. **Use unique passwords** for each account
5. **Enable 2FA** wherever possible
6. **Use a password manager** to generate and store passwords

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**DeltaHotelSierra**

- GitHub: [@DeltaHotelSierra](https://github.com/DeltaHotelSierra)
- Repository: [password_checker](https://github.com/DeltaHotelSierra/password_checker)

## 🙏 Acknowledgments

- React team for the amazing library
- Security community for password guidelines
- NIST for password recommendations
- OWASP for security best practices

## 📚 Resources

- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/)
- [OWASP Password Recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Have I Been Pwned](https://haveibeenpwned.com/)

---

**Version**: 2.0.0  
**Last Updated**: January 15, 2026  
**Status**: Active Development
