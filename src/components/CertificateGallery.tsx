import React from "react";
import { Award } from "lucide-react";
import type { CertificationItem } from "@/data/certifications";

/** Certificates as image tiles; clicking a tile opens the full certificate in a new tab. */
const CertificateGallery: React.FC<{ certs: CertificationItem[]; showEmployer?: boolean }> = ({ certs, showEmployer }) => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {certs.map((cert) => (
      <figure key={cert.id} className="overflow-hidden rounded-lg border border-border bg-card">
        {cert.image ? (
          <a href={cert.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${cert.name} certificate`}>
            <img
              src={cert.image}
              alt={`${cert.name} certificate`}
              loading="lazy"
              className="aspect-[4/3] w-full bg-white object-contain p-2 transition-transform hover:scale-[1.02]"
            />
          </a>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-muted/40 text-muted-foreground">
            <Award size={40} aria-hidden="true" />
          </div>
        )}
        <figcaption className="border-t border-border px-5 py-4">
          <p className="font-semibold">{cert.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {cert.issuer} · {cert.year}
            {showEmployer && cert.employer && ` · via ${cert.employer}`}
          </p>
        </figcaption>
      </figure>
    ))}
  </div>
);

export default CertificateGallery;
