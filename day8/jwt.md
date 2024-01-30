/login -> client sẽ có | accessToken + refreshToken | (bộ token)

- accessToken expires sau 5 phút
- refreshToken expires sau 1 ngày
- sau khi cả refreshToken hết hạn thì phải đăng nhập lại

/me -> check accessToken
TH1: accessToken còn hạn

- tiến hành thực hiện request như bình thường

TH2: accessToken hết hạn
TH2.1: refreshToken còn hạn

- client tiến hành refresh access token để lấy bộ token mới
  TH2.2: refreshToken hết hạn
- client tiến hành cho user về màn đăng nhập để lấy bộ token mới

TH2.1 có thể bị thực thi 2 lần nếu không trả lại refreshToken mới
