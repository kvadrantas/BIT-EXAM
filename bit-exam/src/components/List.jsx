import Item from "./Item";

function List({items, setShowModal, setModalItem, confirmDelete}) {
    return (
        <div className="main-list">
            <div className="tbl-header">
                <div className="main-list-item-stats">
                    <span>Registration code</span>
                    <span>Km/Day</span>
                    <span>Total ride kilometers</span>
                    <span>Last use time</span>
                    <span>Is busy?</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {items.map(item => <Item key={item.id} item={item} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></Item>)}
        </div>
    )
}

export default List; 