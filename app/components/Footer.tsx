import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/footer.module.css";
import EmergencyContactsModal from "./EmergencyContactsModal";

export default function Footer() {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  return (
    <>
      <footer
        style={{
          backgroundColor: "#DEDEDE",
          color: "#8C8C8C",
          padding: "20px",
          fontSize: "14px",
          fontWeight: "500",
          textAlign: "start",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>© EmScripts 2024. All Right Reserved.</p>
        </div>

        <div className={styles.footerIcons}>
          <div 
            style={{ cursor: "pointer" }}
            onClick={() => setShowEmergencyContacts(true)}
          >
            <Image src="/assets/call-icon.svg" width={30} height={30} alt="call icon" />
          </div>
          <Image src="/assets/WhatsApp.svg" width={25} height={25} alt="whatsapp icon" />
        </div>
      </footer>

      <EmergencyContactsModal 
        isOpen={showEmergencyContacts} 
        onClose={() => setShowEmergencyContacts(false)} 
      />
    </>
  );
}
