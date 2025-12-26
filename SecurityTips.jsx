const { useState } = React;

/**
 * SecurityTips Component
 * Displays password security best practices with interactive cards
 * Users can click cards to see detailed information in a modal
 */
function SecurityTips() {
    // Track which tip's modal is currently open
    const [openPopup, setOpenPopup] = useState(null);

    // ===== SECURITY TIPS DATA =====
    // Detailed information about password security best practices
    const securityTips = [
        {
            id: 1,
            title: "Length is King",
            icon: "📏",
            shortDesc: "Longer passwords exponentially increase security through entropy.",
            details: {
                explanation: "In 2025, password length remains the single most important factor for security. Each additional character exponentially increases the time needed to crack a password through brute force attacks.",
                keyPoints: [
                    "Minimum 16 characters recommended for strong security",
                    "20+ characters provides enterprise-level protection",
                    "A 12-character password has 62^12 possible combinations",
                    "Adding just 4 more characters increases possibilities to 62^16"
                ],
                example: "Instead of: P@ssw0rd (8 chars)\nUse: MyDogLovesToPlayInThePark2024! (31 chars)",
                references: [
                    "NIST Digital Identity Guidelines (2024)",
                    "OWASP Password Recommendations"
                ]
            }
        },
        {
            id: 2,
            title: "Complexity Matters",
            icon: "🔤",
            shortDesc: "Mix uppercase, lowercase, numbers, and special characters.",
            details: {
                explanation: "Character diversity makes passwords resistant to dictionary attacks and pattern-based cracking. Modern password crackers can test billions of common passwords per second, but complexity significantly slows them down.",
                keyPoints: [
                    "Use all 4 character types: uppercase, lowercase, numbers, symbols",
                    "Avoid predictable substitutions (@ for a, 3 for e)",
                    "Random character placement is more secure than patterns",
                    "Symbols like !@#$%^&* add significant entropy"
                ],
                example: "Weak: Password123\nBetter: P@ssw0rd!23\nBest: mK9$vL2#nQ8@pR5*",
                references: [
                    "Microsoft Security Intelligence Report 2024",
                    "Carnegie Mellon Password Research"
                ]
            }
        },
        {
            id: 3,
            title: "Avoid Common Patterns",
            icon: "🚫",
            shortDesc: "Stay away from dictionary words, personal info, and predictable patterns.",
            details: {
                explanation: "Hackers use sophisticated wordlists containing billions of common passwords, dictionary words, and common patterns. Personal information from social media makes personalized attacks easier than ever in 2025.",
                keyPoints: [
                    "Never use dictionary words, even with substitutions",
                    "Avoid personal info: names, birthdays, addresses",
                    "Don't use keyboard patterns: qwerty, 12345, asdfgh",
                    "Steer clear of popular culture references",
                    "Each account needs a unique password"
                ],
                example: "❌ john1985, ilovecats, qwerty123\n❌ JohnSmith@gmail.com as password\n✅ Use password managers to generate random passwords",
                references: [
                    "HaveIBeenPwned Database Analysis 2024",
                    "Verizon Data Breach Investigations Report 2024"
                ]
            }
        },
        {
            id: 4,
            title: "Use a Password Manager",
            icon: "🔐",
            shortDesc: "Let technology handle the complexity of creating and storing unique passwords.",
            details: {
                explanation: "Password managers are essential in 2025. They generate truly random passwords, store them encrypted, and automatically fill them in. This eliminates the need to remember dozens of complex passwords and prevents password reuse.",
                keyPoints: [
                    "Generates cryptographically secure random passwords",
                    "Stores passwords with military-grade encryption (AES-256)",
                    "Enables unique password for every account",
                    "Auto-fills credentials to prevent phishing",
                    "Syncs securely across all your devices",
                    "Many include breach monitoring and security audits"
                ],
                example: "Popular options in 2025:\n• 1Password - Best for families\n• Bitwarden - Open source & affordable\n• Dashlane - Premium features\n• LastPass - Long-established\n• Built-in browser managers (improved security)",
                references: [
                    "EFF Password Manager Guide 2024",
                    "Consumer Reports Security Tools Review"
                ]
            }
        }
    ];

    return (
        <>
            {/* ===== SECURITY TIPS CARDS ===== */}
            <div className="security-tips-section">
                <h2 className="tips-title">What Makes a Secure Password in 2025?</h2>
                <div className="tips-grid">
                    {securityTips.map((tip, index) => (
                        <div 
                            key={tip.id} 
                            className="tip-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setOpenPopup(tip.id)}
                        >
                            <div className="tip-icon">{tip.icon}</div>
                            <h3 className="tip-title-text">{tip.title}</h3>
                            <p className="tip-description">{tip.shortDesc}</p>
                            <div className="tip-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== SECURITY TIP MODAL POPUP ===== */}
            {openPopup && (() => {
                const tip = securityTips.find(t => t.id === openPopup);
                return (
                <div className="modal-overlay" onClick={() => setOpenPopup(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setOpenPopup(null)}>✕</button>
                        {tip && (
                            <div key={tip.id}>
                                <div className="modal-header">
                                    <span className="modal-icon">{tip.icon}</span>
                                    <h2>{tip.title}</h2>
                                </div>
                                <div className="modal-body">
                                    <p className="modal-explanation">{tip.details.explanation}</p>
                                    
                                    <h3>Key Points:</h3>
                                    <ul className="modal-list">
                                        {tip.details.keyPoints.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>

                                    <div className="modal-example">
                                        <h3>Examples:</h3>
                                        <pre>{tip.details.example}</pre>
                                    </div>

                                    <div className="modal-references">
                                        <h3>References:</h3>
                                        <ul>
                                            {tip.details.references.map((ref, idx) => (
                                                <li key={idx}>{ref}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
            })()}
        </>
    );
}
