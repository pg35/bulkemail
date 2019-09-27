import React from "react";
import Field from "./Field";
import MySelect, {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents
} from "./MySelect.js";

const sampleMessage = `Hi [name],

We are delighted to inform you about our annual sales gala starting on the 1st of next month.

Regards,
Admin`;

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
    onPostcodeChange,
    touched
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
      <Field isValid={dirty && touched.postcodes ? validation.postcodes : true}>
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
          placeholder="Select Postcode(s)"
        />
      </Field>
      <Field isValid={dirty && touched.subject ? validation.subject : true}>
        <input
          type="text"
          value={subject}
          onChange={onChange}
          name="subject"
          readOnly={readOnly}
          placeholder="Write Subject"
        />
      </Field>
      <Field isValid={dirty && touched.message ? validation.message : true}>
        <textarea
          value={message}
          onChange={onChange}
          name="message"
          readOnly={readOnly}
          rows="10"
          placeholder="Write Message"
        />
      </Field>
      <Field isValid={true}>
        *use [name] to insert customer billing name in the message e.g. Hi
        [name], ....
      </Field>
    </div>
  );
}

export default Composer;
