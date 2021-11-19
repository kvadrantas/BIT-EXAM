function Statistics ({stats}) {

    return(
        <>
            <div className="statistics">
                <fieldset className="sub-statistics">
                    <legend>General Statistics</legend>
                    <div>
                            <span><p>Scooter total: <i>{stats.totalScooter}</i></p></span>
                            <span><p>Kilometrage total: <i>{parseFloat(stats.totalKilometrage).toFixed(0)}</i></p></span>
                    </div>
                </fieldset>
            </div>
            <div className="gradient-bar"></div>
        </>
    )
}

export default Statistics;