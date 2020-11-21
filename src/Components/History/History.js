import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './History.css'

function History ({hideHistoryComponent, updateSearch}){

    // let [selectedCity,setSelectedCity] = useState("");

    let updatedHistory = useSelector(state => state.history);
    const dispatch = useDispatch();

    const removeFromHistory = (removeCity) => {

        let data = {
            city : removeCity
        }

        dispatch({'type': 'removeFromHistory', data: data})
        hideHistoryComponent()

    }

    return(
        
        <div className="row center card z-depth-5">
            <span className="card-title">History</span>
            <hr/>     
            {
                
                updatedHistory.map((elm,i) => {
                    return(
                    <div key={i} className="chip" >
                        <a onClick={(event) => updateSearch(elm.city,event)} className="city">{elm.city}</a>
                        <i onClick={() => removeFromHistory(elm.city)} className="close material-icons">close</i>
                    </div>)
                })

            }
            
        </div>
        
    )
}

export default History;