const User = require('../models/user')
const AppError = require('../utils/appError')
const multer = require('multer')
const fs = require('fs');
const nodemailer = require("nodemailer")
const path = require('path');
const multerStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../clients/public/images/user');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {

        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${req['_id']}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false)

    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single('photo')


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users, status: "success" })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                status: 'fail',
                message: errors.join('. '),
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {

        if (req.file) {
            req.body.photo = req.file.filename
        }
        const newUser = await User.create(req.body)
        req.id = newUser._id
        const link = `localhost:4002/studentVault/v1/users/verifiyEmail/${newUser._id}`;
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
            subject: 'Confirm your email by clicking the link. The link will expire in 24 hours',
            text: link + ' \n Your Password \n' + req.body.password
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({ data: newUser, status: "Success" });
    } catch (error) {

        if (req.file && req.file.filename) {
            const filename = req.file.filename;
            const uploadPath = path.join(__dirname, '../../clients/public/images/user');
            const filePath = `${uploadPath}/${filename}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });

        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                status: 'fail',
                message: errors.join('. '),
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

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


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: " Success" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                status: 'fail',
                message: errors.join('. '),
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        if (req.file) {
            const filename = user.photo;
            const uploadPath = path.join(__dirname, '../../clients/public/images/user');
            const filepath = `${uploadPath}/${filename}`;
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.photo = req.file.filename;
        }

        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                status: 'fail',
                message: errors.join('. '),
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        const filename = user.photo;
        const uploadPath = path.join(__dirname, '../../clients/public/images/user');
        const filePath = `${uploadPath}/${filename}`;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 'fail',
                    message: 'Unable to delete image file',
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: `User ${user.name} and image ${filename} have been deleted successfully`,
                });
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};