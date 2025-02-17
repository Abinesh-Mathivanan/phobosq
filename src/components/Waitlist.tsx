import React, { useState } from "react";

const WaitlistForm: React.FC = () => {
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJoined(true);
  };

  if (joined) {
    return <p className="text-lg font-semibold">Joined</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-r-md"
      >
        Join Waitlist
      </button>
    </form>
  );
};

export default WaitlistForm;
