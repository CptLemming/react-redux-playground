export default {
  login(username, password, cb) {
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then((response) => {
        if (response.status >= 400) {
          const err = new Error("Bad response from server");
          if (cb) {
            cb(err);
            return err;
          }
          throw err;
        }

        return response.json();
      }).then((response) => {
        if (cb) {
          cb(null, response)
        } else {
          return response;
        }
      });
  },

  logout(userId, cb) {
    fetch('/api/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    }).then((response) => {
        if (response.status >= 400) {
          const err = new Error("Bad response from server");
          if (cb) {
            cb(err);
            return err;
          }
          throw err;
        }

        return response.json();
      }).then((response) => {
        if (cb) {
          cb(null, response)
        } else {
          return response;
        }
      });
  }
}
