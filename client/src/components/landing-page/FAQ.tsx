import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqs = [
    {
        question: "What is Docten?",
        answer: "Docten is a comprehensive platform designed to help doctors manage their practice efficiently.",
    },
    {
        question: "How can I subscribe to a plan?",
        answer: "You can subscribe to a plan by visiting our subscription page and choosing the plan that best suits your needs.",
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes, we have free (forever) option for doctors trying out our application. You can sign up and try out the features before committing to a subscription.",
    },
    {
        question: "Can I change my subscription plan later?",
        answer: "Absolutely! You can upgrade or downgrade your subscription plan at any time from your account settings.",
    },
    {
        question: "How do I contact support?",
        answer: "You can contact our support team by clicking on the 'Contact Us' button on our website or by emailing support@docten.com.",
    },
];

const FAQ = () => {
    return (
        <div className="flex flex-col items-center py-12 bg-gray-100">
            <h2 className="text-3xl font-bold mb-8">
                Frequently Asked Questions
            </h2>
            <Accordion selectionMode="multiple" className="w-full max-w-4xl">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        title={faq.question}
                        className="mb-6"
                    >
                        <p className="text-gray-600">{faq.answer}</p>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQ;
