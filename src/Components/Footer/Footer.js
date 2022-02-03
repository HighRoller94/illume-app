import React from 'react'

import './Footer.css'

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <footer>
            <div className="footer">
                <h3 onClick={scrollToTop}>Back to top</h3>
            </div>
            
        </footer>
    )
}

export default Footer
