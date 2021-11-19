import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Create from "./components/Create";
import List from "./components/List";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import Sort from "./js/Sort";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for error page 404
import PageNotFound from "./components/404-page";
import fixdate from "./js/fixDate";
import Statistics from "./components/Statistics";
import ActionMsg from "./components/ActionMsg";
import ConfirmDelete from "./components/ConfirmDelete";
import NewRecord from "./components/NewRecord";
import WarningModal from "./components/WarningModal";
 


function App () {

    const [items, setItems] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

// EDIT RECORD MODAL
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState({
        registration_code: '',
        day_ride: '',
        total_ride_kilometers: '',
        last_use_time: '',
        is_busy: '',
    });

// WARNING MODAL 
const [showWarningModal, setShowWarningModal] = useState(false);
const [error, setError] = useState('');


    // ----------------- ACTION MESSAGES -----------------
    const [showMsg, setShowMsg] = useState(false);
    const msg = useRef('');

    const addMsg = (text) => {
        msg.current = text;
        setShowMsg(true);
        setTimeout(() => {clearMsg()}, 2000);
    }

    const clearMsg = () => {
        setShowMsg(false)
    }

    // ----------------- STATISTICS -----------------
    const [stats, setStats] = useState({
        totalScooter: 0,
        totalKilometrage: 0
    })

    useEffect(() => {
        axios.get('http://localhost:3003/statistics')
            .then(res => {
                setStats(res.data);
            })
    }, [lastUpdate])



    // ----------------- FILTERING -----------------
    const [filterBy, setFilterBy] = useState('');
    
    useEffect(() => {
        if (filterBy) {
            axios.get('http://localhost:3003/bolt-filter/'+filterBy)
            .then(res => {
                setItems(Sort(fixdate(res.data), sortConditions.current));
                // setItems(fixdate(res.data));
                // console.log(res.data);
            })
            setSearchBy('');
        }
    }, [filterBy])



    const reset = () => {
        setLastUpdate(Date.now());
    }

    // ----------------- SORT -----------------
    const sortConditions = useRef('');
    const handleSort = () => {
        if (sortConditions.current) {
            setItems(Sort(items, sortConditions.current));
        }
    }


    // ----------------- SEARCH -----------------
    const [searchBy, setSearchBy] = useState('');

    useEffect(() => {
        if (searchBy) {
        axios.get('http://localhost:3003/bolt-search/?s='+searchBy)
            .then(res => {
                setItems(Sort(fixdate(res.data), sortConditions.current));
            })
            setFilterBy('');
        }
    }, [searchBy])
    // ------------------------------------------


    // ALL RECORDS
    useEffect(() => {
        axios.get('http://localhost:3003/bolt')
        .then(res => {
            setItems(Sort(fixdate(res.data), sortConditions.current));
        })
    }, [lastUpdate])

    // NEW RECORD
    const [showNewRecordModal, setShowNewRecordModal] = useState(false);

    const handleNewRecord = () => {
        setShowNewRecordModal(true);
    }

    const create = item => {
        axios.post('http://localhost:3003/bolt', item)
        .then(res => {
            addMsg('Record successfully added.');
            setLastUpdate(Date.now());
        })
    }

    // EDIT RECORD 
    const edit = (item, id) => {
        setShowModal(false);
        axios.put('http://localhost:3003/bolt/' + id, item)
        .then(res => {
            addMsg('Record successfully saved.');
            setLastUpdate(Date.now());
        })
    }

    // REMOVE RECORD 
    const[showDeleteCofirm, setShowDeleteConfirm] = useState(false);
    const[deleteConfirmed, setDeleteConfirmed] = useState(false);
    const[rcrdMarked, setrcrdMarked] = useState();

    const confirmDelete = (id) => {
        setShowDeleteConfirm(true);
        setrcrdMarked(id);
    }

    const remove = (id) => {
        setShowModal(false);
        axios.delete('http://localhost:3003/bolt/' + id)
        .then(res => {
            addMsg('Record successfully removed.');
            setLastUpdate(Date.now());
        })
    }

    
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <ActionMsg msg={msg.current} showMsg={showMsg}></ActionMsg>
                        <Statistics stats={stats} />
                        <div className="nav">
                            <Nav searchBy={searchBy}  setSearchBy={setSearchBy} filterBy={filterBy} setFilterBy={setFilterBy} sortConditions={sortConditions} handleSort={handleSort}  reset={reset}></Nav>
                            <Create create={create} handleNewRecord={handleNewRecord} setShowWarningModal={setShowWarningModal} error={error} setError={setError}></Create>
                            <NewRecord create={create} showNewRecordModal={showNewRecordModal} setShowNewRecordModal={setShowNewRecordModal} setShowWarningModal={setShowWarningModal}  error={error} setError={setError}></NewRecord>
                        </div>
                        <div className="main">
                            <WarningModal showWarningModal={showWarningModal} setShowWarningModal={setShowWarningModal} error={error}/>
                            <ConfirmDelete showDeleteCofirm={showDeleteCofirm} setShowDeleteConfirm={setShowDeleteConfirm} deleteConfirmed={deleteConfirmed} setDeleteConfirmed={setDeleteConfirmed} rcrdMarked={rcrdMarked} remove={remove}/>
                            <Modal edit={edit} remove={remove} modalItem={modalItem} showModal={showModal} setShowModal={setShowModal} confirmDelete={confirmDelete} setShowWarningModal={setShowWarningModal} error={error} setError={setError}></Modal>
                            <List items={items} setShowModal={setShowModal} setModalItem={setModalItem} confirmDelete={confirmDelete}></List>
                        </div>
                    </>
                    }>
                </Route>

                <Route path="/*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    )
}

export default App; 