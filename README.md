აქ არის ყველა Endpoint, სადაც უნდა გაუშვა ინფორმაცია:

მომხარებლის რეგისტრაცია --> http://localhost:3000/api/auth/signup
```json
{
  "email": "მეილი",
  "name": "სახელი",
  "password": "პაროლი"
}
```

როგორ გავაკეთო ეს
```js
const axios = require('axios');

const signupData = {
    email: "tester2@gmail.com",
    name: "tester",
    password: "tester"
};

axios.post('http://localhost:3000/api/auth/signup', signupData)
    .then(response => {
        console.log('Response data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

მომხარებლის ავტორიზაცია --> http://localhost:3000/api/auth/login
```json
{
  "email": "მეილი",
  "password": "პაროლი"
}
```

როგორ გავაკეთო ეს
```js
const axios = require('axios');

const loginData = {
    email: "tester2@gmail.com",
    password: "tester"
};

axios.post('http://localhost:3000/api/auth/login', loginData)
    .then(response => {
        console.log('Response data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```


