import React from 'react'

const Footer = () => {
    return (
        <footer className="footer footer-center bg-yellow-400 text-white text-xl p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by MyNotes Industries Ltd</p>
            </aside>
        </footer>
    )
}

export default Footer