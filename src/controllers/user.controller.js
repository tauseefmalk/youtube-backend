import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloundinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res) => {
  // get user data from frontend
  // validations
  // check if user already exists: username , email
  // check for images , check for avatar
  // upload them to cloudinary,avatar
  // create user object -create entery in db
  // remove password and refresh token field from  response
  // check for user creation
  // return res

  const { username, email, password, fullName } = req.body;
  console.log("email", email);

  if (
    [username, email, password, fullName].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user already exists")
  }

  const avatarLocalPath = req.fields?.avatar[0]?.path
  const coverImageLocalPath = req.fields?.coverImage[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }
  const avatar = await uploadOnCloundinary(avatarLocalPath)
  const coverImage = await uploadOnCloundinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }
const user= await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  username: username.toLowerCase(),
  password
})

const createdUser= await User.findById(user._id).select(
  "-password -refreshToken"
)
if (!createdUser) {
  throw new ApiError(500, "something went wromg while registering a user")
}
return res.status(201).json(
  new ApiResponse(200, createdUser, "User registered successfully")
)

});

export { registerUser };
