import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import './History.css'
import M from "materialize-css/dist/js/materialize.min.js";

function History (){

    let updatedHistory = useSelector(state => state.history);

    return(
        
        <div className="row center card z-depth-5">
            <span className="card-title">History</span>
            <hr/>     
            {
                
                updatedHistory.map(elm => {
                    return(<div className="chip">
                        <span className="city">{elm.city}</span>
                        <i className="close material-icons">close</i>
                    </div>)
                })

            }
            
        </div>
        
    )
}

export default History;