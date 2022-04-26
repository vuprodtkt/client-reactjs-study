function Page404() {
    return ( 
        <>
        <main>
            <div className="container">
                <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>The page you are looking for doesn't exist.</h2>
                    <a className="btn" href="/home">Back to home</a>
                    <img src="assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found" />
                    <div className="credits">
                        Designed by 
                        <a href="https://facebook.com/vuprodtkt">
                            Vũ Thái
                        </a>
                    </div>
                </section>
            </div>
      </main>{/* End #main */}      
        </>
     );
}

export default Page404;