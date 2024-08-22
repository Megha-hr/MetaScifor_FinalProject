import React from "react";
import '../css/footer.css'
import {Link} from 'react-router-dom';


function Footer(){
    return(
        <div className="footer">
           <Link to="/Contact" className="footer-link">contact Us</Link> 
           <div className="social-icons">
                <a href="https://github.com/Megha-hr" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github fa-2x"></i>
                </a>
                <a href="https://linkedin.com/in/megha-ravindra-791a70235/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <hr />
                <p>© 2024 Author. All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default Footer;