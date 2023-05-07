const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// const contacts = require("./db/contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const newContact = {
    id: nanoid(),
    ...data,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
