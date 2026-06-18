import { EXPLANATION_MODES } from "../../utils/constants";

function ModeSelector({ value, onChange, disabled = false }) {
  return (
    <div className="form-group">
      <label htmlFor="explanation-mode">Explanation mode</label>

      <select
        id="explanation-mode"
        name="mode"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {EXPLANATION_MODES.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModeSelector;