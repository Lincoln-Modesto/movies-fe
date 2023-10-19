import "./styles.scss";

interface InputProps {
  label: string;
  name: string;
  value: string | undefined;
  placeholder: string;
  required: boolean;
  fallbackText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: ({ target: { name, value } }: any) => void;
  maxLength?: number;
  validation?: boolean;
  disabled?: boolean;
}

function Input(props: InputProps) {

  return (
    <div className="container-input">
        <label htmlFor={props.name}>
          {props.label}
          {props.required && <span className="required-character">*</span>}:
        </label>
        <input
          name={props.name}
          className="base-input"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          type="text"
          maxLength={props.maxLength}
          disabled={props.disabled}
        />
        {!props.validation && (
          <div className="fallback">
            <p>{props.fallbackText}</p>
          </div>
        )}
      </div>
  );
}

export default Input;
