export const AuthMiddleWare = async (req, res, next) => {
  try {
    const AuthToken = req.headers.authorization;

    if (!AuthToken || !AuthToken.startsWith("Bearer ")) {
      ThrowError("Токен не знайдено", 401);
    }

    if (!SECRET_KEY) {
      ThrowError("SECRET_KEY не налаштовано", 500);
    }

    const token = AuthToken.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(error.statusCode || 401).json({
      message: error.message,
    });
  }
};