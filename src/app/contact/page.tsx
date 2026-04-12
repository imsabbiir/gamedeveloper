/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import { useState } from "react";
import { RiMailFill, RiPhoneFill, RiArrowDownSLine, RiFacebookFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
const socials = [
  {name: "YouTube", icon: <RiYoutubeFill/>, link: "https://www.youtube.com/@CodeClickExplain"},
  {name: "Instagram", icon: <RiInstagramFill/> , link: "https://www.instagram.com/im.sabbir_"},
  {name: "Facebook", icon: <RiFacebookFill/>, link: "https://www.facebook.com/sabbirahammad.mridul"},
]
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
  });

  // Separate states for independent toggling
  const [isContactsOpen, setIsContactsOpen] = useState(true);
  const [isSocialsOpen, setIsSocialsOpen] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-y-auto lg:overflow-hidden font-mono text-[#607B96] bg-[#011627]">
      
      {/* 1. Sidebar - Independent Sections */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#1E2D3D] flex flex-col shrink-0">
        
        {/* Contacts Toggle */}
        <button 
          onClick={() => setIsContactsOpen(!isContactsOpen)}
          className="p-4 border-b border-[#1E2D3D] text-white flex items-center justify-between lg:justify-start gap-2 text-sm italic w-full"
        >
          <div className="flex items-center gap-2">
            <RiArrowDownSLine className={`transition-transform ${isContactsOpen ? "" : "-rotate-90"}`} /> 
            contacts
          </div>
        </button>

        {isContactsOpen && (
          <div className="p-4 space-y-2 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2"><RiMailFill /> user@gmail.com</div>
            <div className="flex items-center gap-2"><RiPhoneFill /> +3598246359</div>
          </div>
        )}

        {/* Socials Toggle */}
        <button 
          onClick={() => setIsSocialsOpen(!isSocialsOpen)}
          className="p-4 border-t border-b border-[#1E2D3D] text-white flex items-center justify-between lg:justify-start gap-2 text-sm italic w-full"
        >
          <div className="flex items-center gap-2">
            <RiArrowDownSLine className={`transition-transform ${isSocialsOpen ? "" : "-rotate-90"}`} /> 
            find-me-also-in
          </div>
        </button>

        {isSocialsOpen && (
          <div className="p-4 space-y-2 text-sm mb-4 lg:mb-0 animate-in fade-in slide-in-from-top-1 duration-200">
            {socials.map((social, index) => (
              <Link target="_" href={social?.link} key={index} className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                {social?.icon} {social?.name}
              </Link>
            ))}
          </div>
        )}
      </aside>

      {/* 2. Main Form Section */}
      <main className="flex-1 flex border-b lg:border-b-0 lg:border-r border-[#1E2D3D] p-4 lg:p-0">
        <div className="m-auto w-full max-w-md py-8 lg:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm">_name:</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#011221] border border-[#1E2D3D] rounded-lg p-3 text-white focus:border-[#607B96] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">_email:</label>
            <input 
              type="email" 
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#011221] border border-[#1E2D3D] rounded-lg p-3 text-white focus:border-[#607B96] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">_message:</label>
            <textarea 
              rows={4}
              placeholder="your message here..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#011221] border border-[#1E2D3D] rounded-lg p-3 text-white focus:border-[#607B96] outline-none resize-none"
            />
          </div>

          <button className="bg-[#1C2B3A] text-white px-4 py-2 rounded-lg text-xs hover:bg-[#263849] transition-colors">
            submit-message
          </button>
        </div>
      </main>

      {/* 3. Code Preview Section */}
      <section className="flex flex-1 bg-[#011627] p-6 lg:p-8 overflow-y-auto min-h-75">
        <div className="m-auto w-full max-w-lg">
          <div className="flex gap-4 md:gap-6 text-[13px] md:text-sm leading-relaxed overflow-x-auto">
            <div className="text-right opacity-30 select-none hidden sm:block">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="font-mono whitespace-pre-wrap break-all md:break-normal">
              <p><span className="text-[#C98BDF]">const</span> <span className="text-[#4D5BCE]">button</span> <span className="text-white">=</span> <span className="text-[#4D5BCE]">document</span>.<span className="text-[#4D5BCE]">querySelector</span>(<span className="text-[#FEA55F]">'#sendBtn'</span>);</p>
              <br className="hidden md:block" />
              <p><span className="text-[#C98BDF]">const</span> <span className="text-[#4D5BCE]">message</span> <span className="text-white">=</span> {"{"}</p>
              <p className="pl-4"><span className="text-[#4D5BCE]">name</span>: <span className="text-[#FEA55F]">"{formData.name}"</span>,</p>
              <p className="pl-4"><span className="text-[#4D5BCE]">email</span>: <span className="text-[#FEA55F]">"{formData.email}"</span>,</p>
              <p className="pl-4"><span className="text-[#4D5BCE]">message</span>: <span className="text-[#FEA55F]">"{formData.message}"</span>,</p>
              <p className="pl-4"><span className="text-[#4D5BCE]">date</span>: <span className="text-[#FEA55F]">"{formData.date}"</span></p>
              <p>{"}"}</p>
              <br className="hidden md:block" />
              <p><span className="text-[#4D5BCE]">button</span>.<span className="text-[#4D5BCE]">addEventListener</span>(<span className="text-[#FEA55F]">'click'</span>, () <span className="text-[#C98BDF]">{`=>`}</span> {"{"}</p>
              <p className="pl-4"><span className="text-[#4D5BCE]">form</span>.<span className="text-[#4D5BCE]">send</span>(<span className="text-[#4D5BCE]">message</span>);</p>
              <p>{"})"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}