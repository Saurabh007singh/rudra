import {
  aboutUs,
  festivalOptions,
  filterOptions,
  Help,
  QuickLinks,
  WeAccept,
} from "@/config/const ";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function Footer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-8 gap-1 items-center lg:items-start bg-[#F7F4ED] h-auto">
      <div className="mb-8">
        <img src="/images/rudra.png" alt="Logo" className="h-16 w-auto" />
      </div>

      <div className="flex flex-col w-full  gap-8 lg:flex-row lg:gap-4">
        <div className="flex flex-col gap-7 items-center w-full lg:w-[34%]">
          <span className="font-semibold mt-6">Stay In Touch</span>
          <span className="text-slate-600 mt-5">
            Sign up for exclusive offers, original stories, events, and more
          </span>
          <span>Register Here</span>
          <Separator className="h-0.5 my-4" />
          <span className="font-semibold">Contact Us</span>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex items-center gap-2">
              <Mail className="text-[#9B733E]" />
              <span>info@rudra.com</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/+919810300847"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 text-[#9B733E]"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-6 h-6 text-[#9B733E]" />
              </a>
              <span>+91 9810300847</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full lg:w-[16%] ">
          <div className="flex flex-col gap-2  ">
            <span className="mt-5 font-semibold text-slate-600">
              Top Categories
            </span>
            <div className="flex flex-col gap-4 mt-2">
              {filterOptions.map((items) => (
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(items.path)}
                  key={items.id}
                >
                  <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                    {items.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-[100%] lg:hidden  mt-[-20px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-arial">
              <span className="font-semibold text-slate-600 text-[16px] ">
                Top Categories
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[15px] font-arial">
              <div className="flex flex-col gap-2 w-full lg:w-[16%] ">
                <div className="flex flex-col gap-4 mt-2">
                  {filterOptions.map((items) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(items.path)}
                      key={items.id}
                    >
                      <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                        {items.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="hidden lg:block w-full lg:w-[16%]">
          <div className="flex flex-col gap-2 ">
            <span className="mt-5 font-semibold text-slate-600">
              Festival Specials
            </span>
            <div className="flex flex-col gap-4 mt-2">
              {festivalOptions.map((items) => (
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(items.path)}
                  key={items.id}
                >
                  <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                    {items.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-[100%] lg:hidden  mt-[-20px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-arial">
              <span className="font-semibold text-slate-600 text-[16px] ">
                Festival Specials
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[15px] font-arial">
              <div className="flex flex-col gap-2 w-full lg:w-[16%]">
                <div className="flex flex-col gap-4 mt-2">
                  {festivalOptions.map((items) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(items.path)}
                      key={items.id}
                    >
                      <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                        {items.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="hidden lg:block w-full lg:w-[16%]">
          <div className="flex flex-col gap-2 ">
            <span className="mt-5 font-semibold text-slate-600">About Us</span>
            <div className="flex flex-col gap-4 mt-2">
              {aboutUs.map((items) => (
                <div className="cursor-pointer" key={items.id}>
                  <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                    {items.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-[100%] lg:hidden  mt-[-20px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-arial">
              <span className="font-semibold text-slate-600 text-[16px] ">
                About Us
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[15px] font-arial">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-4 mt-2">
                  {aboutUs.map((items) => (
                    <div className="cursor-pointer" key={items.id}>
                      <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                        {items.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="hidden lg:block w-full lg:w-[16%]">
          <div className="flex flex-col gap-2 ">
            <span className="mt-5 font-semibold text-slate-600">
              Quick Links
            </span>
            <div className="flex flex-col gap-4 mt-2">
              {QuickLinks.map((items) => (
                <div className="cursor-pointer" key={items.id}>
                  <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                    {items.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-[100%] lg:hidden  mt-[-20px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-arial">
              <span className="font-semibold text-slate-600 text-[16px] ">
                Quick Links
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[15px] font-arial">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-4 mt-2">
                  {QuickLinks.map((items) => (
                    <div className="cursor-pointer" key={items.id}>
                      <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                        {items.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="hidden lg:block w-full lg:w-[16%]">
          <div className="flex flex-col gap-2 ">
            <span className="mt-5 font-semibold text-slate-600">Help</span>
            <div className="flex flex-col gap-4 mt-2">
              {Help.map((items) => (
                <div className="cursor-pointer" key={items.id}>
                  <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                    {items.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-[100%] lg:hidden mt-[-20px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-arial">
              <span className="font-semibold text-slate-600 text-[16px] ">
                Help
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-[15px] font-arial">
              <div className="flex flex-col gap-2 ">
                <div className="flex flex-col gap-4 mt-2">
                  {Help.map((items) => (
                    <div className="cursor-pointer" key={items.id}>
                      <span className="text-slate-600 mt-1 hover:text-[#9A713A]">
                        {items.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* We Accept Section */}
      <div className="flex flex-row gap-2 items-center mt-8 ml-auto">
        <span>We Accept</span>
        {WeAccept.map((items) => (
          <img
            key={items.id}
            src={`/images/${items.id}.svg`}
            alt={items.id}
            className="w-12 h-12"
          />
        ))}
        <span>and more...</span>
      </div>

      {/* Separator */}
      <Separator className="h-0.5 " />

      {/* Footer Bottom */}
      <div className="mx-auto h-2">
        <span className="mx-auto text-center text-slate-600">
          Rudra Industries Private Limited © 2025
        </span>
      </div>
    </div>
  );
}
