const Contact = require('../models/contactModel')
const nodemailer = require('nodemailer');
exports.getAllContact = async (req, res, next) => {
    try {
        const contact = await Contact.find()
        res.status(200).json({ data: contact, status: 'success' })
    } catch (error) {
        res.status(500).json({ error: err.message })

    }
}
exports.createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(200).json({ data: contact, status: 'success' })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

exports.SendContactReply = async (req, res) => {
    const { email, reply } = req.body;
    try {
        const emailReceived = await Contact.find({ email })
        if (!emailReceived) {
            return res.status(401).send("Contat Does Not Exits");
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailReceived[0].subject,
            text: reply
        };
        console.log(emailReceived._id)
        await Contact.updateOne(
            { _id: emailReceived[0]._id },
            {
                $set: {
                    replied: true,
                }
            }
        );
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ success: true, message: "Contact Reply Send Successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        res.status(200).json({ data: contact, status: 'success' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({ data: contact, status: 'success' })
    } catch (error) {
        res.status(500).json({ error: error.message })


    }
}

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({ data: contact, status: 'success' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

