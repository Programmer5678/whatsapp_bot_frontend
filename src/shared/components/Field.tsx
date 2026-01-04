import './Field.css';

export function Field( props : 
    { label : string, children : React.ReactElement<HTMLInputElement> } 
) {
    return (
        <label className="field">
               <span className="field_span">{props.label}</span>
               {props.children}
        </label>
    );
}