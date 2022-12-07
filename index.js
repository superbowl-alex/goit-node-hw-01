const contactsOperations = require("./contacts");

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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await contactsOperations.listContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error);
      } finally {
        break;
      }

    case "get":
      try {
        const contact = await contactsOperations.getContactById(id);
        if (!contact) {
          throw new Error(`Contact with id=${id} not found`);
        }
        console.table(contact);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    case "add":
      try {
        const newContact = await contactsOperations.addContact(
          name,
          email,
          phone
        );
        console.table(newContact);
      } catch (error) {
        console.log(error);
      } finally {
        break;
      }

    case "remove":
      try {
        const removeContact = await contactsOperations.removeContact(id);
        if (!removeContact) {
          throw new Error(`Contact with id=${id} not found`);
        }
        console.table(removeContact);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
  await invokeAction(argv);
})();
