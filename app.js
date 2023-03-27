const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");
const { json } = require("body-parser")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {

    const firstName = req.body.fName
    const lastName = req.body.lNamez
    const email = req.body.email


    client.setConfig({
        apiKey: "ed27661f2601fc9f85d140d8d8889791-us17",
        server: "us17",
    });

    const run = async () => {
        const response = await client.lists.batchListMembers("c828849ac1", {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName}
            }],
        });
        if (response.error_count < 1){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
    };

    run();
    
})

app.post("/failure", function(req, res){
    res.redirect("/")
})


//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     }

//     const jsonData = JSON.stringify(data)

//     const url = "https://us17.api.mailchimp.com/3.0/lists/c828849ac1/members?skip_merge_validation=false"

//     const options = {'
//         method: "POST",
//         auth: "cleyrol1:ed27661f2601fc9f85d140d8d8889791-us17"
//     }

//     const request = https.request(url, options, function (response) {
//         response.on("data", function (data) {
//             console.log(JSON.parse(data))
//         })

//         request.write(jsonData)
//         request.end()
//     })
// })



app.listen(process.env.PORT || 3000, function () {
    console.log("Working on port 3000")
})

// Api Key
// ed27661f2601fc9f85d140d8d8889791-us17

// List ID
// c828849ac1