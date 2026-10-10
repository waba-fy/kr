import { emptyArrayItem } from "./contentTemplate.mjs";
import { useRef } from "react";
const labelFor = (key) => String(key).replace(/([A-Z])/g, " $1").replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase());

const PrimitiveField = ({ name, value, onChange }) => {
  if (typeof value === "boolean") return <label className="kr-admin-check"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)}/><span>{labelFor(name)}</span></label>;
  if (typeof value === "number") return <label>{labelFor(name)}<input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))}/></label>;
  const isLong = String(value || "").length > 100 || /desc|summary|message|review|content|challenge|solution|result|quote|overview|introduction|address|note/i.test(name);
  return <label>{labelFor(name)}{isLong ? <textarea rows="4" value={value ?? ""} onChange={(event) => onChange(event.target.value)}/> : <input value={value ?? ""} onChange={(event) => onChange(event.target.value)}/>}</label>;
};

const StructuredContentEditor = ({ value, onChange, name = "Content", depth = 0 }) => {
  const itemTemplate = useRef(Array.isArray(value) ? value[0] : undefined);
  if (Array.isArray(value)) return <fieldset className="kr-admin-structured-group"><legend>{labelFor(name)}</legend>
    {value.map((item, index) => <div className="kr-admin-array-item" key={`${name}-${index}`}>
      {item && typeof item === "object" ? <StructuredContentEditor name={`Item ${index + 1}`} value={item} onChange={(next) => onChange(value.map((current, itemIndex) => itemIndex === index ? next : current))} depth={depth + 1}/> : <PrimitiveField name={`Item ${index + 1}`} value={item} onChange={(next) => onChange(value.map((current, itemIndex) => itemIndex === index ? next : current))}/>} 
      <button type="button" className="kr-admin-remove" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
    </div>)}
    <button type="button" onClick={() => onChange([...value, emptyArrayItem(value[0] ?? itemTemplate.current ?? "")])}>Add item</button>
  </fieldset>;

  if (value && typeof value === "object") return <fieldset className={`kr-admin-structured-group depth-${Math.min(depth, 3)}`}><legend>{labelFor(name)}</legend>
    {Object.entries(value).map(([key, child]) => child && typeof child === "object" ? <StructuredContentEditor key={key} name={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })} depth={depth + 1}/> : <PrimitiveField key={key} name={key} value={child} onChange={(next) => onChange({ ...value, [key]: next })}/>)}
  </fieldset>;

  return <PrimitiveField name={name} value={value} onChange={onChange}/>;
};

export default StructuredContentEditor;
