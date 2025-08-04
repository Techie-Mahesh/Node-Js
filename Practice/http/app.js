const http = require("http");

const server = http.createServer((request, response) => {
  let url = request.url;
  let method = request.method;

  response.setHeader("Content-Type", "text/html");

  if (url === "/") {
    response.write(`
            <body>
            <h1>WELCOME TO THE HOME PAGE</h1>
            <form action='/create-user' method='POST' >
            <input type='text' name='username'>
            <button type='submit'>Submit</button>
            </input>
            </form>
            </body>
            `);
    return response.end();
  }

  if (method === "POST" && url === "/create-user") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      let parsedBody = Buffer.concat(body).toString();
      parsedBody = parsedBody.split("=")[1];
      response.write(`
              <body>
              <h1>User Created</h1>
              <p>Username: ${parsedBody}</p>
              <a href="/">Go back to Home</a>
              </body>
              `);
      console.log(parsedBody);
      return response.end();
    });

    // Navigate to home page
    /*  request.on("end", () => {
      let parsedBody = Buffer.concat(body).toString();
      parsedBody = parsedBody.split("=")[1];
      console.log(parsedBody);
      response.statusCode = 302;
      response.setHeader("Location", "/");
      return response.end();
    }); */

    return;
  }

  if (url === "/users") {
    response.write(`
            <ul>
                <li>USER_1</li>
                <li>USER_2</li>
                <li>USER_3</li>
                <li>USER_4</li>
            </ul>
            `);

    return response.end();
  }
  response.write(`
            <h1>Nothing to see here!!!!</h1>
            `);

  return response.end();
});

server.listen(4000);
