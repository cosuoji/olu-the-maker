import React from "react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content: `
Welcome to Olu The Maker. These Terms and Conditions govern your use of our website,
products, and services. By accessing or using our site, you agree to be bound by these
terms. If you do not agree, please do not use our services.
    `,
  },
  {
    title: "About Olu The Maker",
    content: `
Olu The Maker is a fashion and editorial brand operating in Nigeria, offering handcrafted
footwear, printed magazines, and written editorial content through our website.
    `,
  },
  {
    title: "User Accounts",
    content: `
You may be required to create an account to access certain features of our website.
You are responsible for maintaining the confidentiality of your account information
and for all activities that occur under your account.
    `,
  },
  {
    title: "Products & Services",
    content: `
We offer physical products including shoes and magazines, as well as digital editorial
content through our blog. All product descriptions and prices are subject to change
without notice.
    `,
  },
  {
    title: "Pricing & Payments",
    content: `
All prices are displayed in the applicable currency and may change at any time.
We reserve the right to correct pricing errors and cancel orders if necessary.
    `,
  },
  {
    title: "Shipping",
    content: `
Shipping timelines, fees, and policies are outlined on our Shipping Information page.
By placing an order, you agree to the shipping terms provided at checkout.
    `,
  },
  {
    title: "Returns & Refunds",
    content: `
Shoes may be eligible for returns subject to our return policy.
Magazines and printed editorial products are non-refundable.
Please refer to our Shipping & Returns page for full details.
    `,
  },
  {
    title: "Intellectual Property",
    content: `
All content on this website — including text, images, logos, designs, and editorial
material — is the intellectual property of Olu The Maker and may not be reproduced,
distributed, or used without written permission.
    `,
  },
  {
    title: "Editorial & Blog Content",
    content: `
All blog posts, articles, and editorial materials are provided for informational and
creative purposes only. Unauthorized reproduction or commercial use is prohibited.
    `,
  },
  {
    title: "Limitation of Liability",
    content: `
Olu The Maker shall not be liable for any indirect, incidental, or consequential damages
arising from the use of our website or products to the maximum extent permitted by law.
    `,
  },
  {
    title: "Third-Party Links",
    content: `
Our website may contain links to third-party websites. We are not responsible for the
content, policies, or practices of these external sites.
    `,
  },
  {
    title: "Changes to These Terms",
    content: `
We reserve the right to update or modify these Terms and Conditions at any time.
Changes will be effective upon posting on this page.
    `,
  },
  {
    title: "Governing Law",
    content: `
These Terms and Conditions are governed by and construed in accordance with the laws
of the Federal Republic of Nigeria.
    `,
  },
  {
    title: "Contact Information",
    content: `
If you have any questions about these Terms and Conditions, please contact us at
support@oluthemaker.com.
    `,
  },
];

const Terms = () => {
  return (
    <>
      <main className="bg-atelier-paper text-atelier-ink min-h-screen">
        {/* HEADER SECTION */}
        <section className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <span className="text-[10px] tracking-[0.4em] uppercase opacity-50 font-sans block mb-6">
            Legal Framework
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-8"
          >
            Terms <span className="not-italic">&</span> Conditions
          </motion.h1>

          <p className="font-serif text-xl text-atelier-ink/70 max-w-2xl leading-relaxed italic">
            Please review these protocols carefully. They govern the
            relationship between the Atelier and our global community.
          </p>

          <div className="h-[1px] w-full bg-atelier-ink/10 mt-16" />
        </section>

        {/* CONTENT SECTION */}
        <section className="max-w-4xl mx-auto px-6 pb-32">
          <div className="space-y-20">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-8"
              >
                {/* Section Indexing */}
                <div className="md:col-span-1">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold opacity-30">
                    Section {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Section Content */}
                <div className="md:col-span-3">
                  <h2 className="text-2xl font-serif text-atelier-ink mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="font-serif text-lg leading-relaxed text-atelier-ink/80 whitespace-pre-line">
                    {section.content.trim()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FOOTER NOTE */}
          <div className="mt-32 pt-12 border-t border-atelier-ink/10 text-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-40">
              Last Updated: March 2026 • Olú the Maker Atelier
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Terms;
