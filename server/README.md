The server has 10 APIs: 6 GETs, 2 POSTs, 1 PUT and 1 DELETE.

# Node: Flow of the app
1. Use Api#7 to login or create new user if the username was not existed. Please randomize a new peerID for the user.
2. Api#5 is used to display all the file available with their information.
3. Use Api#8 to upload the information of a specific file from the device.
4. Use Api#6 to get the information of the file which user wants to download. This api can determine whether the owner is online or not.
5. Please use Api#9 to set the user to offline mode when he/she closes the application or logs out


# 1. Get all data
GET address + '/'.


# 2. Get all users' username
GET address + '/users'.
This will return a list "result" of usernames.
Return sample: 
{
    "result": [
        "chinhan1405",
        "ntnt111"
    ]
}


# 3. Get PeerID of a user via username
GET address + '/id/:username'.
Example:
GET 127.0.0.1:3000/id/ntnt111
Result: 
{
    "peerID": "123456789"
}
Exception: If user not found, return 
{
    "peerID": ""
}


# 4. Get all files of a user via username
GET address + '/userfiles/:username'.
Example:
GET 127.0.0.1:3000/userfiles/ntnt111
Result:
{
    "result": [
        {
            "fname": "file3",
            "lname": "http://google.com"
        },
        {
            "fname": "file4",
            "lname": "http://google.com"
        }
    ]
}
Exception: If user not found, return 
{
    "result" : "user not found"
}


# 5. Get all file of all users
GET address + '/files'
Example:
GET 127.0.0.1:3000/files
Result:
{
    "result": [
        {
            "username": "chinhan1405",
            "fname": "file1",
            "lname": "http://google.com"
        },
        {
            "username": "chinhan1405",
            "fname": "file2",
            "lname": "http://google.com"
        },
        {
            "username": "ntnt111",
            "fname": "file3",
            "lname": "http://google.com"
        },
        {
            "username": "ntnt111",
            "fname": "file4",
            "lname": "http://google.com"
        },
        {
            "username": "ntnt111",
            "fname": "lab1.pkt",
            "lname": "a/b/c/d/lab1.pkt"
        }
    ]
}


# 6. Get a specific file via file's name
GET address + '/file/:fname'.
Example:
GET 127.0.0.1:3000/file/code.js
Result:
{
    "result": {
        "name": "chinhan1405",
        "peerID": "lksadjfooiu298kmmv",
        "online": false,
        "file": {
            "fname": "code.js",
            "lname": "x/y/z/code.js"
        }
    }
}
Exception: If no file found, return
{
    "result": "file not found"
}


# 7. Create a new user - login
POST address + '/user'.
    Body:
    {
        "username" : "_____",
        "peerID" : "_____"
    }
Example:
POST 127.0.0.1:3000/user
    Body:
    {
        "username" : "HoangChiNhan",
        "peerID" : "lksadjfooiu298kmmv"
    }
result:
{
    "name": "HoangChiNhan",
    "peerID": "lksadjfooiu298kmmv",
    "online": true,
    "files": []
}
! This api will automatically set user to online mode.


# 8. Add a new file to a user
POST address + '/file'.
    Body:
    {
        "username" : "_____",
        "fname" : "_____",
        "lname" : "_____"
    }
Example:
POST 127.0.0.1:3000/file
    Body:
    {
        "username" : "ntnt111",
        "fname" : "lab1.pkt",
        "lname" : "a/b/c/d/lab1.pkt"
    }
Result:
{
    "result": {
        "name": "ntnt111",
        "file": {
            "fname": "lab1.pkt",
            "lname": "a/b/c/d/lab1.pkt"
        }
    }
}
Exception: If user not found, return
{
    "result": "user not found"
}


# 9. Put a user to offline mode
PUT address + '/offline/:username'
Example:
PUT 127.0.0.1:3000/offline/HoangChiNhan
Result:
{
    "name": "HoangChiNhan",
    "peerID": "lksadjfooiu298kmmv",
    "online": false,
    "files": []
}


# 10. Delete a user
DELETE address + '/user/:username'
Example:
DELETE 127.0.0.1:3000/user/HoangChiNhan
Result:
{
    "result": {
        "name": "HoangChiNhan",
        "peerID": "lksadjfooiu298kmmv",
        "online": false,
        "files": []
    }
}
Exception: If user not found, return 
{
    "result": "user not found"
}
