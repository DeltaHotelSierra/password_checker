/**
 * Password Strength Utilities
 * Shared password validation and strength calculation logic
 * Used by both PasswordGenerator and PasswordStrengthTester components
 */

/**
 * Character sets for password generation
 */
export const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*()_+-=[]{};\':"|,.<>?/\\`~'
};

/**
 * Strength level to color mapping
 */
export const strengthColors = {
    'Very Weak': '#d32f2f',
    'Weak': '#f57c00',
    'Medium': '#fbc02d',
    'Strong': '#689f38',
    'Very Strong': '#388e3c'
};

/**
 * Calculate password entropy (measure of randomness)
 * @param {string} password - The password to analyze
 * @returns {number} - Entropy in bits
 */
export const calculateEntropy = (password) => {
    if (!password) return 0;
    
    let poolSize = 0;
    
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32; // Special characters
    
    return poolSize > 0 ? Math.log2(Math.pow(poolSize, password.length)) : 0;
};

/**
 * Check for common password patterns
 * @param {string} password - The password to check
 * @returns {array} - Array of detected patterns
 */
export const detectPatterns = (password) => {
    const patterns = [];
    const lowerPwd = password.toLowerCase();
    
    // Check for sequential characters (abc, 123)
    if (/abc|bcd|cde|def|123|234|345|456|567|678|789/.test(lowerPwd)) {
        patterns.push('sequential');
    }
    
    // Check for repeated characters (aaa, 111)
    if (/(.)\1{2,}/.test(password)) {
        patterns.push('repeated');
    }
    
    // Check for keyboard patterns
    if (/qwerty|asdfgh|zxcvbn|qwertz/.test(lowerPwd)) {
        patterns.push('keyboard');
    }
    
    // Check for common words
    const commonWords = ['password', 'admin', 'user', 'login', 'welcome', 'test'];
    if (commonWords.some(word => lowerPwd.includes(word))) {
        patterns.push('common');
    }
    
    return patterns;
};

/**
 * Evaluate password strength based on multiple criteria
 * Returns strength level, numerical score, criteria met, and additional info
 * @param {string} password - Password to analyze
 * @returns {object} - { strength, score, criteriaMet, entropy, patterns, timeToCrack }
 */
export const checkPasswordStrength = (password) => {
    let score = 0;
    const criteriaMet = {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    };

    // Return early if password is empty
    if (!password || password.length === 0) {
        return { 
            strength: 'Very Weak', 
            score: 0, 
            criteriaMet,
            entropy: 0,
            patterns: [],
            timeToCrack: 'Instantly'
        };
    }

    // ===== LENGTH SCORING =====
    if (password.length >= 8) {
        score += 20;
        criteriaMet.length = true;
    }
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    if (password.length >= 20) score += 5;

    // ===== CHARACTER TYPE SCORING =====
    if (/[A-Z]/.test(password)) {
        score += 15;
        criteriaMet.uppercase = true;
    }

    if (/[a-z]/.test(password)) {
        score += 15;
        criteriaMet.lowercase = true;
    }

    if (/\d/.test(password)) {
        score += 15;
        criteriaMet.number = true;
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 15;
        criteriaMet.special = true;
    }

    // ===== PATTERN DETECTION PENALTIES =====
    const detectedPatterns = detectPatterns(password);
    score -= detectedPatterns.length * 10;

    // Calculate entropy
    const entropy = calculateEntropy(password);

    // Estimate time to crack (rough approximation)
    const timeToCrack = estimateTimeToCrack(entropy);

    // Ensure score stays within 0-100
    score = Math.max(0, Math.min(100, score));

    // ===== STRENGTH LEVEL DETERMINATION =====
    let strength;
    if (score < 30) strength = 'Very Weak';
    else if (score < 50) strength = 'Weak';
    else if (score < 70) strength = 'Medium';
    else if (score < 85) strength = 'Strong';
    else strength = 'Very Strong';

    return { 
        strength, 
        score, 
        criteriaMet,
        entropy: Math.round(entropy),
        patterns: detectedPatterns,
        timeToCrack
    };
};

/**
 * Estimate time to crack password based on entropy
 * @param {number} entropy - Password entropy in bits
 * @returns {string} - Human-readable time estimate
 */
const estimateTimeToCrack = (entropy) => {
    // Assuming 10 billion guesses per second (modern GPU)
    const guessesPerSecond = 10_000_000_000;
    const possibleCombinations = Math.pow(2, entropy);
    const secondsToCrack = possibleCombinations / guessesPerSecond / 2; // Average case
    
    if (secondsToCrack < 1) return 'Instantly';
    if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} seconds`;
    if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`;
    if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`;
    if (secondsToCrack < 31536000) return `${Math.round(secondsToCrack / 86400)} days`;
    if (secondsToCrack < 3153600000) return `${Math.round(secondsToCrack / 31536000)} years`;
    return `${Math.round(secondsToCrack / 31536000)} years`;
};

/**
 * Generate a secure random password
 * @param {number} length - Password length
 * @param {object} options - Character type options { uppercase, lowercase, numbers, special }
 * @returns {string} - Generated password
 */
export const generatePassword = (length = 12, options = {}) => {
    const {
        uppercase = true,
        lowercase = true,
        numbers = true,
        special = true
    } = options;

    let availableChars = '';
    
    // Build character pool
    if (uppercase) availableChars += charSets.uppercase;
    if (lowercase) availableChars += charSets.lowercase;
    if (numbers) availableChars += charSets.numbers;
    if (special) availableChars += charSets.special;

    // Fallback to all characters if none selected
    if (availableChars === '') {
        availableChars = charSets.uppercase + charSets.lowercase + 
                        charSets.numbers + charSets.special;
    }

    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }

    return password;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

/**
 * Validate password meets all criteria
 * @param {string} password - Password to validate
 * @returns {boolean} - True if all criteria met
 */
export const isPasswordValid = (password) => {
    const { criteriaMet } = checkPasswordStrength(password);
    return Object.values(criteriaMet).every(met => met === true);
};
