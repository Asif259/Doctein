import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is Doctein?",
        answer: "Doctein is a comprehensive healthcare management platform designed to help doctors and medical professionals manage their practice efficiently. It includes features for patient management, appointment scheduling, prescription management, and more.",
    },
    {
        question: "How can I subscribe to a plan?",
        answer: "You can subscribe to a plan by visiting our pricing page and choosing the plan that best suits your needs. All plans include a free trial period, and you can upgrade or downgrade at any time from your account settings.",
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes! We offer a free forever plan for individual practitioners, and our Standard and Professional plans include a 14-day free trial. You can sign up and try out all the features before committing to a subscription. No credit card required.",
    },
    {
        question: "Can I change my subscription plan later?",
        answer: "Absolutely! You can upgrade or downgrade your subscription plan at any time from your account settings. Changes take effect immediately, and we'll prorate any billing adjustments.",
    },
    {
        question: "How do I contact support?",
        answer: "You can contact our support team through multiple channels: click on the 'Contact Us' button on our website, email us at support@doctein.com, or use the in-app chat feature. Premium plan subscribers get priority support with phone and email access.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, absolutely. We use industry-standard encryption, comply with HIPAA regulations, and regularly conduct security audits. Your patient data is stored securely and only accessible to authorized users in your practice.",
    },
    {
        question: "Can I integrate Doctein with my existing systems?",
        answer: "Yes! Doctein integrates with 50+ healthcare platforms including major EHR systems, pharmacy networks, lab systems, and calendar applications. Check our integrations page for the full list.",
    },
];

const FAQ = () => {
    return (
        <div className="flex flex-col items-center py-20 max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                        FAQ
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                    <span className="text-primary">
                        Frequently Asked
                    </span>
                    <br />
                    <span className="text-gray-900">Questions</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Everything you need to know about Doctein. Can&apos;t find what you&apos;re looking for? 
                    Contact our support team.
                </p>
            </div>

            {/* Accordion */}
            <div className="w-full space-y-4">
                <Accordion 
                    selectionMode="multiple" 
                    className="gap-4"
                    itemClasses={{
                        base: "border border-gray-200 rounded-xl mb-4 bg-white hover:border-primary transition-colors",
                        title: "text-lg font-semibold text-gray-900 px-6 py-4",
                        trigger: "data-[hover=true]:bg-primary/10 rounded-xl",
                        content: "px-6 pb-4 text-gray-600 leading-relaxed",
                    }}
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            title={faq.question}
                            className="rounded-xl"
                        >
                            <p className="text-base leading-relaxed">{faq.answer}</p>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Additional CTA */}
            <div className="mt-12 text-center p-8 bg-primary/10 rounded-2xl border border-primary/20 w-full">
                <p className="text-lg text-gray-700 mb-4">
                    Still have questions? We&apos;re here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="mailto:support@doctein.com"
                        className="text-primary font-semibold hover:text-primary/80 underline"
                    >
                        support@doctein.com
                    </a>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <a
                        href="#"
                        className="text-primary font-semibold hover:text-primary/80 underline"
                    >
                        Contact Sales
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
