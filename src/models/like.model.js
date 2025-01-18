import mongoose, { Schema, Types } from "mongoose";

const likeSchema = new Schema({
    comment:{
        Types: Schema.Types.ObjectId,
        ref: "Comment",
    },
    video:{
        Types: Schema.Types.ObjectId,
        ref: "Video",
    },
    likedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tweet:{
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    }
},{timestamps:true})

export const Like = mongoose.model("Like", likeSchema)