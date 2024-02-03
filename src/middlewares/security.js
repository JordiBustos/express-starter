/**
 * Validate the content type of all requests except GET ones to be application/json
 * @param {Express.Request} req - request object
 * @param {Express.Response} res - response object
 * @param {Function} next - next middleware function
 */
export function validateContentType(req, res, next) {
  if (req.method === "GET") return next();
  const expectedContentType = "application/json";

  if (!req.is("json")) {
    return res.status(415).send("Unsupported Media Type");
  }

  if (req.get("Content-Type") !== expectedContentType) {
    return res.status(415).send("Unsupported Media Type");
  }

  next();
}
