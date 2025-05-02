import React from "react";
import { Lock } from "lucide-react";
import Logo from "../../icons/Logo";

// Type definition for FooterColumn props
interface FooterColumnProps {
  title: string;
  items: {
    label: string;
    active?: boolean;
  }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="flex flex-col justify-start items-start gap-5 min-w-[150px]">
    <div className="text-white text-base font-medium font-['Poppins']">
      {title}
    </div>
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`text-sm font-normal font-['Poppins'] leading-tight ${
            item.active ? "text-white" : "text-neutral-400"
          }`}
        >
          {item.label}
        </div>
      ))}
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 flex flex-col gap-14 px-6 sm:px-10 lg:px-28 pt-14">
      {/* Brand and contact */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-white text-3xl font-medium font-['Poppins'] leading-9">
            Ecobazar
          </div>
        </div>
        <p className="max-w-sm text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight">
          Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
          dui, eget bibendum magna congue nec.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="py-1.5 px-2 bg-zinc-900 shadow-[0px_1.5px_0px_0px_rgba(32,181,38,1.00)] text-white text-sm font-medium font-['Poppins']">
            (219) 555-0114
          </div>
          <span className="text-zinc-500 text-base font-normal font-['Poppins']">
            or
          </span>
          <div className="py-1.5 px-2 bg-zinc-900 shadow-[0px_1.5px_0px_0px_rgba(32,181,38,1.00)] text-white text-sm font-medium font-['Poppins']">
            Proxy@gmail.com
          </div>
        </div>
      </div>

      {/* Footer columns */}
      <div className="flex flex-wrap gap-x-10 gap-y-10">
        <FooterColumn
          title="My Account"
          items={[
            { label: "My Account" },
            { label: "Order History" },
            { label: "Shoping Cart", active: true },
            { label: "Wishlist" },
          ]}
        />
        <FooterColumn
          title="Helps"
          items={[
            { label: "Contact" },
            { label: "Faqs" },
            { label: "Terms & Condition" },
            { label: "Privacy Policy" },
          ]}
        />
        <FooterColumn
          title="Proxy"
          items={[
            { label: "About" },
            { label: "Shop" },
            { label: "Product" },
            { label: "Track Order" },
          ]}
        />
        <FooterColumn
          title="Categories"
          items={[
            { label: "Fruit & Vegetables" },
            { label: "Meat & Fish" },
            { label: "Bread & Bakery" },
            { label: "Beauty & Health" },
          ]}
        />
      </div>

      {/* Bottom bar */}
      <div className="w-full py-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-sm font-normal font-['Poppins'] text-center md:text-left">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-11 h-8 bg-zinc-900 rounded-md border border-zinc-800"
            />
          ))}
          <div className="w-16 h-8 bg-zinc-900 rounded-md border border-zinc-800" />
          <div className="flex items-center gap-1">
            <Lock className="text-white w-4 h-4" />
            <span className="text-white text-xs font-normal font-['Poppins']">
              Secure
            </span>
          </div>
          <div className="w-16 text-center text-white text-xs font-semibold font-['Poppins']">
            Payment
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
