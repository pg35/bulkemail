import React from "react";

function Composer(props) {
  const {
    postcode,
    subject,
    message,
    allPostcodes,
    readOnly,
    onChange
  } = props;
  const options = allPostcodes.map(pc => (
    <option key={pc} value={pc}>
      {pc}
    </option>
  ));
  return (
    <div id="mesblkml-composer">
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
      <input
        type="text"
        value={subject}
        onChange={onChange}
        name="subject"
        readOnly={readOnly}
      />
      <textarea
        value={message}
        onChange={onChange}
        name="message"
        readOnly={readOnly}
      />
    </div>
  );
}

export default Composer;
