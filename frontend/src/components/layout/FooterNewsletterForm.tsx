'use client';

export default function FooterNewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic goes here
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email Address" 
        className="bg-white/10 border border-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-primary transition-colors w-full"
        required
      />
      <button 
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors w-full"
      >
        Subscribe
      </button>
    </form>
  );
}
