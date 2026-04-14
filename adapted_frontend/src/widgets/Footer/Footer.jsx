function Footer() {
  return (
    <footer className="bg-[#2a1d18] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-serif mb-2">AdaptEd.</h2>
          <p className="text-sm opacity-80">
            Transforming business English education with customizable courses for teams.
          </p>
        </div>

        <div>
          <h3 className="text-yellow-400 mb-3">Quick Links</h3>
          <p>Home</p>
          <p>Courses</p>
          <p>Pricing</p>
          <p>Log In</p>
        </div>

        <div>
          <h3 className="text-yellow-400 mb-3">Contact</h3>
          <p>ishimbar11@gmail.com</p>
          <p>adapted.kg</p>
          <p>+996 508 603 600</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;