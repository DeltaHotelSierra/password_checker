const { useState, useEffect, useCallback } = React;

/**
 * PasswordGenerator Component
 * Generates secure random passwords with customisable options.
 * Uses shared utilities from PasswordUtils (passwordStrength.js).
 */
function PasswordGenerator() {
    const [password, setPassword]         = useState('');
    const [length, setLength]             = useState(12);
    const [options, setOptions]           = useState({
        uppercase: true,
        lowercase: true,
        numbers:   true,
        special:   true,
    });
    const [copied, setCopied]             = useState(false);
    const [strength, setStrength]         = useState('');
    const [strengthScore, setStrengthScore] = useState(0);

    /** Generate a new password from the current options and length. */
    const handleGeneratePassword = useCallback(() => {
        const newPassword = PasswordUtils.generatePassword(length, options);
        setPassword(newPassword);
        setCopied(false);
    }, [options, length]);

    /** Copy the current password to the clipboard. */
    const handleCopyToClipboard = async () => {
        if (!password) return;
        const success = await PasswordUtils.copyToClipboard(password);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    /** Toggle a character-type option on or off. */
    const handleOptionChange = (option) => {
        setOptions(prev => ({ ...prev, [option]: !prev[option] }));
    };

    /** Replace a single character in the password with a random one. */
    const editCharacter = useCallback((index) => {
        let availableChars = '';
        if (options.uppercase) availableChars += PasswordUtils.charSets.uppercase;
        if (options.lowercase) availableChars += PasswordUtils.charSets.lowercase;
        if (options.numbers)   availableChars += PasswordUtils.charSets.numbers;
        if (options.special)   availableChars += PasswordUtils.charSets.special;
        if (!availableChars)   availableChars  = Object.values(PasswordUtils.charSets).join('');

        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        const newChar    = availableChars[arr[0] % availableChars.length];
        const newPassword = password.substring(0, index) + newChar + password.substring(index + 1);
        setPassword(newPassword);
    }, [options, password]);

    // Update strength display whenever the password changes.
    useEffect(() => {
        if (password) {
            const { strength: s, score } = PasswordUtils.checkPasswordStrength(password);
            setStrength(s);
            setStrengthScore(score);
        }
    }, [password]);

    // Re-generate whenever options or length change (also runs on mount).
    useEffect(() => {
        handleGeneratePassword();
    }, [handleGeneratePassword]);

    const { strengthColors } = PasswordUtils;

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
                    onClick={handleCopyToClipboard}
                    className="copy-button"
                    title="Copy to clipboard"
                >
                    {copied ? '✓' : '📋'}
                </button>
            </div>

            {copied && <div className="copy-message">Copied to clipboard!</div>}

            {/* Strength Display */}
            {password && (
                <div className="strength-section">
                    <div className="strength-header">
                        <span className="strength-text">Strength:</span>
                        <span className="strength-value" style={{ color: strengthColors[strength] }}>
                            {strength}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${strengthScore}%`,
                                backgroundColor: strengthColors[strength],
                            }}
                        />
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

            {/* Character Type Options */}
            <div className="options-section">
                <h3 className="options-title">Include Characters:</h3>
                <div className="options-grid">
                    {[
                        { key: 'uppercase', label: 'Uppercase (A-Z)' },
                        { key: 'lowercase', label: 'Lowercase (a-z)' },
                        { key: 'numbers',   label: 'Numbers (0-9)'   },
                        { key: 'special',   label: 'Special (!@#$%)' },
                    ].map(({ key, label }) => (
                        <label key={key} className="toggle-option">
                            <span className="toggle-label">{label}</span>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={options[key]}
                                    onChange={() => handleOptionChange(key)}
                                />
                                <span className="toggle-slider" />
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <button onClick={handleGeneratePassword} className="generate-button">
                Generate Random Password
            </button>
        </div>
    );
}
