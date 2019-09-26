import React from "react";
import Field from "./Field";
import MySelect, {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents
} from "./MySelect.js";

function Composer(props) {
  const {
    postcodes,
    subject,
    message,
    allPostcodes,
    readOnly,
    onChange,
    dirty,
    validation,
    onPostcodeChange
  } = props;

  const optionsData = allPostcodes.map(postcode => ({
    value: postcode,
    label: postcode
  }));
  /*const selectedOptionsData = postcodes.map(postcode => ({
    value: postcode,
    label: postcode
  }));
  console.log("render - selectedOptionsData", selectedOptionsData);
  */
  return (
    <div className="mesblkml-composer">
      <Field isValid={dirty ? validation.postcodes : true}>
        <MySelect
          className="mes-multiseclct"
          options={optionsData}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
            MultiValue,
            ValueContainer,
            animatedComponents
          }}
          onChange={onPostcodeChange}
          allowSelectAll={true}
          value={postcodes}
        />
      </Field>
      <Field isValid={dirty ? validation.subject : true}>
        <input
          type="text"
          value={subject}
          onChange={onChange}
          name="subject"
          readOnly={readOnly}
        />
      </Field>
      <Field isValid={dirty ? validation.message : true}>
        <textarea
          value={message}
          onChange={onChange}
          name="message"
          readOnly={readOnly}
          rows="10"
        />
      </Field>
    </div>
  );
}

export default Composer;
