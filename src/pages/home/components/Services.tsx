import Shipping from "../../../icons/Shipping";
import Support from "../../../icons/Support";
import Payment from "../../../icons/Payment";
import MoneyBack from "../../../icons/MoneyBack";

const Services = () => {
  return (
    <div className="max-w-[1320px] w-full mx-auto p-4 sm:p-6 lg:p-10 bg-white rounded-lg shadow-[0px_8px_40px_0px_rgba(0,38,3,0.08)]">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-8">
        {/* Service Item */}
        <div className="flex flex-1 min-w-[250px] gap-4">
          <Shipping />
          <div className="flex flex-col justify-center">
            <div className="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
              Free Shipping
            </div>
            <div className="text-neutral-400 text-sm font-normal font-['Poppins'] leading-tight">
              Free shipping on all your order
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-w-[250px] gap-4">
          <Support />
          <div className="flex flex-col justify-center">
            <div className="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
              Customer Support 24/7
            </div>
            <div className="text-neutral-400 text-sm font-normal font-['Poppins'] leading-tight">
              Instant access to Support
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-w-[250px] gap-4">
          <Payment />
          <div className="flex flex-col justify-center">
            <div className="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
              100% Secure Payment
            </div>
            <div className="text-neutral-400 text-sm font-normal font-['Poppins'] leading-tight">
              We ensure your money is save
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-w-[250px] gap-4">
          <MoneyBack />
          <div className="flex flex-col justify-center">
            <div className="text-zinc-900 text-base font-semibold font-['Poppins'] leading-tight">
              Money-Back Guarantee
            </div>
            <div className="text-neutral-400 text-sm font-normal font-['Poppins'] leading-tight">
              30 Days Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
