const { useState, useEffect } = React;

/**
 * MainApp Component
 * Root component that manages the overall layout and page structure
 * Combines all child components: Menu, Background, and Main Content
 */
function MainApp() {
    return (
        <>
            {/* ===== BACKGROUND ANIMATION =====
                Matrix-style animated letter glitch effect
                Fills entire background, stays behind all content
            */}
            <LetterGlitch 
                glitchColors={[
                    '#2b4539',   // Dark green
                    '#61dca3',   // Light green
                    '#024706'    // Very dark green
                ]}
                glitchSpeed={2}      // Update every 2ms
                smooth={true}        // Smooth color transitions
                centerVignette={false}   // Don't darken center
                outerVignette={true}     // Darken edges
            />
            
            {/* ===== MAIN CONTENT =====
                Full-screen sections with snap scroll behavior
            */}
            <div className="snap-container">
                {/* HOME SECTION - Welcome and introduction */}
                <section id="home" className="snap-section header-section">
                    <div className="hero-content">
                        <h1 className="hero-title">SecureEnough</h1>
                        <p className="hero-subtitle">Generate and test strong passwords</p>
                        <p className="hero-description">
                            Your all-in-one tool for creating secure passwords and analyzing their strength.
                            Protect your digital life with passwords that are truly SecureEnough.
                        </p>
                        <div className="hero-cta">
                            <a href="#generator" className="cta-button primary">Generate Password</a>
                            <a href="#tester" className="cta-button secondary">Test Password</a>
                        </div>
                        <div className="scroll-indicator">
                            <span>Scroll Down</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* GENERATOR SECTION - Password generation tool */}
                <section id="generator" className="snap-section">
                    <div className="container">
                        <PasswordGenerator />
                    </div>
                </section>

                {/* TESTER SECTION - Password strength analyzer */}
                <section id="tester" className="snap-section">
                    <div className="container">
                        <PasswordStrengthTester />
                    </div>
                </section>

                {/* FOOTER SECTION - About, links, and credits */}
                <section id="footer" className="snap-section footer-section">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h2>SecureEnough</h2>
                            <p>Because your passwords should be.</p>
                        </div>
                        
                        <div className="footer-links">
                            {/* Quick links to tools */}
                            <div className="footer-column">
                                <h3>Tools</h3>
                                <ul>
                                    <li><a href="#generator">Password Generator</a></li>
                                    <li><a href="#tester">Password Tester</a></li>
                                    <li><a href="#home">Home</a></li>
                                </ul>
                            </div>
                            
                            {/* Documentation and resources */}
                            <div className="footer-column">
                                <h3>Resources</h3>
                                <ul>
                                    <li><a href="https://github.com/deltahotelsierra/password_checker" target="_blank">View on GitHub</a></li>
                                    <li><a href="README.md" target="_blank">Documentation</a></li>
                                </ul>
                            </div>
                            
                            {/* Social media connections */}
                            <div className="footer-column">
                                <h3>Connect</h3>
                                <ul>
                                    <li><a href="https://github.com/deltahotelsierra" target="_blank">GitHub</a></li>
                                    <li><a href="mailto:deltahotelsierra@hotmail.com">Email</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Footer information */}
                        <div className="footer-bottom">
                            <p>&copy; 2025 SecureEnough. Built by DeltaHotelSierra</p>
                            <p className="footer-note">All password checks are performed locally - your data never leaves your device.</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
