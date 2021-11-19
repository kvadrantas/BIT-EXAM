import moment from "moment-timezone";

function Item({item, setShowModal, setModalItem, confirmDelete}) {

    const showEdit = () => {
        setShowModal(true);
        setModalItem(item);
    }

    const stock = (a) => {
        if(a === 1) {
            return 'busy';
        } else {
            return 'free';
        }
    }

    return (
        <div className="main-list-item">
    
            <div className="main-list-item-stats">
                <span className="main-list-item-name">{item.registration_code}</span>
                <span><span className="field-names">Km/Day: </span>{item.day_ride}</span>
                <span><span className="field-names">Total ride in km: </span>{item.total_ride_kilometers}</span>
                <span><span className="field-names">Last use time: </span>{moment.tz(item.last_use_time, "Europe/Vilnius").format('YYYY-MM-DD')}  </span>
                <span><span className="field-names">Is busy? </span>{stock(item.is_busy)}</span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => confirmDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Item; 