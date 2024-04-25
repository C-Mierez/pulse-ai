import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
    duration: 1,
    ease: "power2.inOut",
});

export * from "gsap";
export { useGSAP } from "@gsap/react";
export { ScrollTrigger } from "gsap/ScrollTrigger";
