import React from "react";
import Field from "./Field";
import MySelect, {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents
} from "./MySelect.js";
import MessageEditorWithPreview from "./MessageEditorWithPreview";
import EmailPreview from "./EmailPreview";

import { formatEmail, insertInStr } from "../util";

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
    touched,
    emailTemplate,
    onEmailPreviewUpdate,
    emailPreviewCount
  } = props;

  const optionsData = allPostcodes.map(postcode => ({
    value: postcode,
    label: postcode
  }));

  const formattedEmail = formatEmail({ subject, message });
  const html = insertInStr(formattedEmail, emailTemplate);

  return (
    <div className="mesblkml-composer">
      <Field isValid={dirty && touched.postcodes ? validation.postcodes : true}>
        <div style={{ padding: "2px 0" }}>
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
        </div>
      </Field>
      <Field isValid={dirty && touched.subject ? validation.subject : true}>
        <input
          type="text"
          value={subject}
          onChange={onChange}
          name="subject"
          readOnly={readOnly}
          placeholder="Write Subject"
          onBlur={onEmailPreviewUpdate}
        />
      </Field>
      <Field isValid={dirty && touched.message ? validation.message : true}>
        <MessageEditorWithPreview
          message={message}
          formattedMessage={formattedEmail.message}
          onChange={onChange}
          onBlur={onEmailPreviewUpdate}
        />
      </Field>
      <Field isValid={true}>
        <EmailPreview
          html={html}
          count={emailPreviewCount}
          title={
            <span>
              Email Preview{" "}
              <small>(updates when subject or message input loses focus)</small>
            </span>
          }
        />
      </Field>
    </div>
  );
}

export default Composer;
