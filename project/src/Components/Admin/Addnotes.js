import React, { useState } from "react";
import { Link } from "react-router-dom";

function Addnotes() {
    const [data, setDatas] = useState({ title: "", subtitle: "", category: "", desc: "" });

    const handleChange = (e) => {
        setDatas({ ...data, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", data);
    };

    return (
        <div>
            <br></br>
            <center><h1>ADD NOTES</h1></center><br></br>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label >TITLE:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        name="title"
                        onChange={handleChange}
                    />

                    <label>SUB TITLE(optional):-</label>
                    <input
                        type="text"
                        id="subtitle"
                        placeholder="Enter subtitle"
                        name="subtitle"
                        onChange={handleChange}
                    />
                    <label>CATEGORY:-</label>
                    <div class="radio-group">
                        <div>
                            <input type="radio" id="c" value="C" name="category"></input>
                            <label for="c">C</label>
                        </div>

                        <div>
                            <input type="radio" id="java" value="JAVA" name="category"></input>
                            <label for="java">JAVA</label>
                        </div>

                        <div>
                            <input type="radio" id="python" value="PYTHON" name="category"></input>
                            <label for="python">PYTHON</label>
                        </div>

                        <div>
                            <input type="radio" id="html" value="HTML" name="category"></input>
                            <label for="html">HTML</label>
                        </div>

                        <div>
                            <input type="radio" id="css" value="CSS" name="category"></input>
                            <label for="css">CSS</label>
                        </div>

                        <div>
                            <input type="radio" id="js" value="JAVASCRIPT" name="category"></input>
                            <label for="js">JAVASCRIPT</label>
                        </div>
                    </div>

                    <label htmlFor="desc">DESCRIPTION:</label>
                    <textarea
                        id="desc"
                        name="desc"
                        onChange={handleChange}
                    ></textarea>
                    <div class="button-group">
                        <button type="submit" class="bttn">ADD</button>
                        <button type="submit" class="bttns"><Link></Link>CANCEL</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Addnotes;