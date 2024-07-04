import { PythonShell } from "python-shell";
import fs from "fs";

function SocketConstructor(socket) {
  socket.on("periodFunction", (arg) => {
    let input = arg.input;
    let delay = arg.delay;
    let code = arg.functionCode;
    let code1 =
      "while True:\n" +
      "  command = input()\n" +
      "  if command == 'None':\n" +
      "     index = index + 1\n" +
      "     print(index)\n" +
      "  if command == 'addFive':\n" +
      "     index = index + 5\n" +
      "     print(index)\n" +
      "  if command == 'addTen':\n" +
      "     index = index + 10\n" +
      "     print(index)\n" +
      "  if command == 'stop':\n" +
      "     break\n";
    let data = arg.input;
    let interval = "";
    let command = "None";
    //input = { index: 0 };
    let index = 0;
    let options = {
      args: [code, JSON.stringify(input)],
    };
    console.log(options);
    /*
    let pyshell = new PythonShell(
      "./src/routers/translator/socket_test.py",
      options
    );*/

    let pyshell = new PythonShell(
      "./src/routers/translator/translator_stream.py",
      options
    );
    socket.on("commandFunction", (arg1) => {
      let commandInputs = arg1.inputsForCommand;
      if (arg1.command == "None") {
        if (interval != "") clearInterval(interval);
        pyshell.send(arg1.command);
        interval = setInterval(function () {
          pyshell.send("None");
        }, delay); //delay
      } else if (arg1.command == "stop") {
        
        pyshell.send("stop");
        clearInterval(interval);
        pyshell.end(function (err, code2, signal) {
          //if (err) throw err;
          console.log("the exit error was: " + err);
          console.log("The exit code was: " + code2);
          console.log("The exit signal was: " + signal);
          console.log("finished");
        }); 
      } else {
        clearInterval(interval);
        //console.log(arg1.command)
        pyshell.send(arg1.command);
        if (commandInputs != []) {
          for (let i = 0; i < commandInputs.length; i++) {
            // console.log("комманда: -", commandInputs[i]);
            pyshell.send(commandInputs[i]);
          }
        }
        interval = setInterval(function () {
          pyshell.send("None");
        }, delay);
      }
    });
    socket.on("disconnect", function () {
      pyshell.send("stop");
      clearInterval(interval);
      pyshell.end(function (err, code2, signal) {
        //if (err) throw err;
        console.log("the exit error was: " + err);
        console.log("The exit code was: " + code2);
        console.log("The exit signal was: " + signal);
        console.log("finished");
      });
    });
    pyshell.on("message", function (message) {
      //console.log("Выходные данные", message);
      socket.emit("commandFunction", message);
    });
  });
  /*
  socket.on("disconnect", function () {
    console.log("user disconnected");
  }); */
}

export default {
  SocketConstructor,
};
