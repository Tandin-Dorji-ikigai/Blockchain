const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const promisify = require('util').promisify
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer');
// const signToken = (id)=>{
//     return jwt.sign({id}, process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRES_IN,
//     )}
// }

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookiesOption = {
        expiresIn: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true
    }
    res.cookie('jwt', token, cookiesOption)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}


exports.signup = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.photo = req.file.filename
        }
        const newUser = await User.create(req.body)
        createSendToken(newUser, 201, res)
        req.id = newUser._id
        const link = `http://localhost:4001/api/v1/users/verifiyEmail/${newUser._id}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Confirm your email by clicking the link. The link will expire in 24 hour',
            text: link
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.driverSignup = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.photo = req.file.filename
        }
        const newUser = await User.create(req.body)
        req.id = newUser._id
        const link = `http://localhost:4001/api/v1/users/verifiyEmail/${newUser._id}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Confirm your email by clicking the link. The link will expire in 24 hour',
            text: link
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.getEmail = async (req, res) => {
    const { id } = req.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.send("User Does Not Exist");
    }
    try {
        res.render("verifiyEmail", { email: oldUser.email, status: "Not Verified" });
    } catch (err) {
        res.send("Not Verified");
    }
};

exports.verifyEmail = async (req, res) => {
    const { id } = req.params;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.send("User Does Not Exist");
    }
    await User.updateOne(
        { _id: id },
        {
            $set: {
                emailVerified: true,
            },
        }
    );
    res.render("verifiyEmail", { email: oldUser.email, status: "verified" });
};

exports.login = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            console.log("Either phone number or password is empty");
            return res.status(400).json({ error: "Phone number or password is empty" });
        }

        const user = await User.findOne({ phoneNumber }).select("+password");
        console.log(user);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        if (user.emailVerified === false) {
            return res.status(500).json({ error: "Email is not verified" });
        }

        const isCorrectPassword = await user.correctPassword(password, user.password);
        if (!isCorrectPassword) {
            console.log("Incorrect password");
            return res.status(401).json({ error: "Incorrect phone number or password" });
        }

        createSendToken(user, 200, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getDetailOfCookie = async (req, res, next) => {
    try {
        const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET)
        console.log(decoded)
        // 3) check if user still exits
        const freshUser = await User.findById(decoded.id)
        if (!freshUser) {
            console.log('the user belonging to this token no longer exist')
        }
        console.log(freshUser)
        //Grant access to protected route
        res.status(200).json({
            status: 'success',
            data: {
                freshUser
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.protect = async (req, res, next) => {
    try {
        //1) getting token and check of its there
        let token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]

        } else if (req.cookies.jwt) {
            token = req.cookies.jwt

        }
        if (!token) {
            console.log("you are not login! please log in to get access")
        }


        // 2) Verificatin token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log(decoded)


        // 3) check if user still exits
        const freshUser = await User.findById(decoded.id)
        if (!freshUser) {
            console.log('the user belonging to this token no longer exist')
        }
        //Grant access to protected route
        req.user = freshUser
        next()


    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(404).send("User Does Not Exist");
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
        const link = `http://localhost:4001/api/v1/users/reset-password/${oldUser._id}/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: oldUser.email,
            subject: 'Update Your Password by clicking on the given link',
            text: link
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({ success: true, message: "Reset password link sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    console.log(req.params)
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.send("User Doest Not Exists")
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret)
        res.render("index", { email: verify.email, status: "Not Verified" })
    } catch (err) {
        res.send("Not Verified")
    }
}
exports.updatePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, passwordConfirm } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.send("User Does Not Exist");
    }

    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);

        // Validate password and passwordConfirm
        if (password !== passwordConfirm) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.updateOne(
            { _id: id },
            {
                $set: {
                    password: hashedPassword,
                }
            }
        );

        res.render("index", { email: verify.email, status: "verified" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
