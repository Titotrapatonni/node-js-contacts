// const argv = require("yargs").argv;
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      return console.log(list);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
    default:
      return console.log("Unknown action type!");
  }
};
invokeAction(argv);

console.log("====================================");
console.log(process.argv);
console.log("====================================");
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({
//   action: "add",
//   name: "tito",
//   email: "tito123@gmail.com",
//   phone: "1231233",
// });
// invokeAction({ action: "remove", id: "xBnVHey9Y7E4WnfYQrxnm" });
