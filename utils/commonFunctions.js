// common function for async and try, catch
// this is a higher order function
// which takes an async function as it's parameter and return an async function

export const catchAsync=(fn)=>{
 return (req,res,next)=>{
  Promise.resolve(fn(req,res,next)).catch((err)=>
    res.status(400).json({ message: err.message })
     )
  }
}

