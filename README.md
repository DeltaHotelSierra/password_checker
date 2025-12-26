# SecureEnough

A modern web-based password strength tester and generator with an animated letter glitch background effect. Built with React, vanilla JavaScript, HTML, and CSS.

## 🌟 Features

### 🏠 Home Section
- Welcome page with hero content
- Call-to-action buttons for quick navigation

### 🔐 Password Generator
- 🎲 **Random Password Generation** - Create secure passwords instantly
- 📏 **Adjustable Length** - Slider control from 4 to 32 characters
- 🔧 **Character Options**:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special characters (!@#$%)
- 📊 **Real-time Strength Display** - See how strong your generated password is
- 📋 **One-Click Copy** - Copy passwords to clipboard instantly
- ✏️ **Click to Edit** - Click individual characters to randomly change them

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

### 📚 Security Tips Section
- 4 interactive tip cards covering:
  - Length is King (📏)
  - Complexity Matters (🔤)
  - Avoid Common Patterns (🚫)
  - Use a Password Manager (🔐)
- Click any tip to see detailed explanations, examples, and references
- Modal popups with comprehensive security information

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

### Usage

1. **Clone or download** this repository:

```bash
git clone https://github.com/DeltaHotelSierra/password_checker.git
cd password_checker
```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or double-click the file

3. **Navigate between sections**:
   - Use smooth scroll or anchor links to navigate
   - Each section fills the full viewport
   - Smooth snap-scroll behavior

## 📂 Project Structure

```
password-strength-tester/
├── index.html                      # Main entry point (all sections)
├── MainApp.jsx                     # Root component & layout
├── PasswordGenerator.jsx            # Password generator component
├── PasswordStrengthTester.jsx       # Password tester component
├── SecurityTips.jsx                 # Security tips component
├── LetterGlitch.js                 # Animated background effect
├── styles.css                       # All styling
├── CODE_STRUCTURE.md               # Beginner's guide to the codebase
├── password_tester.py              # Original Python version
└── README.md                        # This file
```

## 🎯 How to Use

### Generate Passwords:

1. Open `index.html` 
2. Scroll to **Generator** section
3. Adjust the length slider (4-32 characters)
4. Select character types to include
5. Watch the password auto-generate
6. Click 📋 button to copy to clipboard
7. Click individual characters to randomly change them

### Test Password Strength:

1. Scroll to **Tester** section
2. **Single Mode**: Type a password to see real-time analysis
3. **Bulk Mode**:
   - Click "Bulk Analysis" tab
   - Enter multiple passwords (one per field)
   - Or upload a text file
   - Click "Analyze Passwords"
   - View comprehensive security report

### Learn Security Best Practices:

1. Scroll to **Security Tips** section
2. Review the 4 key security principles
3. Click any tip card to see detailed information
4. Read examples and references

## 🎨 Password Strength Criteria

Passwords are scored based on:

- **Length**: 8+ chars (20pts), 12+ chars (+10pts), 16+ chars (+10pts)
- **Uppercase Letters**: A-Z (15pts)
- **Lowercase Letters**: a-z (15pts)
- **Numbers**: 0-9 (15pts)
- **Special Characters**: !@#$%^&\*() etc. (15pts)

### Strength Levels:

- 🔴 Very Weak: < 30 points
- 🟠 Weak: 30-49 points
- 🟡 Medium: 50-69 points
- 🟢 Strong: 70-84 points
- 🟢 Very Strong: 85+ points

## 🛠️ Technologies Used

- **React 18** - UI components and state management
- **Vanilla JavaScript** - Letter Glitch animation
- **HTML5 Canvas** - Animated background rendering
- **CSS3** - Modern styling, gradients, and animations
- **Babel Standalone** - JSX transformation in browser

## 📱 Responsive Design

Fully responsive and works on:

- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones

All sections are optimized for different screen sizes.

## 🎨 Customization

### Change Glitch Background Colors:

Edit `MainApp.jsx`, find the LetterGlitch component:

```javascript
glitchColors={[
    '#2b4539',   // Dark green - change these hex colors
    '#61dca3',   // Light green
    '#024706'    // Very dark green
]}
```

### Adjust Animation Speed:

```javascript
glitchSpeed={2}  // Lower = slower, Higher = faster
smooth={true}    // Smooth color transitions
```

## 🐍 Python Version

The original Python/Tkinter version is still available in `password_tester.py`:

```bash
python password_tester.py
```

## 📖 Learning Resources

Check out `CODE_STRUCTURE.md` for:
- Detailed explanation of each component
- React hooks overview
- Data flow diagrams
- Debugging tips
- Examples for adding features
- Perfect for beginners!

## 📄 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 🌐 Live Demo

Open `index.html` in your browser to see it in action!

## 👤 Author

**DeltaHotelSierra**

- GitHub: [@deltahotelsierra](https://github.com/deltahotelsierra)
- Email: deltahotelsierra@hotmail.com

---

Made with ❤️ using React, JavaScript, and Canvas Animation
