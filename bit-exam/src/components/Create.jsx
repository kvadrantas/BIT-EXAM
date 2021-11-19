import { useState } from "react";
import isValidf from "../js/isValidf";

function Create({create, handleNewRecord, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        registration_code: '',
        day_ride: '',
        total_ride_kilometers: '',
        last_use_time: '',
        is_busy: false,
    });


    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        
        if(what ==='is_busy') inputsCopy[what] = !inputs.is_busy;

        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        if(
            !(
            isValidf('num', 'required', inputs.day_ride, error, setError) &&
            isValidf('txt', 'optional', inputs.last_use_time.slice(0, 10), error, setError))
        ) {
            setShowWarningModal(true);
        } else {
            create(inputs)
            setInputs({
                registration_code: '',
                day_ride: '',
                total_ride_kilometers: '',
                last_use_time: '',
                is_busy: false,
            });

        }
    }

    return (
        <div className="main-form">
            <fieldset>
                <legend>New record</legend>
                <label htmlFor="">Km/Day*</label>
                <input type="number" value={inputs.day_ride} onChange={(e) => formControl(e, 'day_ride')} />                
                <label htmlFor="">Last use time</label>
                <input type="date" value={inputs.last_use_time} onChange={(e) => formControl(e, 'last_use_time')} />
                <button className="form-button" onClick={handleCreate}>Add</button>
                <button className="form-button" onClick={handleNewRecord}>New Record...</button>
            </fieldset>
        </div>
    )

}

export default Create;