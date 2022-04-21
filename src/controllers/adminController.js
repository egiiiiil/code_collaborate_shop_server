import bcrypt from 'bcrypt';
import collections from '../database/MongoDB.js';
const adminCollection = collections.admin;

const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400);
      throw new Error('Please fill in both username & password');
    }
    // check if user exist in db
    const userExists = await adminCollection.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // ENCRYPTION
    // generate salt
    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);

    await adminCollection.insertOne({ username, password: encryptedPwd });

    const user = await adminCollection.findOne({ username });
    if (user) {
      res.status(201).json({
        id: user._id,
        user: user.username,
      });
    } else {
      res.status(500);
      throw new Error('Something went wrong');
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getAdmin = async (req, res) => {};

export { addUser };
