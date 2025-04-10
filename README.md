# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges start at [freeCodeCamp_Backend_Course](https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/meet-the-node-console)

## Notes

- During the development process, it is important to be able to check what’s going on in your code.
- Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see console output in a terminal. By reading the output in the terminal, you can see any errors that may occur. The server must be restarted after making changes to its files.
- You can stop the server from the terminal using `Ctrl + C` and start it using Node directly (`node mainEntryFile.js`) or using a run script in the `package.json` file with `npm run`.
- To implement server auto restarting on file save Node provides the `--watch flag` you can add to your start script `"start": "node --watch server.js"` or you can install an npm package like `nodemon`. We will leave this to you as an exercise.
