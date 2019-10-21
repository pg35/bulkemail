import React from "react";

class EmailPreview extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.count !== nextProps.count;
  }

  resizeIframe = e => {
    const iframe = e.target;
    let height = iframe.contentWindow.document.body.scrollHeight;
    height = Math.max(150, height);
    iframe.height = height + "px";
  };

  render() {
    return (
      <div className="mesblkml-emailpreview">
        <div className="mesblkml-title">{this.props.title}</div>
        <iframe
          title="text"
          srcDoc={this.props.html}
          onLoad={this.resizeIframe}
        >
          <p>Your browser does not support iframes</p>
        </iframe>
      </div>
    );
  }
}

export default EmailPreview;
