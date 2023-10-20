/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./styles.scss";

interface ISelectProps {
  list: Array<ISelectList>;
  onChange: (value: any) => void;
  value: number;
  label: string;
  required: boolean;
  defaultOption: string;
  validation?: boolean;
  fallbackText?: string;
}

export interface ISelectList {
  label: string;
  value: number;
}

function Select(props: ISelectProps) {
  const [state, setState] = useState();

  const handleClick = (value: any) => {
    setState(value);
    props.onChange(value);
  };

  return (
    <div className="container-select">
      <label htmlFor="state">
        {props.label}
        {props.required && <span className="required-character">*</span>}:
      </label>
      <select
        name="state"
        id="states"
        value={props.value}
        onChange={handleClick}
        className="base-select"
      >
        <option value="" disabled>
          {props.defaultOption}
        </option>
        {props.list.length &&
          props.list.map((state, i) => (
            <option value={state.value} key={i}>
              {" "}
              {state.label}{" "}
            </option>
          ))}
      </select>
      {!props.validation && (
          <div className="fallback">
            <p>{props.fallbackText}</p>
          </div>
        )}
    </div>
  );
}

export default Select;
