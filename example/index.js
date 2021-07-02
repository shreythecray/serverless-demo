module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = req.query.name
    let password = req.query.password
    var number = req.query.coffee

    var output

    if(password == "letmein") {
        output = "Access granted."
        //output "Access granted."
    } else {
        output = "Access denied."
        //output "Access denied."
    }
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            output
        }
    };
}