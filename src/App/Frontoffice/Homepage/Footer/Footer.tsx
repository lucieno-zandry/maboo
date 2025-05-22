import React from "react";
import logo from '../../../../assets/icons/maboo.png';
import mvola from '../../../../assets/icons/Mvola.png';
import orangeMoney from '../../../../assets/icons/orange-money.jpeg';
import airtelMoney from '../../../../assets/icons/airtel-money.png';


const Footer = React.memo(() => {
    return <footer className="container">
        <div className="logo-container">
            <img
                src={logo}
                className="logo" />
            <p>Soutiens chaleureux, croissance harmonieuse</p>
        </div>
        <div>
            <h6>Plus sur Ma Boo</h6>
            <ul>
                <li>
                    À propos
                </li>
                <li>
                    Blog
                </li>
                <li>
                    Forums
                </li>
            </ul>
        </div>
        <div>
            <h6>Payer avec</h6>
            <ul>
                <li><img className="brand-logo" src={mvola} /> Mvola</li>
                <li><img className="brand-logo" src={orangeMoney} /> Orange Money</li>
                <li><img className="brand-logo" src={airtelMoney} /> Airtel Money</li>
            </ul>
        </div>
        <div>
            <h6>Contactez-nous sur</h6>
            <ul className="contact-links">
                <li><a href="https://www.facebook.com/mg.maboo" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i> Facebook</a></li>
                <li><a href="https://wa.me/261341585611" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a></li>
                <li><a href="tel:+261341585611"><i className="fa fa-phone"></i> +261 34 15 856 11</a></li>
                <li><a href="mailto:contact.ma.boo@gmail.com"><i className="fa fa-envelope"></i> contact.ma.boo@gmail.com</a></li>
            </ul>
        </div>
    </footer>
})

export default Footer;