import http from "http";

import { users } from "./data.js";

const listStudent = [
  {
    id: 1,
    fullName: "Jackie",
    age: 5,
    class: "5A",
  },
  {
    id: 2,
    fullName: "Juli MTP",
    age: 5,
    class: "5A",
  },
  {
    id: 3,
    fullName: "Denis",
    age: 5,
    class: "5B",
  },
];
const app = http.createServer((request, response) => {
  const endpoint = request.url;
  // lấy phương thức được gửi lên từ request
  const method = request.method;

  switch (endpoint) {
    case "/":
      response.end(`Hello MindX`);
      break;
    case "/students":
      // kiểm tra request và xử lý logic tương ứng
      if (method === "GET") {
        // code...
        response.end(JSON.stringify(listStudent));
      }
      break;
    case "/users":
      response.end(JSON.stringify(users));
      break;
    case "/users/old":
      /// ???
      break;
    default:
      response.end(`404 Notfound`);
      break;
  }
});

app.listen(3000, () => {
  console.log("Server is running!");
});
