import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './History.css'
import M from "materialize-css/dist/js/materialize.min.js";

function History ({onClick}){

    let updatedHistory = useSelector(state => state.history);
    const dispatch = useDispatch();

    const removeFromHistory = (removeCity) => {

        let data = {
            city : removeCity
        }

        dispatch({'type': 'removeFromHistory', data: data})
        onClick()

    }

    return(
        
        <div className="row center card z-depth-5">
            <span className="card-title">History</span>
            <hr/>     
            {
                
                updatedHistory.map((elm,i) => {
                    return(
                    <div key={i} className="chip">
                        <span className="city">{elm.city}</span>
                        <i onClick={() => removeFromHistory(elm.city)} className="close material-icons">close</i>
                    </div>)
                })

            }
            
        </div>
        
    )
}

export default History;