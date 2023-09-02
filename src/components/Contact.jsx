import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setLoading(true);
    emailjs
      .send(
        "service_im2fh8o",
        "template_dabjpw3",
        {
          from_name: form.name,
          to_name: "Mong",
          from_email: form.email,
          to_email: "maungmatubbar@gmail.com",
          message: form.message,
        },
        "qGMOE1kGoSpwN9Y6M"
      )
      .then(
        () => {
          setLoading(false),
            alert("Thank you. I will get back to you as soon as possible");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console(error);
          alert("Some thing went wrong");
        }
      );
  };
  return (
    <div
      className="xl:mt-12 xl:flex-row
  flex-col-reverse flex gap-10 overflow-hidden"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8
      rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          action=""
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-medium mb-4">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6
             placeholder:text-secondary
             text-white rounded-lg outline-none
             border-none fount-medium"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white font-medium mb-4">
              Your Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6
             placeholder:text-secondary
             text-white rounded-lg outline-none
             border-none fount-medium"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-white font-medium mb-4">
              Your Message
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
              value={form.message}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6
             placeholder:text-secondary
             text-white rounded-lg outline-none
             border-none fount-medium"
            />
          </div>
          <button
            type="submit"
            className="
          bg-tertiary py-3 px-8
          outline-none w-fit text-white 
          font-bold shadow-md shadow-primary
          rounded-xl"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
