exports.pr = function () {
    //const p1 = Promise.resolve(21);
    const p1 = new Promise((resolve, reject) => { 
      setTimeout(() => {
        resolve('email sent to user1');
      }, 5000);
    });
    const p2 = "123";
    const p3 = new Promise((resolve, reject) => { 
      setTimeout(() => {
        resolve('saved user1 in db');
      }, 1000);
    });
  
    return Promise.all([p3, p2, p1]).then(values => {
      return { values };
    });
  }