import React from "react";
import { Award } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import type { CertificationItem } from "@/data/certifications";

interface CertificateDialogProps {
  cert: CertificationItem;
  children: React.ReactNode;
}

/** Wraps a trigger element so clicking it opens the certificate image. */
const CertificateDialog: React.FC<CertificateDialogProps> = ({ cert, children }) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-3xl bg-portfolio-navy border-portfolio-slate/20 p-0 overflow-hidden">
      <div className="p-6 border-b border-portfolio-slate/10">
        <DialogTitle className="text-portfolio-white text-2xl font-semibold">
          {cert.name}
        </DialogTitle>
      </div>
      <div className="bg-muted/40 p-6 flex justify-center">
        <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl border border-portfolio-slate/20">
          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.name} Certificate`}
              className="w-full h-auto object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-portfolio-slate bg-portfolio-navy">
              <Award size={48} className="mb-4 opacity-50" />
              <p>Certificate image not available</p>
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default CertificateDialog;
