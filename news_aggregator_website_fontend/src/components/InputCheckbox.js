import React from 'react'

export default function InputCheckbox({ label, isChecked, setCheckBox }) {
    return (
        <div>
            <label className="custom_check">
                <input type="checkbox" checked={isChecked} onClick={setCheckBox} />
                <span className="checkmark"></span> {label}
            </label>
        </div>
    )
}
