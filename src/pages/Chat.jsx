import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import Input from "../components/Input";
import Logo from "../assets/openai.png";
import Navbar from "../components/Navbar";
import { BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import Button from "../components/ButtonBack";
function Chat() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAPI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `buatkan prompt untuk chatbot yang fokus menjawab mengenai Gadget store yang mana itu adalah e-commerce yang menjual khusus gadget seperti laptop, smartphone dan aksesoris. Dan juga chatbot jika ada yang bertanya mengenai product jawab saja ada 3 kategori yaitu laptop smartphone dan juga aksesoris : ${question}`,
        temperature: 0.5,
        max_tokens: 3000,
      });
      setAnswer(response?.data?.choices[0].text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Button />
      <div className="w-full h-screen flex flex-col items-center mt-20">
        <img src={Logo} alt="" width={70} className="mb-10" />
        <p className="w-72 font-bold text-3xl mb-3 text-center">
          Q&A with <span className="text-green-600">GadgetStore</span>
        </p>
        <div className="bottom-52 w-72 mb-4 flex items-center">
          <Input
            type="text"
            placeholder="Tanya disini..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 rounded-md shadow-md bg-white"
          />
        </div>
        <button
          id="ask"
          onClick={handleAsk}
          className="w-72 hover:bg-green-900 focus:outline-none border-none h-8 mx-auto bg-green-600 rounded-md text-white font-semibold flex justify-center items-center text-lg shadow-xl"
        >
          {loading ? (
            <FaSpinner size={15} className="animate-spin gap-x-3" />
          ) : (
            <BsFillSendFill />
          )}
        </button>
        <div className="w-72 mt-4">
          <textarea
            value={`Jawaban: ${answer}`}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-40 p-2 rounded-md shadow-md bg-white focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
