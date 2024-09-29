const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer")

const User = require("../model/User");

/*router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    throw new Error(error);
  }
});*/

/*router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User not Found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials!" });
      } else {
        // Generate JWT token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
});    */


const storage = multer.diskStorage({
  destination:  function (req, file, cb)  {
    cb(null,"public/uploads/") // store uploaded file in upload folder
  },
  filename: function(req, file, cb){
    cb(null, file.originalname) //  store file with original name

  }
})

const upload = multer({ storage })



// user registration
router.post("/registar", upload.single('profileImage'), async (req, res) => {
  try {
    //reg. form info take
    const { firstName, lastName, email, password } = req.body;
   
    // upload file as req.file
    const profileImage = req.file;
  
    if(!profileImage){
      return res.status(400).send("No Image Uploaded!")
    }

    // check if user exests
    const existingUser = await User.findOne({ email })
    if(existingUser){
      return res.status(409.).json({ message : "user already exists!"})
    }

    // has  password

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //create new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password : hashedPassword,
      profileImagePath,
    });

    //save new user
    await newUser.save()

    //send message to register
    res.status(200).json({message : " registered successyfull", user: newUser})
  }catch (err) {
    console.log(err)
    res.status(500).json({ message : "rregister failed!", errer: err.message})
  }
})


module.exports = router;
