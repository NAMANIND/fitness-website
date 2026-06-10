"use client";

import { useContactDialog } from "@/components/ContactDialogProvider";

type ContactButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function ContactButton({
  children,
  className = "btn-primary",
  onClick,
}: ContactButtonProps) {
  const { openContact } = useContactDialog();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openContact();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
