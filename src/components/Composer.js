import React from "react";

function Composer(props) {
  const { postcode, subject, message, allPostcodes, readOnly } = props;
  const options = allPostcodes.map(pc => (
    <option key={pc} value={pc}>
      {pc}
    </option>
  ));
  return (
    <div id="mesblkml-composer">
      <select
        value={postcode}
        onChange={props.onChange}
        name="postcode"
        disabled={readOnly}
      >
        <option key={allPostcodes.length} value="">
          Select Postcode
        </option>
        {options}
      </select>
      <input
        type="text"
        value={subject}
        onChange={props.onChange}
        name="subject"
        disabled={readOnly}
      />
      <textarea
        value={message}
        onChange={props.onChange}
        name="message"
        disabled={readOnly}
      />
    </div>
  );
}

export default Composer;
