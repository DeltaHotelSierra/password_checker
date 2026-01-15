const { useState, useEffect, useCallback } = React;

/**
 * PasswordGenerator Component
 * Generates secure random passwords with customizable options
 * Users can choose what character types to include and the password length
 */
function PasswordGenerator() {
    // ===== STATE VARIABLES =====
    // Stores the currently generated password
    const [password, setPassword] = useState('');
    
    // Controls the password length (minimum 4, maximum 32)
    const [length, setLength] = useState(12);
    
    // Tracks which character types are included in password generation
    const [options, setOptions] = useState({
        uppercase: true,  // A-Z
        lowercase: true,  // a-z
        numbers: true,    // 0-9
        special: true     // !@#$%^&* etc.
    });
    
    // Shows "Copied!" message when user copies the password
    const [copied, setCopied] = useState(false);
    
    // The strength level text (e.g. "Strong", "Very Weak")
    const [strength, setStrength] = useState('');
    
    // Numeric score for password strength (0-100)
    const [strengthScore, setStrengthScore] = useState(0);

    // ===== CHARACTER SETS AND STYLING =====
    // Maps strength levels to their display colors (red = weak, green = strong)
    const strengthColors = {
        'Very Weak': '#d32f2f',
        'Weak': '#f57c00',
        'Medium': '#fbc02d',
        'Strong': '#689f38',
        'Very Strong': '#388e3c'
    };

    // Defines which characters can be used in each category
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{};\':"|,.<>?/\\`~'
    };

    /**
     * Generates a random password based on selected options
     * This function:
     * 1. Combines all selected character types
     * 2. Randomly selects characters from the pool
     * 3. Repeats for the desired length
     */
    const generatePassword = useCallback(() => {
        let availableChars = '';
        let generatedPassword = '';
        
        // Prevent user from deselecting ALL options
        // If nothing is checked, automatically enable all character types
        if (!options.uppercase 
            && !options.lowercase 
            && !options.numbers
            && !options.special) {
            options.special = true;
            options.numbers = true;
            options.lowercase = true;
            options.uppercase = true;
        }

        // Build the pool of available characters based on user selections
        if (options.uppercase) availableChars += charSets.uppercase;
        if (options.lowercase) availableChars += charSets.lowercase;
        if (options.numbers) availableChars += charSets.numbers;
        if (options.special) availableChars += charSets.special;

        // Safety check: if somehow no characters are available, use all types
        if (availableChars === '') {
            availableChars = charSets.uppercase + charSets.lowercase + charSets.numbers + charSets.special;
        }

        // Build the password by selecting random characters from the available pool
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            generatedPassword += availableChars[randomIndex];
        }

        setPassword(generatedPassword);
        setCopied(false);
    }, [options, length]);

    /**
     * Copies the generated password to the user's clipboard
     * Shows a "Copied!" message temporarily
     */
    const copyToClipboard = async () => {
        // Don't copy if no password has been generated yet
        if (!password) return;

        try {
            // Use the browser's Clipboard API to copy the password
            await navigator.clipboard.writeText(password);
            
            // Show success message
            setCopied(true);
            
            // Hide the message after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    /**
     * Toggles a character type option on/off
     * @param {string} option - The option to toggle (e.g., 'uppercase', 'numbers')
     */
    const handleOptionChange = (option) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]  // Flip the boolean value
        }));
    };

    /**
     * Evaluates password strength based on various criteria
     * Calculates a score from 0-100 and assigns a strength level
     * @param {string} pwd - The password to check
     * @returns {object} - Contains strength level and score
     */
    const checkPasswordStrength = (pwd) => {
        // Return early if password is empty
        if (!pwd) return { strength: '', score: 0 };

        let score = 0;

        // ===== LENGTH SCORING =====
        // Award points for longer passwords (more resistant to brute force)
        if (pwd.length >= 8) score += 20;    // 8+ characters
        if (pwd.length >= 12) score += 10;   // 12+ characters
        if (pwd.length >= 16) score += 10;   // 16+ characters

        // ===== CHARACTER TYPE SCORING =====
        // Award points for variety (each type makes password more secure)
        if (/[A-Z]/.test(pwd)) score += 15;  // Has uppercase letters
        if (/[a-z]/.test(pwd)) score += 15;  // Has lowercase letters
        if (/\d/.test(pwd)) score += 15;     // Has numbers
        if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(pwd)) score += 15;  // Has special chars

        // ===== DETERMINE STRENGTH LEVEL =====
        // Map score ranges to user-friendly strength descriptions
        let strengthLevel;
        if (score < 30) {
            strengthLevel = 'Very Weak';
        } else if (score < 50) {
            strengthLevel = 'Weak';
        } else if (score < 70) {
            strengthLevel = 'Medium';
        } else if (score < 85) {
            strengthLevel = 'Strong';
        } else {
            strengthLevel = 'Very Strong';
        }

        return { strength: strengthLevel, score };
    };

    // ===== REACT EFFECTS =====
    // These run automatically when the password changes
    
    // Update password strength display whenever the password changes
    useEffect(() => {
        if (password) {
            const result = checkPasswordStrength(password);
            setStrength(result.strength);
            setStrengthScore(result.score);
        }
    }, [password]);

    // Generate a password when the component first loads
    useEffect(() => {
        generatePassword();
    }, []);

    // Re-generate password whenever length or options change
    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    /**
     * Replaces one character in the password with a random character from the available set
     * User can click individual password characters to randomly change them
     * @param {number} index - Position of the character to replace
     */
    const editCharacter = useCallback((index) => {
        // Build the same character pool used in password generation
        let availableChars = '';
        if (options.uppercase) availableChars += charSets.uppercase;
        if (options.lowercase) availableChars += charSets.lowercase;
        if (options.numbers) availableChars += charSets.numbers;
        if (options.special) availableChars += charSets.special;

        // Fallback if no options selected
        if (availableChars === '') {
            availableChars = charSets.uppercase + charSets.lowercase + charSets.numbers + charSets.special;
        }

        // Pick a random character and replace it at the specified index
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        const newChar = availableChars[randomIndex];
        const newPassword = password.substring(0, index) + newChar + password.substring(index + 1);
        setPassword(newPassword);
    }, [options, password]);

    return (
        <div className="card">
            <h2 className="title">Password Generator</h2>

                {/* Generated Password Display */}
                <div className="password-display">
                    <div className="generated-password">
                        {password ? (
                            password.split('').map((char, index) => (
                                <span
                                    key={index}
                                    className="password-char"
                                    onClick={() => editCharacter(index)}
                                    title="Click to change this character"
                                >
                                    {char}
                                </span>
                            ))
                        ) : (
                            <span className="password-placeholder">no password</span>
                        )}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="copy-button"
                        title="Copy to clipboard"
                    >
                        {copied ? '✓' : '📋'}
                    </button>
                </div>

                {copied && <div className="copy-message">Copied to clipboard!</div>}

                {/* Password Strength Display */}
                {password && (
                    <div className="strength-section">
                        <div className="strength-header">
                            <span className="strength-text">Strength:</span>
                            <span 
                                className="strength-value"
                                style={{ color: strengthColors[strength] }}
                            >
                                {strength}
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ 
                                    width: `${strengthScore}%`,
                                    backgroundColor: strengthColors[strength]
                                }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Length Slider */}
                <div className="length-section">
                    <label className="length-label">
                        Password Length: <strong>{length}</strong>
                    </label>
                    <input
                        type="range"
                        min="4"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="length-slider"
                    />
                    <div className="length-markers">
                        <span>4</span>
                        <span>32</span>
                    </div>
                </div>

                {/* Character Options */}
                <div className="options-section">
                    <h3 className="options-title">Include Characters:</h3>
                    <div className="options-grid">
                        <label className="toggle-option">
                            <span className="toggle-label">Uppercase (A-Z)</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={options.uppercase}
                                    onChange={() => handleOptionChange('uppercase')}
                                />
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                        <label className="toggle-option">
                            <span className="toggle-label">Lowercase (a-z)</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={options.lowercase}
                                    onChange={() => handleOptionChange('lowercase')}
                                />
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                        <label className="toggle-option">
                            <span className="toggle-label">Numbers (0-9)</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={options.numbers}
                                    onChange={() => handleOptionChange('numbers')}
                                />
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                        <label className="toggle-option">
                            <span className="toggle-label">Special (!@#$%)</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={options.special}
                                    onChange={() => handleOptionChange('special')}
                                />
                                <span className="toggle-slider"></span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Generate Button */}
                <button onClick={generatePassword} className="generate-button">
                    Generate Random Password
                </button>
        </div>
    );
}
