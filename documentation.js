require('dotenv').config();
const { Collection, Item, Header } = require('postman-collection');
const fs = require('fs');

const requestTests = `
    pm.test("Sample Test: test for successful response", ()=>{
        pm.expect(pm.response.code).to.equal(200)
    })
`;

const postmanCollection = new Collection({
    info: {
        name: 'My Collection',
    },
    item: []
});

const userRegister = new Item({
    name: 'User Register',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/register", 
        body : {
            mode : "raw",
            raw: JSON.stringify({
                "name": "Khana Zulfana Imam",
                "password": "281002"
            }),
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: "text/javascript",
                exec: requestTests,
            }

        }
    ]
});
const userLogin = new Item({
    name: 'User Login',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/login",
        body : {
            mode : "raw",
            raw: JSON.stringify({
                "name": "Khana Zulfana Imam",
                "password": "281002"
            }),
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: "text/javascript",
                exec: requestTests,
            }
        }
    ]
});
// user biodata
const userBiodata = new Item({
    name: 'User Biodata',
    request: {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/biodata",
        auth: {
            type: 'bearer',
            bearer: [
                {
                    key: 'token',
                    value: '{{token}}',
                    type: 'string'
                }
            ]
        }
    },
    events: [
        {
            listen: 'test',
            script: {
                type: "text/javascript",
                exec: requestTests,
            }
        }
    ]
});
const userBiodataCreate = new Item({
    name: 'User Biodata Create',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Authorization': '{{token}}'
        },
        url: process.env.BASE_URL + "/biodata",
        body : {
            mode: "raw",
            raw: JSON.stringify({
                "nama": "Khana Zulfana Imam",
                "email": "Khana@gmail.com",
                "phone_number": "081234567890"
            }),
        },
    }
});
const userBiodataUpdate = new Item({
    name: 'Update Biodata',
    request: {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/biodata",
        body : {
            mode: "raw",
            raw: JSON.stringify({
                "nama": "Khana Zulfana Imam",
                "email": "Khana@gmail.com",
                "phone_number": "081234567890"
            }),
        },
    }
});
// question
const question = new Item({
    name: 'Question',
    request: {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/question",
    }
});
const questionCreate = new Item({
    name: 'Question Create',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/question",
        body : {
            mode: "raw",
            raw: JSON.stringify({
                "question": "Apakah kamu suka makan?",
                "value": 10
            }),
        },
    }
});

// answer
const answer = new Item({
    name: 'Answer',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        url: process.env.BASE_URL + "/answer",
        body : {
            mode: "raw",
            raw: JSON.stringify({
                "questions_id": 1,
                "choice": "Benar",
                "status": 1
            }),
        },
    }
});

// user Histories
const userHistories = new Item({
    name: 'User Histories',
    request: {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Authorization' : '{{token}}'
        },
        body: {
            mode: "raw",
            raw: JSON.stringify({
                "high_score": "100",
                "current_score": "80"
            }),
        },
        url: process.env.BASE_URL + '/histories',
        events: [
            {
                listen: 'test',
                script: {
                    type: 'text/javascript',
                    exec: requestTests,
                }
            }
        ]
    }
});
// user 

postmanCollection.items.add(userRegister);
postmanCollection.items.add(userLogin);
postmanCollection.items.add(userBiodataCreate);
postmanCollection.items.add(userBiodataUpdate);
postmanCollection.items.add(userHistories);
postmanCollection.items.add(userBiodata);
postmanCollection.items.add(question);
postmanCollection.items.add(questionCreate);


const collectionJSON = postmanCollection.toJSON();
fs.writeFile('./collection.json', JSON.stringify(collectionJSON), (err) => {
    if(err) {
        console.log('file saved')
    }
})