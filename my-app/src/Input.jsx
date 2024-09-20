import React from 'react';

/**
 * Input component.
 * This component renders a customizable input field that can be used in forms.
 *
 * Props:
 * - name: The name attribute for the input element.
 * - type: The type of the input (e.g., text, password).
 * - placeholder: Placeholder text displayed in the input field.
 * - onChange: Function to handle input value changes.
 * - value: The current value of the input field.
 */
const Input = ({ name, type, placeholder, onChange, value }) => {
    return (
        <div className="input-field"> {/* Container for input field */}
            <input
                name={name}          // Name attribute for identifying the input
                type={type}          // Type of input (e.g., text, password)
                placeholder={placeholder} // Placeholder text for guidance
                onChange={onChange}  // Function to handle changes in input
                value={value}        // Controlled input value
                required              // Makes this input field mandatory
            />
        </div>
    );
};

export default Input;
