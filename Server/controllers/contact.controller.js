import Contact from "../models/contact.model.js";



const handleContact = async (req, res) => {
    const { name, email, message } = req.body
    try {
        await Contact.create({ name, email, message });
        res.json({ message: "Message sent" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



export default handleContact