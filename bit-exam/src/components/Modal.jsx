import { useEffect, useState } from "react";
import isValidf from "../js/isValidf";


function Modal({edit, confirmDelete, modalItem, showModal, setShowModal, busy, setShowWarningModal, error, setError}) {

    const [inputs, setInputs] = useState({
        registration_code: '',
        day_ride: '',
        total_ride_kilometers: '',
        last_use_time: '',
        is_busy: false,
    });

    useEffect(() => {
        setInputs({
            registration_code: modalItem.registration_code,
            day_ride: modalItem.day_ride,
            total_ride_kilometers: modalItem.total_ride_kilometers,
            last_use_time: modalItem.last_use_time,
            is_busy: modalItem.is_busy,
        })
    }, [modalItem]);

    const handleEdit = () => {
        if(
            !(isValidf('txt', 'required', inputs.registration_code, error, setError) &&
            isValidf('num', 'required', inputs.day_ride, error, setError) &&
            isValidf('num', 'required', inputs.total_ride_kilometers, error, setError) &&
            isValidf('txt', 'optional', inputs.last_use_time.slice(0, 10), error, setError) &&
            isValidf('boolean', 'optional', inputs.is_busy, error, setError) )
        ) {
            setShowWarningModal(true);
        } else {
            edit({
                registration_code: inputs.registration_code,
                day_ride: inputs.day_ride,
                total_ride_kilometers: inputs.total_ride_kilometers,
                last_use_time: inputs.last_use_time,
                is_busy: inputs.is_busy,
            }, modalItem.id)
        }
    };

    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        if(what ==='is_busy') inputsCopy[what] = !inputs.is_busy;
        setInputs(inputsCopy);
    }


    return (
        <div className="main-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY
        }}>
            <div className="main-modal-form">
                <h2>Edit item</h2>
                <label>Registration code*</label><input style={{background:'#bcd8db'}} type="text" value={inputs.registration_code}  readOnly />
                <label>Km/Day*</label><input type="number" value={inputs.day_ride} onChange={(e) => formControl(e, 'day_ride')} />
                <label>Total ride kilometers*</label><input style={{background:'#bcd8db'}} type="number" value={inputs.total_ride_kilometers}  readOnly />
                <label>Last use time</label><input style={{background:'#bcd8db'}} type="date" value={modalItem.last_use_time} readOnly />
                <label>New use time</label><input type="date" value={inputs.last_use_time} onChange={(e) => formControl(e, 'last_use_time')} />
                <div className="for-sale">
                    <label style={{marginTop:'15px'}}>Is busy?</label>
                    <input onChange={(e) => formControl(e, 'is_busy')} value={inputs.is_busy} checked={inputs.is_busy} type="checkbox" />
                </div> <br/>
            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => confirmDelete(modalItem.id)}>Delete</button>
        </div>
    )

}

export default Modal;