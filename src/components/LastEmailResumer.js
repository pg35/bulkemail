import React from "react";
import JsonRequest from "./JsonRequest";

class SavedEmailHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  renderJsonRequest() {
    return (
      <JsonRequest
        data={{ "mocky-delay": "500ms" }}
        baseUrl="https://www.mocky.io/v2/5d867c1d320000fab107b3f4"
        progressMessage="Checking status of last email operation"
        onSuccess={obj => {
          console.log(obj);
          if (obj.savedEmail){
            this.props.onSavedEmailFound(obj);
          }
        }}
        onComplete={() =>
          this.setState({
            loading: false
          })
        }
        validateResponse={json => !json.err}
      />
    );
  }

  renderResume(){
    const {postcode, sentCount, customersCount} = this.props.lastEmail;
    return (
      <div>
        Previously, email was sent to <Bold v={sentCount} /> out of{" "}
        <Bold v={customersCount} /> customers of postcode <Bold v={postcode} />.
        <br />
        Send email to remaining <Bold v={customersCount - sentCount} />{" "}
        cusomters or discard the saved email.
        <div>
          <button onClick={() => onDiscardLastEmail()}>Discard Saved Email</button>
          <button onClick={() => onDiscardLastEmail()}>Preview Saved Email</button>
        </div>
      </div>
    );
  }
  render() {
    const element =
    this.state.loading || this.props.refresh ? (
      this.renderJsonRequest()
    ) : (
      this.props.lastEmail ? this.renderResume() : <Link to="/compose">Compose Email</Link>
    
    }
    return <div>{element}</div>;
  }
}

export default LastEmailResumer;
