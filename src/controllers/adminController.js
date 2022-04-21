import bcrypt from 'bcrypt';
import collections from '../database/MongoDB.js';

const adminCollection = collections.admin;

const secretToken = 'cncshopsecret';

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      res.status(400).send('Please fill in both username, password and email');
      throw new Error('Please fill in both username, password and email');
    }

    const userExists = await adminCollection.findOne({ email });
    if (userExists) {
      res.status(400).send('User already exists');
      throw new Error('User already exists');
    }

    // ENCRYPTION
    // generate salt
    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);

    await adminCollection.insertOne({
      username,
      password: encryptedPwd,
      email,
    });

    const user = await adminCollection.findOne({ email });
    if (user) {
      res.status(201).json({
        id: user._id,
        user: user.username,
        email: user.email,
      });
    } else {
      res.status(500).send('Something went wrong');
      throw new Error('Something went wrong');
    }
  } catch (err) {
    console.log(err);
  }
};

const getAdmin = async (req, res) => {
  try {
    const { email, secret } = req.body;
    if (email && secret === secretToken) {
      const user = await adminCollection.findOne({ email });
      if (user) {
        res.status(200).json({
          id: user._id,
          user: user.username,
          email: user.email,
        });
      }
    } else {
      res.status(401).send('Not authorized');
      throw new Error('Not authorized');
    }
  } catch (err) {
    console.log(err.message);
  }
  res.end();
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await adminCollection.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ secret: secretToken });
  } else {
    res.status(400).send('Bad request');
  }
};

export { addUser, getAdmin, loginAdmin };
