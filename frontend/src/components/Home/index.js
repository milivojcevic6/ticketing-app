function HomePage() {

    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        <>
            <div className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center my-5">
                                <h1 className="display-5 fw-bolder text-white mb-2">Welcome to eBill</h1>
                                <p className="lead text-white-50 mb-4 p-4">Easy and fast universal payment orders
                                    generation.</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                    <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                                    <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-5 border-bottom" id="features">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-collection"></i></div>
                            <h2 className="h4 fw-bolder">Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with
                                another
                                sentence and probably just keep going until we run out of words.</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-building"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with
                                another
                                sentence and probably just keep going until we run out of words.</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                className="bi bi-toggles2"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with
                                another
                                sentence and probably just keep going until we run out of words.</p>
                            <a className="text-decoration-none" href="#!">
                                Call to action
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/*<div>*/}
            {/*    <table style={{height: 600, tableLayout: "fixed"}} className="container-fluid text-center">*/}
            {/*        <tbody>*/}
            {/*        <tr>*/}
            {/*            <td className="align-middle">*/}
            {/*                <button type="button"*/}
            {/*                        className="btn btn-secondary h-50 w-50" onClick={(e) => {*/}
            {/*                    e.preventDefault();*/}
            {/*                    window.location.href = '/admin';*/}
            {/*                }}>Admin Panel*/}
            {/*                </button>*/}
            {/*            </td>*/}
            {/*            <td className="align-middle">*/}
            {/*                <button type="button"*/}
            {/*                        className="btn btn-secondary h-50 w-50">User Profile*/}
            {/*                </button>*/}
            {/*            </td>*/}
            {/*            <td className="align-middle">*/}
            {/*                <button type="button"*/}
            {/*                        className="btn btn-secondary h-50 w-50"  onClick={(e) => {*/}
            {/*                    e.preventDefault();*/}
            {/*                    window.location.href = '/generate';*/}
            {/*                }}>Generate New UPN*/}
            {/*                </button>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
        </>

    )
}


export default HomePage