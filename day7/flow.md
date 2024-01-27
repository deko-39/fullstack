/register - Đăng ký

người dùng input email + password
-> {email: email, password: encode(password)}
-> lưu vào cơ sở dữ liệu

{
email: "mindx@gmail.com",
password: "lfkalkboarwi@3134"
}

/login - Đăng nhập

người dùng input email + password
-> payload {email: email, password: encode(password)}
-> so sánh với password + email trong cơ sở dữ liệu
-> pass (xác thực)

người dùng input email + password
-> payload {email: email, password: decode(password)}
-> so sánh với password + email người dùng gửi lên
-> pass (xác thực)
