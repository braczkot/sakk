import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export function ChessListPage() {

    const[chesses,setChesses] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        axios.get("https://chess.sulla.hu/chess")
            .then((res) => res.data)
            .then((data) => setChesses(data))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <p className="h1">Sakkozók</p>
                    {chesses.map((chess, index) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="h5">Név: {chess.name}</p>
                            <p className="text-danger">Születési dátum: {chess.birth_date}</p>
                            <p className="text-success">Megnyert világbajnokságok: {chess.world_ch_won}</p>
                            <div className="card-body">
                                <NavLink key={chess.id} to={"/chess/" + chess.id}>
                                    <img alt={chess.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={chess.image_url ? chess.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                <NavLink to={chess.profile_url} target="_blank">Wikipédia link</NavLink><br />
                                <NavLink to={"/mod-chess/" + chess.id}>
                                    <i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink to={"/del-chess/" + chess.id}><i className="bi bi-trash3"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
export default ChessListPage;
