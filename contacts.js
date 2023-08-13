
const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const crypto = require("node:crypto");
// const {nanoid} = require("nanoid");
 


async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    
    return contacts.find(contact => {
        if (!contact.id) {
            return null;
        }
        return contact.id === contactId
    })

}
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
     
        return id === contactId
    });
    if (index === -1) {
        return null;
      }
    const [newContacts] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts; 
};

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
       id: crypto.randomUUID(),
        // id:nanoid(),
        name,
        email,
        phone,
        
    };

   contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null,2));
    return newContact;
    
};

module.exports={
    listContacts,getContactById,removeContact,addContact
}