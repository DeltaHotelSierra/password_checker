# Contributing to SecureEnough

Thank you for your interest in contributing to SecureEnough! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Git for version control
- Text editor or IDE (VS Code recommended)
- Basic knowledge of HTML, CSS, JavaScript, and React

### Setting Up Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/password_checker.git
   cd password_checker
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

   Or manually:

   ```bash
   python3 -m http.server 8000
   ```

4. **Open in browser**: Navigate to `http://localhost:8000`

## Project Structure

```
password-strength-tester/
├── src/
│   ├── components/      # React components
│   └── utils/          # Utility functions
├── public/             # Static assets
├── assets/             # Media files
├── docs/               # Documentation
└── archive/            # Legacy code
```

See [docs/CODE_STRUCTURE.md](docs/CODE_STRUCTURE.md) for detailed structure information.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/DeltaHotelSierra/password_checker/issues)
2. If not, create a new issue with:
   - Clear descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. Check existing [Issues](https://github.com/DeltaHotelSierra/password_checker/issues) for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use cases and benefits
   - Possible implementation approach
   - Any relevant examples

### Submitting Changes

1. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Follow the code style guide below
   - Add comments for complex logic
   - Test thoroughly

3. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Code Style Guide

### JavaScript/React

- Use ES6+ syntax (const/let, arrow functions, destructuring)
- Use camelCase for variables and functions
- Use PascalCase for React components
- Add JSDoc comments for functions
- Keep functions small and focused
- Use meaningful variable names

**Example:**

```javascript
/**
 * Calculate password entropy
 * @param {string} password - The password to analyze
 * @returns {number} - Entropy in bits
 */
const calculateEntropy = (password) => {
  // Implementation
};
```

### CSS

- Use BEM-like naming conventions
- Group related styles together
- Add comments for sections
- Use CSS variables for colors
- Mobile-first responsive design

**Example:**

```css
/* Password Generator Section */
.password-generator {
  /* Layout */
  display: flex;

  /* Spacing */
  padding: 2rem;

  /* Colors */
  background-color: var(--bg-dark);
}
```

### File Organization

- Place React components in `src/components/`
- Place utilities in `src/utils/`
- Place styles in `public/`
- Place documentation in `docs/`

## Testing Guidelines

### Manual Testing

Before submitting a PR, test:

1. **Functionality**

   - All features work as expected
   - No console errors
   - Edge cases handled

2. **Browser Compatibility**

   - Test in Chrome, Firefox, Safari
   - Check mobile responsiveness
   - Verify on different screen sizes

3. **Performance**

   - No significant lag or freezing
   - Animations run smoothly
   - File uploads work efficiently

4. **Security**
   - No passwords logged to console
   - No data sent to external servers
   - Clipboard API works correctly

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure all tests pass** (manual testing)
3. **Update README.md** if adding features
4. **Write clear PR description**:
   - What changes were made
   - Why they were made
   - How to test them

### PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, PR will be merged

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Other unprofessional conduct

## Questions?

- Open an issue for general questions
- Check existing documentation
- Review code comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SecureEnough! 🎉
