// routes/example.router.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Items = require('../models/Items');
const Checkout = require('../models/Checkout'); 


router.get('/', (req, res) => {
    res.send('Hello from the example route');
});

// Lấy toàn bộ thông tin người dùng 
router.get('/user', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Lấy thông tin người dùng theo ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// Xóa người dùng theo ID
router.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Kiểm tra xem user có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Thực hiện xóa user
        await User.findByIdAndDelete(userId);

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// Cập nhật dữ liệu cho user theo ID sử dụng PATCH
router.patch('/user/:id/updateData', async (req, res) => {
    try {
        const userId = req.params.id;

        // Kiểm tra xem user có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Cập nhật dữ liệu cho user
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// Thêm middleware để xử lý dữ liệu JSON từ body của request
router.use(express.json());

router.post('/user', async (req, res) => {
    console.log(req.body);
    res.send("Server received data!");
});

// ------------------------------------------------------------------------------------------------------------
//Thêm người dùng
router.post('/addUser', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Kiểm tra tài khoản đã tồn tại hay chưa
        const existingUser = await User.findOne({
            name: name,
            email: email,
            phone: phone,
            password: password
        });

        if (!existingUser) {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.json({ message: 'Đăng ký thành công.' })
        } else {
            res.json({ message: 'Email đăng ký tài khoản đã tồn tại. Vui lòng nhập email khác!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Kiểm tra thông tin đăng nhập người dùng
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng dựa trên email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            res.json({ message: 'Email hoặc mật khẩu không đúng.' });
        } else {
            res.json({ message: 'Đăng nhập thành công.' });
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Quên mật khẩu (nhập email để lấy lại mật khẩu)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Tìm người dùng dựa trên email
        const user = await User.findOne({ email });

        if (!user) {
            // Email không được tìm thấy, thông báo email chưa được đăng ký
            return res.status(400).json({ message: 'Email chưa đăng ký. Vui lòng nhập email khác hoặc đăng ký tài khoản.' });
        }

        // Email hợp lệ, thông báo email hợp lệ
        res.json({ message: 'Email hợp lệ.' });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Đổi mật khẩu người dùng
router.post('/changePassword', async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Kiểm tra xem tên người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Không tìm thấy tài khoản.' });
        }

        if (newPassword === confirmPassword) {
            // Cập nhật mật khẩu
            user.password = newPassword;
            await user.save();

            res.json({ message: 'Đổi mật khẩu thành công.' });
        } else {
            res.json({ message: '' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Thêm sản phẩm mới sử dụng POST
router.post('/addItem', async (req, res) => {
    try {
        const { name, size, price, quantity, imageSrc } = req.body; 

        // Kiểm tra sản phẩm đã tồn tại hay chưa
        const existingItem = await Items.findOne({ size });

        if (!existingItem) {
            const newItem = new Items({ name, size, price, quantity, imageSrc }); 
            const savedItem = await newItem.save();
            res.json({ message: 'Sản phẩm đã được thêm thành công.' });
        } else {
            res.json({ message: 'Sản phẩm đã tồn tại. Vui lòng chọn size khác!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy thông tin sản phẩm từ DB và render vào table
router.get('/getCartItems', async (req, res) => {
    try {
        // Lấy danh sách sản phẩm từ MongoDB
        const cartItems = await Items.find({});

        // Render template với dữ liệu đã lấy
        res.render('cart', { cartItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Lấy tất cả sản phẩm từ DB
router.get('/getAllItems', async (req, res) => {
    try {
        const allItems = await Items.find({});
        res.json(allItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


router.post('x', async (req, res) => {
    try {
      const { quantities } = req.body;
  
      // Duyệt qua mảng quantities và cập nhật số lượng cho từng sản phẩm
      for (const { itemId, newQuantity } of quantities) {
        const updatedItem = await Items.findByIdAndUpdate(
          itemId,
          { quantity: newQuantity },
          { new: true }
        );
  
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!updatedItem) {
          return res.status(404).json({ message: `Không tìm thấy sản phẩm với id ${itemId}` });
        }
      }
  
      res.json({ message: 'Cập nhật số lượng thành công.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
