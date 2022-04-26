function Header() {
    return ( 
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="logo d-flex align-items-center">
                <img src="http://localhost:3000/assets/img/logo.png" alt="" />
                <span className="d-none d-lg-block">Vocabulary</span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn" />
            </div>
        </header>
    );
}

export default Header;