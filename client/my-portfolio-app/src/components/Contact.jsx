import "../styles/contact.css"
import {useState} from "react"
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";

function Contact (){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
     
        if(loading) return;

        if(name.trim().length < 3){
            toast.error("Name should be at least 3 characters long ");
            return;
        }

          const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!emailRegex.test(email)){
        toast.error("Please enter a valid email address");
        return;

     }

     if(message.trim().length < 10){
        toast.error("Message should be at least 10 characters long");
        return;

     }
        setLoading(true);

        const contactData = {
            name,
            email,
            message
        }
       try {
  const response = await fetch(
    `${API_BASE_URL}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    }
  );

  console.log("Status:", response.status);

  const data = await response.json();

  console.log("Response:", data);

  if (data.success) {
    toast.success("Message Sent Successfully");

    setName("");
    setEmail("");
    setMessage("");
  } else {
    toast.error(data.message);
  }

} catch (err) {
  console.log("Fetch Error:", err);
  toast.error("Something went wrong");
} finally {
  setLoading(false);
}

    }



    return (
        <section className="contact" id="contact">
            <h2>Contact Me</h2>
            <div className="contact-container">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input  type="text" placeholder="Your name" maxLength="50" value={name} onChange={(e)=>setName(e.target.value) }  required />
                    <input type="email" placeholder="Your email" maxLength="100" value={email} onChange={(e)=> setEmail(e.target.value)}  required />
                    <textarea
                    placeholder="Your message"
                    rows="6"
                    maxLength="500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    />

                        <p className="char-count">
                        {message.length}/500
                        </p>   
                   
                    <button type="submit" disabled ={loading}>{
                        loading ? " ⏳sending...": "send message"
                        }</button>
                </form>

            </div>

        </section>
    )
}


export default Contact;