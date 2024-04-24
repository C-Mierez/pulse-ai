import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

gsap.defaults({
    duration: 1,
    ease: "power2.inOut",
});

export * from "gsap";
export { useGSAP } from "@gsap/react";
