import React from 'react';

// Input component with a label and an error message

function EditCourseInput({ error, isDisabled, label, onChange, value }) {
  return (
    <div>
      <p className="EditCourseLabel"><b>{ label }</b></p>
      <input
        className="EditCourseInput"
        disabled={ isDisabled }
        type="text"
        autoFocus={ true }
        value={ value }
        onChange={ onChange }
      />
    <p className="ErrorMessage">{ error }</p>
    </div>
  );
}

EditCourseInput.propTypes = {
  error: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  isDisabled: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
};


export default EditCourseInput;
