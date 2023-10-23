const nodemailer = require('nodemailer');


const sendValidationEmail = async (name, email_to , link) => {
    
    let transporter = nodemailer.createTransport({
        
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth : {
            user: process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from: 'easyshop@team.com', // sender address
        to: email_to, // list of receivers
        subject: `Hello ${name}, Verify your account`, // Subject line
        html: `<a href="${link}">Verify account </a>`, // plain text body
    });

    return info
}


module.exports = {sendValidationEmail}