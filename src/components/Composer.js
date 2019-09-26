import React from "react";
import Field from "./Field";

function Composer(props) {
  const {
    postcode,
    subject,
    message,
    allPostcodes,
    readOnly,
    onChange,
    dirty,
    validation
  } = props;
  const options = allPostcodes.map(pc => (
    <option key={pc} value={pc}>
      {pc}
    </option>
  ));
  return (
    <div className="mesblkml-composer">
      <Field isValid={dirty ? validation.postcode : true}>
        <select
          value={postcode}
          name="postcode"
          onChange={readOnly ? () => {} : onChange}
        >
          <option key={allPostcodes.length} value="">
            Select Postcode
          </option>
          {options}
        </select>
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
