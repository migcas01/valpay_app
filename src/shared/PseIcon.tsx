import logoSrc from "@/assets/pse/logo_90x90.png";

export function PseLogo() {
  return (
    <div className="">
      <img src={logoSrc} alt="pse_logo" className="aspect-square w-full h-full object-contain scale-90" />
    </div>
  );
}
