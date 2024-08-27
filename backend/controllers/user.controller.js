export const signOut = async(req,res,next)=>{
    try {
        res.clearCookie('access_token').status(200).json('User have been signed out');
    } catch (error) {
        next(error);
    }
};