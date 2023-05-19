import * as Icon from "react-feather";
import React from "react";

const SearchBar = ({keyword, onChange}) => {
    const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem"};
    return (
        <form className="d-flex">
            <input className="form-control me-2" type="search" value={keyword} placeholder="Search"
                   aria-label="Search"  onChange={(e) => onChange(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit"><Icon.Search/></button>
        </form>
    );
}

export default SearchBar;