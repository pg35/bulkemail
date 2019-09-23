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
    /*{"err":0,"savedEmail":{"clientId":5894,"postcode":"abc","subject":"first email","message":"first emial body","sentCount":52, "customerCount": 100},"quota":{"limit":100,"used":55,"nextRenewal":"in 2 days"}}*/
    hasSavedEmail: "5d87e7a83300005e00d7d6ff",
    noSavedEmail: "5d87dc2034000094910a15c6"
  },
  delSavedEmail: {
    pass: "5d87dc2034000094910a15c6" //same as nosavedemail b/c only {err:0} needed
  },
  progress: {
    pass: "5d88d5113300003008d7dc0c"
  },
  error: {
    code500: "5d87ec3a3300006e00d7d704"
  }
};
