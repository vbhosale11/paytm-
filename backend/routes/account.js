const { Account } = require("../db");
const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    if (!account) {
        return res.status(403).json({
            msg: "Account not found."
        })
    }
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const transferTo = req.body.to;
    const amount = req.body.amount;

    try {
        const session= await mongoose.startSession();
        session.startTransaction();
        const {amount, to} = req.body;

        const accountFrom = await Account.findOne({
            userId: req.userId
        }).session(session);
        
        if(!accountFrom || accountFrom.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Insufficient balance."
            })
        }

        const accountTo = await Account.findOne({
            userId:to
        }).session(session);

        if(!accountTo){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Invalid recipient."
            })
        }

        await Account.updateOne({
            userId:req.userId
        },{
            $inc:{
                balance:-amount
            }
        }).session(session);

        await Account.updateOne({
            userId:to
        },{
            $inc:{
                balance:amount
            }
        }).session(session);

        await session.commitTransaction();
        res.json({
            msg:"Transfer successful."
        });
    }
    catch(err){
        session.abortTransaction();
        return res.status(400).json({
            msg:"Transfer failed."
        })
    }
})

module.exports = router;
