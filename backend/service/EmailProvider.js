const nodemailer = require('nodemailer');


const sendValidationEmail = async (email_to, name, link) => {
    
    let transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
       // secure: false, // true for 465, false for other ports
    });

    let info = await transporter.sendMail({
        from: 'team@easyshop.com', // sender address
        to: email_to, // list of receivers
        subject: `Hello ${name}, Verify your account`, // Subject line
        html: `<a href=${link}>Verify account </a>`, // plain text body
    });

    return info
}

// const init = async () =>{
//     const info = await sendValidationEmail().catch(console.error)
//     console.log(info)
// }

// init()
module.exports = {sendValidationEmail}