import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  return (
    <>
      <ConnectButton />
      <div>Hello World</div>
    </>
  );
}
