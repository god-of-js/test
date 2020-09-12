import axios from "axios";
const format = (str = " ") => {
  str = str.toLowerCase();
  str = str.split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};
const formatText = (str = " ") => {
  str = str[0].toUpperCase() + str.slice(1);
  return str;
};
let Delete = (apiUrl, data, vueApp, callback = () => {}) => {
  let headers = vueApp.$store.state.user.config.headers;
  axios
    .delete(vueApp.$store.state.app.apiUrl + apiUrl, {
      data,
      headers
    })
    .then(result => {
      vueApp.$notify({
        group: "foo",
        title: "sucess",
        type: "sucess",
        text: result.data.message
      });
    })
    .catch(err => {
      console.log(err.response);
      vueApp.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: err.response.data.message
      });
    })
    .finally(() => {
      callback();
    });
};
const post = async (url, data, vueApp, callback = () => {}) => {
  await axios
    .post(
      vueApp.$store.state.app.apiUrl + url,
      data,
      vueApp.$store.state.user.config
    )
    .then(result => {
      vueApp.$notify({
        group: "foo",
        title: "sucess",
        type: "sucess",
        text: result.data.message
      });
    })
    .catch(err => {
      vueApp.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: err.response.data.message
      });
    })
    .finally(() => {
      callback();
    });
};
const put = async (url, data, vueApp, callback = () => {}) => {
  await axios
    .put(
      vueApp.$store.state.app.apiUrl + url,
      data,
      vueApp.$store.state.user.config
    )
    .then(result => {
      vueApp.$notify({
        group: "foo",
        title: "sucess",
        type: "sucess",
        text: result.data.message
      });
    })
    .catch(err => {
      vueApp.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: err.response.data.message
      });
    })
    .finally(() => {
      callback();
    });
};
const patch = async (url, data, vueApp, callback = () => {}) => {
  await axios
    .patch(
      vueApp.$store.state.app.apiUrl + url,
      data,
      vueApp.$store.state.user.config
    )
    .then(result => {
      vueApp.$notify({
        group: "foo",
        title: "sucess",
        type: "sucess",
        text: result.data.message
      });
    })
    .catch(err => {
      vueApp.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: err.response.data.message
      });
    })
    .finally(() => {
      callback();
    });
};
const get = (url, vueApp, config = null, external = false) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        external === false ? vueApp.$store.state.app.apiUrl + url : url,
        config === null ? vueApp.$store.state.user.config : config
      )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err.response.data.message);
        console.log(err.response);
        vueApp.$notify({
          group: "foo",
          title: "Access Denied",
          type: "error",
          text: err.response.data.message
        });
      });
  });
const imgCheck = file => {
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    return false;
  } else {
    return true;
  }
};
const pdfCheck = file => {
  if (file.type !== "application/pdf") {
    return false;
  } else {
    return true;
  }
};
const upload = (file, fileName, vueApp) => 
new Promise(resolve => {
  vueApp.$Firebase.storage
    .child(fileName)
    .put(file)
    .then(response => {
       resolve(response)
    }).catch(err => console.log(err.response));
});
let getImage = (child, vueApp) =>
  new Promise(resolve => {
    vueApp.$Firebase.storage
      .child(child)
      .getDownloadURL()
      .then(link => {
        resolve(link);
      })
      .catch(() => {});
  });
export {
  format,
  formatText,
  post,
  Delete,
  pdfCheck,
  imgCheck,
  get,
  put,
  patch,
  upload,
  getImage
};
