import SiteLogo from "../svg/site-logo";

export default function Branding() {
    return (
        <>
            <div className="h-6 w-7">
                <SiteLogo color="#fff" />
            </div>
            <h1 className="font-sans text-2xl font-medium leading-[1.5rem]">
                Pulse.<span className="text-accent-light">AI</span>
            </h1>
        </>
    );
}
