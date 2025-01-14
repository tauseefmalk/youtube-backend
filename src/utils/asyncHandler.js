const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((error) => next(error));
  };
};

export { asyncHandler };





/*
const asyncHandler=()=>{}
const asyncHandler=(fnc) = () =>{}
const asyncHandler=(fnc) = async () =>{}


const asyncHandler = (fnc) = async (req, res, next) => {
    try {
        await fnc(req, res, next)
    } catch (error) {
        res.status(error.code|| 500).json({
            success: false,
            message: error.message
        })
    }
}

*/
