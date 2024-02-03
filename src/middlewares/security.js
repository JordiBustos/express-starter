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
