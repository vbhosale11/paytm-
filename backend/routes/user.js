const jwt = require("jsonwebtoken");
const { User } = require("../db");
const zod = require("zod");
const {JWT_SECRET} = require("../config");
const express = require("express");
const router = express.Router();
const {Account}= require("../db");

const userNameCheck = zod.string().email();
const firstNameCheck = zod.string().min(2, { message: 'First name must be at least 2 characters long' });
const lastNameCheck = zod.string().min(2, { message: 'Last name must be at least 2 characters long' });
const passwordCheck = zod.string().min(6, { message: 'Password must be at least 6 characters long' });

const userSignUpCheck = zod.object({
    userName: userNameCheck,
    firstName: firstNameCheck,
    lastName: lastNameCheck,
    password: passwordCheck
});

router.post("/signup", async (req, res) => {
    const { success } = userSignUpCheck.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Invalid input"
        })
    }
    const existingUser = await User.findOne({
        userName: req.body.userName
    })

    if (existingUser) {
        return res.status(411).json({
            msg: "User already exists."
        })
    }

    const user = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        msg: "User created successfully.",
        token: token
    })
})

const userSignInCheck = zod.object({
    userName: userNameCheck,
    password: passwordCheck
});

router.post("/signin", async (req, res) => {
    const { success } = userSignInCheck.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Invalid input"
        })
    }

    const username = req.body.userName;
    const password = req.body.password;
    const user = await User.findOne({
        userName: username,
        password: password
    })
    

    if (user) {
        const token = jwt.sign({ userId:user._id }, JWT_SECRET);
        res.json({
            msg: "User signed in successfully.",
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

const userUpdateCheck = zod.object({
    firstName: firstNameCheck.optional(),
    lastName: lastNameCheck.optional(),
    password: passwordCheck.optional()
})

router.put("/", async (req, res) => {
    const { success } = userUpdateCheck.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Error while updating information"
        })
    }
    await User.UpdateOne({
        _id: req.userId
    }, req.body);

    res.json({
        msg: "User information updated successfully."
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || " ";

    const users = await User.find({
        "$or": [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;