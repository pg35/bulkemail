import React from "react";

function MessageEditorWithPreview(props) {
  const resizeTextArea = e => {
    var el = e.target;
    setTimeout(function() {
      el.style.cssText = "height:auto; padding:0";
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }, 0);
  };

  const { message, formattedMessage, onChange, onBlur } = props;
  return (
    <div className="mesblkml-msgwrap">
      <div className="mesblkml-2cols">
        <div className="mesblkml-msgeditor">
          <div className="mesblkml-title">Message Editor</div>
          <textarea
            value={message}
            onChange={onChange}
            name="message"
            placeholder="Write Message"
            onKeyDown={resizeTextArea}
            onBlur={onBlur}
          />
        </div>
        <div className="mesblkml-msgpreview">
          <div className="mesblkml-title">Message Preview</div>
          <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        </div>
        <div className="mesblkml-msgpreview--mobile">
          Message Preview is hidden on Mobile. Please use Email Preview.
        </div>
      </div>
      <div className="mesblkml-msginfo">
        <small>
          <strong>Info</strong>
          <br />
          - Use [name] to insert customer billing name in the message e.g. Hi
          [name], ....
          <br />
          - Consecutive blank lines will be merged into single blank line in
          preview and email
          <br />- Do not add line break(s) between "&lt;" and "&gt;" of html tag
        </small>
      </div>
    </div>
  );
}
export default MessageEditorWithPreview;
