import crypto, { BinaryLike } from "crypto";

const hashToken = (token: BinaryLike) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};

export default hashToken;
