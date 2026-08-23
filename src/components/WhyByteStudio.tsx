import React from "react";
import { MEETING_LINK } from "@/lib/config";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/ui/reveal";
import { Wordmark } from "@/components/ui/wordmark";

// Plain values only (no variants function) so this stays serializable across
// the Server -> Client props boundary into <Reveal>.
const featureTransition = (index: number) => ({
  duration: 1,
  delay: index * 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
});

const WhyByteStudio: React.FC = () => {
  return (
    <section
      className="relative text-white py-12 px-6 md:py-16 md:px-12 lg:py-20 lg:px-24 text-center"
      id="why-byte-studio"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <Reveal
          initial={{
            opacity: 0,
            scale: 0.9,
            translateZ: -50,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            translateZ: 0,
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Heading */}
          <Heading className="mb-6 md:mb-6">
            Why <Wordmark />?
          </Heading>

          {/* Subheading */}
          <Text
            variant="gray"
            className="mx-auto mb-10 md:mb-14 lg:mb-16 max-w-prose md:max-w-2xl"
          >
            Because your website should do more than look good - it should
            run part of your business.
            <br />
            Leads, registrations, and orders: managed, not just collected.
          </Text>
        </Reveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12 lg:gap-x-14 lg:gap-y-16 mb-10 md:mb-12 lg:mb-14">
          {/* Feature 1 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={featureTransition(0)}
          >
            <div className="flex items-start gap-3 mb-6 md:mb-8">
              <svg
                width="36"
                height="88"
                viewBox="0 0 36 88"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M18.5036 88V4.90286L26.9389 14.2057L1.50719 34.1943H0.5V14.08L18.8813 0H35.5V88H18.5036Z"
                  fill="url(#paint0_linear_1)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1"
                    x1="35.5"
                    y1="44"
                    x2="0.5"
                    y2="44"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  We Think With You
                </Heading>
                <Text variant="gray">not just code what you say</Text>
              </div>
            </div>
          </Reveal>

          {/* Feature 2 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={featureTransition(1)}
          >
            <div className="flex items-start gap-3 mb-7 md:mb-10">
              <svg
                width="48"
                height="88"
                viewBox="0 0 48 88"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M1.8 88V73.4972L31.44 46.2123C33.76 44.0819 35.6 42.0335 36.96 40.067C38.4 38.0186 39.44 36.0521 40.08 34.1676C40.8 32.2011 41.16 30.2756 41.16 28.3911C41.16 25.933 40.64 23.7616 39.6 21.8771C38.56 19.9925 37.12 18.5177 35.28 17.4525C33.44 16.3054 31.28 15.7318 28.8 15.7318C26 15.7318 23.6 16.4693 21.6 17.9441C19.6 19.3371 18.08 21.3855 17.04 24.0894C16 26.7114 15.48 29.8659 15.48 33.5531L14.16 33.7989L0 30.8492C0 24.8678 1.28 19.5829 3.84 14.9944C6.48 10.324 10 6.67784 14.4 4.05586C18.88 1.35195 23.88 0 29.4 0C34.84 0 39.64 1.27002 43.8 3.81005C48.04 6.35009 51.36 9.79143 53.76 14.1341C56.16 18.4767 57.36 23.3929 57.36 28.8827C57.36 31.9963 56.84 35.1099 55.8 38.2235C54.76 41.3371 53.08 44.5326 50.76 47.8101C48.44 51.0875 45.32 54.5289 41.4 58.1341L14.64 83.2067L11.28 72.2682H60V88H1.8Z"
                  fill="url(#paint0_linear_2)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2"
                    x1="60"
                    y1="44"
                    x2="0"
                    y2="44"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  Backend, Not Just Frontend
                </Heading>
                <Text variant="gray">
                  the dashboard to manage what comes in, built from day one
                </Text>
              </div>
            </div>
          </Reveal>

          {/* Feature 3 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={featureTransition(2)}
          >
            <div className="flex items-start gap-3 mb-6 md:mb-8">
              <svg
                width="51"
                height="88"
                viewBox="0 0 51 88"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M32.6161 88C26.3327 88 20.8346 86.7978 16.122 84.3934C11.4094 81.9891 7.64764 78.5829 4.83661 74.1749C2.10827 69.7668 0.496063 64.5173 0 58.4262L15.378 55.4208L16.7421 55.6612C16.7421 58.7869 17.3209 61.6321 18.4783 64.1967C19.7185 66.7614 21.4961 68.8051 23.811 70.3279C26.2087 71.8506 29.1437 72.612 32.6161 72.612C35.2618 72.612 37.5768 72.1311 39.561 71.1694C41.628 70.2076 43.2402 68.8452 44.3976 67.082C45.6378 65.3188 46.2579 63.235 46.2579 60.8306C46.2579 57.224 44.935 54.459 42.2894 52.5355C39.6437 50.5319 36.2126 49.5301 31.9961 49.5301H25.4232V35.5847H32.2441C35.6339 35.5847 38.4035 34.7031 40.5532 32.9399C42.7854 31.1767 43.9016 28.7322 43.9016 25.6066C43.9016 23.5228 43.3642 21.6794 42.2894 20.0765C41.2972 18.4736 39.8917 17.2313 38.0728 16.3497C36.3366 15.4681 34.311 15.0273 31.9961 15.0273C29.4331 15.0273 27.1181 15.6284 25.0512 16.8306C23.0669 17.9526 21.4134 19.5956 20.0906 21.7596C18.8504 23.8434 18.0236 26.2878 17.6102 29.0929L16.2461 29.3333L1.6122 26.4481C2.02559 21.7195 3.51378 17.3515 6.07677 13.3443C8.63976 9.33698 12.1122 6.13114 16.4941 3.72677C20.9587 1.24226 26.25 0 32.3681 0C37.6594 0 42.4134 1.00182 46.6299 3.00546C50.9291 5.00911 54.3189 7.77413 56.7992 11.3005C59.3622 14.827 60.6437 18.9144 60.6437 23.5628C60.6437 28.6922 58.9902 33.0601 55.6831 36.6667C52.4587 40.2732 48.2008 42.3971 42.9095 43.0382V40.5137C47.0433 40.5137 50.5984 41.5155 53.5748 43.5191C56.5512 45.4426 58.8661 48.0073 60.5197 51.2131C62.1732 54.4189 63 57.9454 63 61.7923C63 66.7614 61.7185 71.2495 59.1555 75.2568C56.5925 79.184 53.0374 82.3096 48.4902 84.6339C43.9429 86.878 38.6516 88 32.6161 88Z"
                  fill="url(#paint0_linear_3)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_3"
                    x1="63"
                    y1="44"
                    x2="0"
                    y2="44"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  Clean, scalable architecture
                </Heading>
                <Text variant="gray">
                  so you never have to rebuild from scratch
                </Text>
              </div>
            </div>
          </Reveal>

          {/* Feature 4 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={featureTransition(3)}
          >
            <div className="flex items-start gap-3 mb-6 md:mb-8">
              <svg
                width="50"
                height="84"
                viewBox="0 0 50 84"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M37.829 84V7.56L48.1784 11.88L11.0632 62.52L10.3494 51.72H64V67.08H0V52.32L38.4238 0H53.8885V84H37.829Z"
                  fill="url(#paint0_linear_4)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4"
                    x1="64"
                    y1="42"
                    x2="0"
                    y2="42"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  Direct Access to Who Builds It
                </Heading>
                <Text variant="gray">
                  no account managers, no handoffs - you talk to the person
                  writing the code
                </Text>
              </div>
            </div>
          </Reveal>

          {/* Feature 5 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={featureTransition(4)}
          >
            <div className="flex items-start gap-3 mb-6 md:mb-8">
              <svg
                width="46"
                height="86"
                viewBox="0 0 46 86"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M30.0838 86C24.7726 86 20.0559 84.959 15.9337 82.8771C11.8116 80.7952 8.36322 77.8724 5.58869 74.1089C2.89344 70.2654 1.03054 65.7812 0 60.6564L14.3879 57.6536L15.6959 57.8939C16.2508 59.9758 17.1228 62.0177 18.3119 64.0195C19.5802 65.9413 21.2053 67.5428 23.1871 68.824C25.2482 70.0251 27.666 70.6257 30.4405 70.6257C33.2151 70.6257 35.6725 70.0251 37.8129 68.824C40.0325 67.6229 41.7765 65.9413 43.0448 63.7793C44.3132 61.6173 44.9474 59.095 44.9474 56.2123C44.9474 53.73 44.3132 51.4479 43.0448 49.3659C41.8558 47.284 40.1514 45.6425 37.9318 44.4413C35.7914 43.1601 33.2151 42.5196 30.2027 42.5196C27.0318 42.5196 24.4159 43.2803 22.3548 44.8017C20.2937 46.243 18.3515 48.1648 16.5283 50.567L1.66472 47.5642L7.61014 0H56.0059V15.3743H13.9123L22.3548 6.00559L17.4795 42.7598L9.51267 43.7207C11.0981 40.838 12.961 38.1955 15.1014 35.7933C17.2417 33.311 19.7784 31.3091 22.7115 29.7877C25.7239 28.2663 29.1722 27.5056 33.0565 27.5056C38.13 27.5056 42.7674 28.7868 46.9688 31.3492C51.2495 33.8315 54.6582 37.2346 57.1949 41.5587C59.7316 45.8827 61 50.7672 61 56.2123C61 61.8175 59.692 66.9022 57.076 71.4665C54.5393 75.9506 50.9324 79.514 46.2554 82.1564C41.6576 84.7188 36.2671 86 30.0838 86Z"
                  fill="url(#paint0_linear_5)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5"
                    x1="61"
                    y1="43"
                    x2="0"
                    y2="43"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  Modern stack
                </Heading>
                <Text variant="gray">
                  Next.js, Express, PostgreSQL, Prisma
                </Text>
              </div>
            </div>
          </Reveal>

          {/* Feature 6 */}
          <Reveal
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={featureTransition(5)}
          >
            <div className="flex items-start gap-3 mb-6 md:mb-8">
              <svg
                width="51"
                height="89"
                viewBox="0 0 51 89"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M32.2951 88.5C25.4447 88.5 19.6136 86.6967 14.8019 83.0902C9.99029 79.4836 6.32039 74.3943 3.79223 67.8224C1.26408 61.2505 0 53.5164 0 44.6202C0 35.9645 1.34563 28.3106 4.03689 21.6585C6.72816 15.0064 10.5612 9.83698 15.5359 6.15027C20.5922 2.38342 26.5456 0.5 33.3961 0.5C38.534 0.5 43.1418 1.54189 47.2194 3.62568C51.2971 5.70947 54.6816 8.59472 57.3728 12.2814C60.1456 15.9681 62.0214 20.2158 63 25.0246L48.1981 28.0301L46.8524 27.7896C45.8738 24.5036 44.2427 21.6985 41.9592 19.3743C39.7573 17.0501 36.9437 15.888 33.5184 15.888C29.9301 15.888 26.7495 17.0902 23.9767 19.4945C21.2854 21.8188 19.2058 25.3051 17.7379 29.9536C16.2699 34.5219 15.5767 40.1721 15.6583 46.9044C15.6583 47.4654 15.6583 48.0665 15.6583 48.7076C15.7398 49.2687 15.7806 49.8698 15.7806 50.5109L10.3981 52.9153C11.2951 48.347 13.0078 44.5801 15.5359 41.6148C18.0641 38.5692 20.9592 36.3251 24.2214 34.8825C27.5651 33.4399 30.9087 32.7186 34.2524 32.7186C39.9612 32.7186 44.8951 33.9208 49.0544 36.3251C53.2136 38.7295 56.435 42.0155 58.7184 46.1831C61.0835 50.3506 62.266 55.0792 62.266 60.3689C62.266 65.8188 60.9612 70.6676 58.3515 74.9153C55.8233 79.163 52.3165 82.4891 47.8311 84.8934C43.3456 87.2978 38.167 88.5 32.2951 88.5ZM32.4175 73.112C35.1087 73.112 37.433 72.5911 39.3903 71.5492C41.4291 70.4271 42.9786 68.9444 44.0388 67.1011C45.1806 65.1776 45.7515 63.0137 45.7515 60.6093C45.7515 58.1248 45.1806 55.9608 44.0388 54.1175C42.9786 52.2741 41.4291 50.8315 39.3903 49.7896C37.3515 48.6676 34.9864 48.1066 32.2951 48.1066C29.6039 48.1066 27.2796 48.6676 25.3223 49.7896C23.365 50.8315 21.8155 52.2741 20.6738 54.1175C19.6136 55.9608 19.0835 58.1248 19.0835 60.6093C19.0835 63.0137 19.6136 65.1776 20.6738 67.1011C21.8155 68.9444 23.365 70.4271 25.3223 71.5492C27.3612 72.5911 29.7262 73.112 32.4175 73.112Z"
                  fill="url(#paint0_linear_6)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6"
                    x1="63"
                    y1="44.5"
                    x2="0"
                    y2="44.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#112DC7" />
                    <stop offset="1" stopColor="#081560" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-left">
                <Heading as="h3" variant="subtitle" className="mb-1">
                  Weekly updates &amp; full transparency
                </Heading>
                <Text variant="gray">
                  you&apos;ll never wonder what&apos;s happening
                </Text>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Button */}
        <Reveal
          className="mt-12 md:mt-14 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <a href={MEETING_LINK} target="_blank" rel="noopener noreferrer">
            <button className="pushable focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front"> Book a Call </span>
            </button>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyByteStudio;
