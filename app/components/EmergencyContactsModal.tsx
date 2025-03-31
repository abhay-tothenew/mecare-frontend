import React from "react";
import Modal from "./common/Modal";
import styles from "../styles/emergency-contacts.module.css";

interface EmergencyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyContactsModal: React.FC<EmergencyContactsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const emergencyContacts = [
    {
      name: "Emergency Ambulance",
      number: "108",
      description: "24/7 Emergency Medical Services",
    },
    {
      name: "Hospital Emergency",
      number: "011-XXXX-XXXX",
      description: "Medicare Hospital Emergency Department",
    },
    {
      name: "Medical Helpline",
      number: "1800-XXX-XXXX",
      description: "24/7 Medical Consultation",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>Emergency Contacts</h2>
        <div className={styles.contactsList}>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className={styles.contactCard}>
              <h3>{contact.name}</h3>
              <p className={styles.phoneNumber}>{contact.number}</p>
              <p className={styles.description}>{contact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default EmergencyContactsModal;
