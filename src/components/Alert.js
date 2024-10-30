import React from 'react';

export default function Alert(props) {
 const capitalaize =(word) =>{
    const lower =word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
 }
  return (
    <div>
      {props.alert && ( // Only render the alert if props.alert is not null
        <div className={"alert alert-" + props.alert.type + " alert-dismissible fade show"} role="alert">
          <strong>{capitalaize(props.alert.type)}</strong>: {props.alert.msg}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
    </div>
  );

}