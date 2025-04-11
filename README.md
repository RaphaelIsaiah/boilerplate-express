# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges start at [FreeCodeCamp Backend Course](https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/meet-the-node-console).

---

## Notes

- During the development process, it is important to be able to check what’s going on in your code.
- Node is just a **JavaScript environment**. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see console output in a terminal. By reading the output in the terminal, you can see any errors that may occur. The server must be restarted after making changes to its files.

---

### Debugging with Console

- **Node outputs console logs** to the terminal.
- Check for **errors in the terminal** after making code changes.

---

### Restarting the Server

- Use **`Ctrl + C`** to stop the server.
- Restart the server with either:
  - `node mainEntryFile.js`
  - `npm run` (if you have a script in `package.json`).

---

### Auto-Restarting on Save

- Add `"start": "node --watch server.js"` to your `package.json`.
- Or install **`nodemon`** for automatic restarts.

---

### Start a working express server

---

- The Express app object has several methods, one fundamental method is the `app.listen(port)`.
- Use `app.listen(port)` to tell your server to listen on a given port and put the server in a running state.
- For testing reasons, this method has been added to the `server.js` file already.
- Routes follow this structure: `app.METHOD(PATH, HANDLER)`, where:
  - `METHOD`: The HTTP method (e.g., `GET`, `POST`).
  - `PATH`: A relative path (e.g., `/` for the root).
  - `HANDLER`: A function called when the route is matched.
- Handlers take the form `function(req, res) {...}`, where `req` is the request object, and `res` is the response object. In the example of a handler below, the handler will serve the string 'Response String'.

```js
function(req, res) {
  res.send('Response String');
}
```

---

### Serve an HTML file

---

- Express allows you to respond to requests with a file using the `res.sendFile(path)` method. This method can be put inside the `app.get('/', ...)` route handler.

#### How `res.sendFile()` Works

1. Behind the scenes, `res.sendFile(path)`:

   - Sets the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type.
   - Then it will read and send the file to the client as a response.

2. **Absolute File Path Requirement**:
   - This method needs an absolute file path to locate the file.
   - It is recommended you to use the Node global variable `__dirname` to calculate the correct file path relative to the project directory like this:

```js
absolutePath = __dirname + "/relativePath/file.ext";
```

**Note**: `res.sendFile()` requires an absolute path to locate the file. Using `__dirname` ensures the file path is correct relative to your project directory.

---

### Serve Static Assets

---

- Static assets are files like **stylesheets**, **scripts**, and **images** that are essential for your application. These assets are typically stored in accessible directories on your server.

#### Using Express to Serve Static Files

- Use the `express.static(path)` middleware to serve these files.
- The path parameter specifies the absolute `path` to the folder containing your static assets.

```js
app.use(express.static(__dirname + "/public"));
```

- This serves all files located in the public folder as static assets.
- For example: `/style.css` will serve `style.css` from the `public` directory.

#### What Is Middleware?

Middleware in Express are functions that:

- **Intercept route handlers** to perform additional tasks or add information.
- Are applied or mounted using the `app.use()` method.

```js
app.use(path, middlewareFunction);
```

- **Key Points**:
  - The `path` argument is optional. If omitted, the middleware will apply or be executed to all requests.
  - Middleware like `express.static()` simplifies serving files seamlessly.

---

### Serve JSON on a Specific Route

---

- A **REST API** facilitates data exchange between the server and client. The **GET** method is commonly used to fetch information without modifying anything on the server.

#### Why JSON?

- **JSON (JavaScript Object Notation)** is the preferred data format for web applications.
- It represents JavaScript objects as strings for easy transmission across networks.

#### Creating a Simple API

To serve JSON data at a specific route, use the `app.get()` method combined with `res.json()`:

```js
app.get("/json", (req, res) => {
  res.json({ message: "Hello, JSON" });
});
```

##### How `res.json()` Works

1. `res.json()`:

   - Accepts a JavaScript object and converts it into a JSON string.
   - Sets headers to indicate the server is sending JSON data.
   - Sends the response back to the client.

2. Structure of a valid object:
   - Key-value pairs: `{key: data}`
   - `data` can be:
     - A number, string, nested object, or array.
     - A variable or function result, which is evaluated before being converted into JSON.

---

### Using the `.env` File for Environment Variables

---

The `.env` file is a hidden file used to pass environment variables to your application. It is private, accessible only to you, and ideal for storing sensitive data like:

- **API keys** from external services.
- **Database URIs**.
- **Configuration options** to modify application behavior without changing the code.

#### How to Use Environment Variables

- Access variables in your app using `process.env.VAR_NAME`.
- The `process.env` object is a global Node.js object where:
  - Variables are passed as **strings**.
  - Variable names are conventionally **uppercase** with words separated by underscores.
- The `dotenv` package is used to load environment variables from the `.env` file into `process.env`.

#### Important Notes

- **No spaces** around the equals sign when assigning values (e.g., `VAR_NAME=value`).
- **Quotes are not required** for names or values.
- Each variable definition is placed on a separate line in the `.env` file.
- At the top of the myApp.js file, add `require('dotenv').config()` to load the environment variables

---

### Implementing a Root-Level Request Logger Middleware

---

Middleware functions in Express are functions that process requests in the application’s request-response cycle. They take three arguments:

- `req`: The request object.
- `res`: The response object.
- `next`: A function that passes control to the next middleware in the stack.

#### Key Characteristics of Middleware

- Middleware can:
  - Execute custom code and potentially have side effects.
  - Add data to the `req` or `res` objects.
  - End the request-response cycle by sending a response when some condition is met.
  - Pass control to the next middleware by calling `next()`.
- Middleware is mounted using `app.use(middlewareFunction)` for root-level middleware.

```js
app.use((req, res, next) => {
  console.log("I'm a middleware...");
  next(); // Passes control to the next middleware/route handler
});
```

#### Mounting Middleware

- Root-level middleware executes for **all requests** unless conditions (like specific HTTP verbs) are specified.
- Middleware should be mounted **before all routes** to ensure they process requests globally.

#### Order of Execution

- Express processes middleware and routes in the **order they appear in the code**. Make sure to define middleware before specific routes to ensure proper execution.

---
