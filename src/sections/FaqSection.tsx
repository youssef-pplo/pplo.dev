import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Who is Youssef Elsaid?',
    answer:
      'Youssef Elsaid, widely recognized online as pplo, is a software engineer and artificial intelligence architect based in Alexandria, Egypt. With over 10 years of programming experience since 2016, Youssef specializes in Python, machine learning, deep learning, Arabic NLP, and scalable full-stack web development.',
  },
  {
    question: 'What AI and software development services does Youssef Elsaid provide?',
    answer:
      'Youssef provides bespoke AI model architecture, LLM agent integration, computer vision pipelines, high-throughput backend engineering, database optimization, and interactive 3D web application development using Three.js and WebGL.',
  },
  {
    question: 'What is A3rbly and how does it utilize AI?',
    answer:
      "A3rbly is an AI-powered natural language processing system for automated Arabic grammatical syntax analysis (I'rab). Built by Youssef Elsaid following 4 years of dedicated research and development, it analyzes complex classical and modern Arabic sentences with high precision.",
  },
  {
    question: 'How many years of programming experience does Youssef Elsaid have?',
    answer:
      'Youssef Elsaid has over 10 years of hands-on software development experience. Having started coding at age 8, he has mastered more than 30 programming languages including Python, TypeScript, JavaScript, C++, Go, Rust, and SQL.',
  },
  {
    question: 'How can I contact or hire Youssef Elsaid for AI engineering?',
    answer:
      'You can hire or contact Youssef Elsaid directly via email at youssefdev74@gmail.com, through WhatsApp at +201091734838, or by connecting through his GitHub profile at github.com/youssef-pplo.',
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="content-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-grid">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={`bento-card faq-card ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggleFaq(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFaq(index);
                }
              }}
              aria-expanded={isOpen}
            >
              <div className="faq-header">
                <h3 className="faq-question">{faq.question}</h3>
                <span className="faq-toggle-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              {isOpen && <p className="faq-answer">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
