function Nav({ filterBy, setFilterBy, reset, searchBy, setSearchBy, sortConditions, handleSort}) {

// ----------------- FILTER -----------------


    const selectFilter = e => {
        setFilterBy(e.target.value)
    }


// ----------------- SORT -----------------
    const selectSort = e => {
        sortConditions.current = e.target.value;
        handleSort(e.target.value);
    }
    

// ----------------- SEARCH -----------------
    const handleSearchValue = e => {
        if(!e.target.value) reset();
        setSearchBy(e.target.value)
    }

// ----------------- RESET -----------------
    const resetHandler = () => {
        reset();
        setFilterBy('');
        setSearchBy('');
        sortConditions.current = '';
        handleSort('');
    }

    return (
        <div className="main-nav">
            <fieldset>
                <fieldset>
                    <legend>Filter</legend>
                    <div className="filter">
                        <label>Is busy?</label><br></br>
                        <select onChange={selectFilter} value={filterBy} >
                            <option value="default" hidden>Select filter...</option>
                            <option value="">Select...</option>
                            <option value={1}>yes</option>
                            <option value={0}>no</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Sorting</legend>
                    <div className="sort">
                        <label>Select sort criteria</label><br></br>
                    <button onClick={selectSort} value="number-asc,total_ride_kilometers">Total ride &#8593;</button>
                    <button onClick={selectSort} value="number-desc,total_ride_kilometers">Total ride &#8595;</button>
                    <button onClick={selectSort} value="date-asc,last_use_time">Last use &#8593;</button>
                    <button onClick={selectSort} value="date-desc,last_use_time">Last use &#8595;</button>
                    </div>
                </fieldset>
                <button className="form-button" onClick={resetHandler}>Reset</button>
            </fieldset>
            <fieldset>
                <legend>Search</legend>
                <div className="search">
                    <label>Type search text</label>
                    <input onChange={handleSearchValue} value={searchBy}></input>
                </div>
            </fieldset>
        </div>
    )
}

export default Nav;