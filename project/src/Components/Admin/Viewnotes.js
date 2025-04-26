import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import pythonLogo from '../../Assets/python-logo.png';
import jslogo from '../../Assets/logo-javascript.png';
import htmllogo from '../../Assets/html.png';
import csslogo from '../../Assets/css.jpg';
import javalogo from '../../Assets/Java-Logo.png'
import clogo from '../../Assets/c.png'

function Viewnotes() {
    return (
        <div>
            <div class="container">
                <center><h1>NOTES</h1></center><br></br>
                <div class="row">
                    <div className="col-lg-3 col-md-6 col-12 mb-3 mx-5">
                        <div class="card"><br></br>
                            <img src={pythonLogo} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">Python concepts</h5>
                                <p class="card-text">Python is a set of instructions that we give in the form of a program to our computer to perform any specific task.</p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3 mx-5">
                        <div class="card">
                            <img src={jslogo} class="card-img-top" alt="..."></img>
                            <div class="card-body"><br></br>
                                <h5 class="card-title">Javascript concepts</h5>
                                <p class="card-text">JavaScript is a programming language used to create dynamic content for websites.It is a lightweight, cross-platform</p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3 ">
                        <div class="card"><br></br>
                            <img src={htmllogo} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">HTML concepts</h5>
                                <p class="card-text">HTML stands for Hyper Text Markup Language.It is the standard markup language for creating Web pages</p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3 mx-5">
                        <div class="card"><br></br>
                            <img src={csslogo} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">CSS concepts</h5>
                                <p class="card-text"> CSS (Cascading Style Sheets) is a language designed to simplify the process of making web pages presentable.</p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3 mx-5">
                        <div class="card"><br></br>
                            <img src={javalogo} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">Java concepts</h5>
                                <p class="card-text"> Java is a high-level, general-purpose, memory-safe, object-oriented programming language.</p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                        <div class="card"><br></br>
                            <img src={clogo} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h5 class="card-title">C concepts</h5>
                                <p class="card-text">C is an imperative procedural language, lexical variable scope, and recursion, with a static type system. </p>
                                <a href="#" class="btn btn-primary">View more</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Viewnotes