import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  UserModel from "../models/User.js";
import AccountModel from "../models/Account.js";

const SECRET_KEY = "secret";

export const register = async (req, res) => {
    try {
        const { name, email, password, avatar, gender } = req.body;
    
        // Kiểm tra nếu email đã tồn tại trong UserModel
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered." });
        }
    
        // Tạo User mới
        const newUser = new UserModel({
          name,
          email,
          avatar,
          gender,
        });
        const savedUser = await newUser.save();
    
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Tạo Account mới liên kết với User
        const newAccount = new AccountModel({
          username: savedUser._id, // Gắn ObjectId của User
          password: hashedPassword,
        });
        await newAccount.save();
    
        res.status(201).json({ message: "User registered successfully." });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
      }
};
  
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Tìm User qua email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Username or password is incorrect." });
      }
  
      // Tìm tài khoản liên quan
      const account = await AccountModel.findOne({ username: user._id });
      if (!account) {
        return res.status(404).json({ message: "Account not found." });
      }
  
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Username or password is incorrect." });
      }
  
      // Tạo JWT token
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
  
      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          gender: user.gender,
        },
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
  };
  

export const verifyToken = (req, res, next) => {
    // Lấy token từ Authorization Header
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      // Tách token từ Bearer token
      const token = authHeader.split(' ')[1]; // "Bearer <token>"
  
      // Kiểm tra token bằng jwt.verify
      jwt.verify(token, "SECRET_KEY", (err, decoded) => {
        if (err) {
          // Nếu token không hợp lệ, trả về lỗi 403
          return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
  
        // Lưu thông tin giải mã của token vào request để sử dụng tiếp
        req.user = decoded;
        
        // Tiếp tục thực thi middleware tiếp theo
        next();
      });
    } else {
      // Nếu không có token trong header, trả về lỗi 401
      res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  };
  
 