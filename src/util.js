export const plural = (c, p, s) => (c > 1 ? p : s);

//baseurl https://www.mocky.io/v2/
export const resources = {
  resumer: {
    pass: {
      hasLastEmail: "5d87715c340000c8370a14f7",
      noLastEmail: "5d87755434000021510a150e"
    }
  },
  quota: {
    pass: "5d857913320000410f07b267"
  },
  app: {
    /*{"err":0,"savedEmail":{"clientId":5894,"postcodes":[{"value":"BT13","label":"BT13"},{"value":"BT32","label":"BT32"},{"value":"BT17","label":"BT17"}],"subject":"first email","message":"first emial body","sentCount":52,"customerCount":100},"quota":{"limit":100,"used":55,"nextRenewal":"in 2 days"}}*/
    hasSavedEmail: "", //"5d8d155b2e0000fbcfabdec9",
    noSavedEmail: "5d87dc2034000094910a15c6"
  },
  delSavedEmail: {
    pass: "" //"5d87dc2034000094910a15c6" //same as nosavedemail b/c only {err:0} needed
  },
  progress: {
    pass: "" //"5d88d5113300003008d7dc0c"
  },
  sender: {
    pass: "" //"5d8aa2493500005c00d46a0d"
  },
  previewer: {
    pass: "" //"5d8e3f3c3100003e9f2b541e"
  },
  error: {
    code500: "5d87ec3a3300006e00d7d704",
    custom: "5d8bfa142e00005100abd65f"
  }
};
