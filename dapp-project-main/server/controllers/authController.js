const User = require('./../models/user')
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError')
// const { promisify } = require('util');
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user
        }
    })
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //check if the email and password exits
        if (!email || !password) {
            return next(new AppError("Please provide an email and password", 400))
        }

        //check if the user exits && and password is correct
        const user = await User.findOne({ email }).select('+password')

        if (user.emailVerified === false) {
            return res.status(500).json({ error: "Email is not verified" });
        }

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401))
        }

        //If everything is ok, send token to client 
        createSendToken(user, 201, res)


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({ status: 'Successfully Logged Out' })
}

exports.protect = async (req, res, next) => {
    try {
        let token

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }

        else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }
        if (!token) {
            return next(
                new AppError("You are not logged in!! Please Log in", 401)
            )
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const freshUser = await User.findById(decoded.id)
        if (!freshUser) {
            return next(
                new AppError("The user belonging to this token no longer exits", 401)
            )
        }
        req.user = freshUser
        // Grant access to protected route
        next()
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        const link = `localhost:4002/studentVault/v1/users/reset-password/${oldUser._id}/${token}`;
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

