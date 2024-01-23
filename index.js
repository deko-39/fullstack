const helloCat = (name) => {
  console.log(`Hello cat named ${name}`);
  return;
};

const helloDog = (name) => {
  console.log(`Hello dog named ${name}`);
  return;
};

// Refactor code - tinh giảm code cho gọn
// Function factory

const helloFactory = (kind) => {
  if (kind === "cat") return helloCat;
  if (kind === "dog") return helloDog;
};

// helloCat("kitty");
// helloDog("pug");

helloFactory("cat")("kitty");
helloFactory("dog")("pug");

// Generic function, High order function
