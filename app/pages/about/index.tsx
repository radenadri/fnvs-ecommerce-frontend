export default function About() {
  return (
    <section>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
        <div className="flex flex-col h-full">
          <p className="text-lg text-neutral-600 font-mono tracking-tight text-balance uppercase">
            About
          </p>
        </div>
        <div className="font-ibm-plex-mono py-2 lg:col-start-3 justify-end p-4">
          <p>
            Finvise is a take-home technical assessment project designed to
            simulate the core functionality of an web-based product listing from
            appliances and electronics to home decor. The goal of this project
            is to demonstrate proficiency in building scalable, user-friendly
            applications that align with real-world business requirements.
          </p>
          <br />
          <p>
            This project should showcase not only your technical capabilities,
            but also your attention to detail, product thinking, and
            understanding of modern development practices.
          </p>
        </div>
      </div>
    </section>
  );
}
