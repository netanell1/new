const
    express = require("express"),
    app = express(),
    jws = require("jsonwebtoken"),
    secret = "1234"

const users = [{
    _id: "1223444",
    name: "avi",
    email: "a@a",
    pass: "1234"
}]

function createToken(id) {
    const token = jws.sign({ _id: id }, secret, { expiresIn: "15m" })
    return token
}

function authToken(token) {
    const decode = jws.verify(token, secret)
    const id = decode._id
    const foundUser = users.find(u => u._id == id)
    return foundUser
}

function login(email, pass) {
    const foundUser = users.find(u => u.email == email)
    if (!foundUser || foundUser.pass != pass) throw "not auth"
    const token = createToken(foundUser._id)
    return token
}

function log() {
    try {
        const token = login("a@a", "1234")
        const res = authToken(token)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

log()

app.listen(3210, () => console.log("server is up"))