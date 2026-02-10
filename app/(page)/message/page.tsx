import Image from "next/image";
import styles from "./message.module.css";
import ClientMessage from "./ClientMessage";

export default function Message() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <ClientMessage />
      </div>
    </div>
  );
}
