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

მომხარებლის წაშლა --> http://localhost:3000/api/profile/deleteAccount
```json
{
    "userId": "6694077988408a5f3be1c01b"
}
```
იმისათვის რომ ეს მოთხოვნა შესრულდეს უნდა იყოთ დალოგინებული 

ასე რომ ავტორიზაციის დროს თქვენ უნდა წამოიღოთ response.data.token
და ასევე მომხარებლის ID response.data._id

როგორ გავაკეთო ეს ? 

```js
const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk0MDc3OTg4NDA4YTVmM2JlMWMwMWIiLCJpYXQiOjE3MjA5NzkzNDAsImV4cCI6MTcyODc1NTM0MH0.QjuxQvbXwy4qcb-NGM-__ux7k1px8rIqFg1QIa-wjv0'; // ეს უნდა შეიცვალოს მომხარებლის ტოკენად

const userId = '6694077988408a5f3be1c01b'; // ეს უნდა შეიცვალოს მომხარებლის აიდად 

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  },
  params: {
    userId: userId
  }
};

axios.delete('http://localhost:3000/api/profile/deleteAccount', config)
  .then(response => {
    console.log('Response data:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```
სახელის შეცვლა --> http://localhost:3000/api/profile/changeName
```json
{
    "userId": "6694f8e2cc37affaaf9eb6e9",
    "newName": "NewName"
}
```

როგორ გავაკეთო ეს ? 

```js
const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk0ZjhlMmNjMzdhZmZhYWY5ZWI2ZTkiLCJpYXQiOjE3MjEwMzkwNzQsImV4cCI6MTcyODgxNTA3NH0.f8iqaBNGef6vZ8y2UTcuXbJahIOITS4ZfSgtmcA_BEg';

axios.post('http://localhost:3000/api/profile/changeName', { newName: 'New Name', userId: '6694f8e2cc37affaaf9eb6e9' }, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log(response.data); 
})
.catch(error => {
  console.error('Error:', error.response.data); 
});
```

მეილის შეცვლა --> http://localhost:3000/api/profile/changeEmail

```json
{
    "currentPassword": "12345",
    "newEmail": "testerrr@gmail.com",
    "userId": "6694f8e2cc37affaaf9eb6e9"
}
```

როგორ გავაკეთო ეს ? 

```js
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njk0ZjhlMmNjMzdhZmZhYWY5ZWI2ZTkiLCJpYXQiOjE3MjEwMzkwNzQsImV4cCI6MTcyODgxNTA3NH0.f8iqaBNGef6vZ8y2UTcuXbJahIOITS4ZfSgtmcA_BEg';

axios.post(
  'http://localhost:3000/api/profile/changeEmail',
  {
    newEmail: 'newemail@example.com',
    currentPassword: 'currentPassword',
    userId: '6694f8e2cc37affaaf9eb6e9' 
  },
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
)
.then(response => {
  console.log(response.data); 
})
.catch(error => {
  console.error('Error:', error.response.data); 
});


