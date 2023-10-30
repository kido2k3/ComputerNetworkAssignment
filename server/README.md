The server has 8 APIs: 5 GETs, 2 POSTs and 1 DELETE

# Note:
Any API that require a parameter of username or filename that does not exist will return an object of error.
Example:
{"error" : "user not found"}
{"error" : "file not found"}


# 1. Get all data
GET address + '/'.


# 2. Get all users' username
GET address + '/users'.
This will return a list of usernames.
Return sample: 
[
    "chinhan1405",
    "ntnt111"
]


# 3. Get PeerID of a user via username
GET address + '/id/:username'.
Example:
GET 127.0.0.1:3000/id/ntnt111
Result: 123456789


# 4. Get all files of a user via username
GET address + '/userfiles/:username'.
Example:
GET 127.0.0.1:3000/userfiles/ntnt111
Result:
[
    {
        "name": "file3",
        "path": "http://google.com"
    },
    {
        "name": "file4",
        "path": "http://google.com"
    }
]


# 5. Get a specific file via file's name
GET address + '/file/:filename'.
Example:
GET 127.0.0.1:3000/file/code.js
Result:
{
    "user": "chinhan1405",
    "peerID": "123456789",
    "file": {
        "name": "code.js",
        "path": "x/y/z/code.js"
    }
}


# 6. Create a new user
POST address + '/user'.
    Body:
    {
        "name" : "_____",
        "peerID" : "_____"
    }
Example:
POST 127.0.0.1:3000/user
    Body:
    {
        "name" : "HoangChiNhan",
        "peerID" : "sidfuw8flksjf"
    }
result:
{
    "name": "HoangChiNhan",
    "peerID": "sidfuw8flksjf",
    "files": []
}
! If the username is already existed, this will only reply the information of the that user.


# 7. Add a new file to a user
POST address + '/file'.
    Body:
    {
        "name" : "_____",
        "path" : "_____"
    }
Example:
POST 127.0.0.1:3000/file
    Body:
    {
        "name" : "HoangChiNhan",
        "path" : "course/cn/lab1.pkt"
    }
Result:
    {
        "name": "lab1.pkt",
        "path": "course/cn/lab1.pkt"
    }


# 8. Delete a user
DELETE address + '/user/:username'
Example:
DELETE 127.0.0.1:3000/user/HoangChiNhan
Result:
{
    "name": "HoangChiNhan",
    "peerID": "sidfuw8flksjf",
    "files": [
        {
            "name": "lab1.pkt",
            "path": "course/cn/lab1.pkt"
        }
    ]
}

