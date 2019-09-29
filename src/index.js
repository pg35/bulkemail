import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App";
import Quota from "./components/Quota";
import Composer from "./components/Composer";
import Navigation from "./components/Navigation";
import Progress from "./components/Progress";
import Sender from "./components/Sender";
import Field from "./components/Field";
import MySelect, {
  Option,
  MultiValue,
  ValueContainer,
  animatedComponents
} from "./components/MySelect.js";
import Highlight from "./components/Highlight";
const colourOptions = [
  { value: "ocean1", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" }
];
const delay = ms => cb => setTimeout(cb, ms);
const allPostcodes = [
  "BT1",
  "BT2",
  "BT3",
  "BT4",
  "BT5",
  "BT6",
  "BT7",
  "BT8",
  "BT9",
  "BT10",
  "BT11",
  "BT12",
  "BT13",
  "BT14",
  "BT15",
  "BT16",
  "BT17",
  "BT18",
  "BT19",
  "BT20",
  "BT21",
  "BT22",
  "BT23",
  "BT24",
  "BT25",
  "BT26",
  "BT27",
  "BT28",
  "BT32",
  "BT36",
  "BT37",
  "BT38",
  "BT61",
  "BT62",
  "BT63",
  "BT64",
  "BT65",
  "BT66",
  "BT67"
];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        postcodes: null,
        subject: "abc",
        message: "xad",
        dirty: false
      },
      stop: false,
      sentCount: 34,
      stopCount: 100,
      selected: null
    };
  }
  handleEmailDraftChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      email: { ...this.state.email, [name]: value }
    });
  };

  handlePostcodeChange = selected => {
    console.log(selected);
    this.setState({
      email: { ...this.state.email, postcodes: selected }
    });
    return;
    this.setState({
      email: { ...this.state.email, postcodes: selected.map(x => x.value) }
    });
  };

  render() {
    const optionsData = allPostcodes.map(postcode => ({
      value: postcode,
      label: postcode
    }));
    const selectedOptionsData =
      this.state.email.postcodes &&
      this.state.email.postcodes.map(postcode => ({
        value: postcode,
        label: postcode
      }));
    return (
      <div>
        <MySelect
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
          onChange={this.handlePostcodeChange}
          allowSelectAll={true}
          value={this.state.email.postcodes}
        />
      </div>
    );
    return (
      <div>
        <Composer
          {...this.state.email}
          onChange={this.handleEmailDraftChange}
          allPostcodes={allPostcodes}
          onPostcodeChange={this.handlePostcodeChange}
        />
        <button
          onClick={() =>
            this.setState(p => {
              return {
                email: { ...p.email, dirty: !p.email.dirty }
              };
            })
          }
        >
          {!this.state.email.dirty ? "dirty" : "undirty"}
        </button>
      </div>
    );
  }
}
function App2() {
  return (
    <App
      quota={{ limit: 100, used: 55, nextRenewal: "in" }}
      allPostcodes={allPostcodes}
    />
  );
}

const rootElement = document.getElementById("mesblkml");
ReactDOM.render(<Test />, rootElement);
