const nodemailer = require('nodemailer');


const sendValidationEmail = async (name, email_to , link) => {
    
    let transporter = nodemailer.createTransport({
        
        host: 'localhost',
        port: 1025,
        
        // host: "smtp-relay.brevo.com",
        // port: 587,
        // secure: false,
        // auth : {
        //     user: 'noemito211@gmail.com',
        //     pass : 'afwHSF6rj93hR7pb'
        // }
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