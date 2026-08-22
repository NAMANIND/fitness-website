"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profileTemplate } from "@/data/profileTemplate";
import AdminPreviewFrame, {
  scrollPreviewSection,
} from "@/components/admin/AdminPreviewFrame";
import JsonProfileModal from "@/components/admin/JsonProfileModal";
import ImageField from "@/components/admin/ImageField";
import MediaItemEditor from "@/components/admin/MediaItemEditor";
import { mergeProfile, type Package, type SiteProfile } from "@/lib/profile";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-coral"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-coral"
      />
    </label>
  );
}

function Section({
  id,
  title,
  onPreview,
  children,
}: {
  id: string;
  title: string;
  onPreview: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-coral">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => onPreview(id)}
          className="shrink-0 rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-400 transition hover:border-coral hover:text-coral"
        >
          Preview
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function JsonSection<T>({
  label,
  value,
  onChange,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
}) {
  const [raw, setRaw] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRaw(JSON.stringify(value, null, 2));
  }, [value]);

  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <textarea
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          try {
            onChange(JSON.parse(e.target.value) as T);
            setError(null);
          } catch {
            setError("Invalid JSON");
          }
        }}
        rows={8}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 font-mono text-xs text-white outline-none focus:border-coral"
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </label>
  );
}

export default function ProfileEditor({ username }: { username: string }) {
  const defaultProfile = useMemo(
    () => mergeProfile(profileTemplate, { username }),
    [username],
  );
  const [profile, setProfile] = useState<SiteProfile>(defaultProfile);
  const [editorWidth, setEditorWidth] = useState(340);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, width: 340 });
  const previewRef = useRef<HTMLIFrameElement>(null);
  const loaded = useRef<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jsonOpen, setJsonOpen] = useState(false);

  const previewSection = useCallback((id: string) => {
    scrollPreviewSection(previewRef, id);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("fw_admin_editor_width");
    if (saved) {
      const width = Number(saved);
      if (width >= 280 && width <= 720) {
        setEditorWidth(width);
        dragStart.current.width = width;
      }
    }
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (!dragging.current) return;
      const next =
        dragStart.current.width + (event.clientX - dragStart.current.x);
      setEditorWidth(Math.min(Math.max(280, next), window.innerWidth - 400));
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setEditorWidth((width) => {
        localStorage.setItem("fw_admin_editor_width", String(width));
        return width;
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const patch = useCallback((partial: Partial<SiteProfile>) => {
    setProfile((current) => mergeProfile(current, partial));
  }, []);

  const resetProfile = useCallback(() => {
    if (!confirm("Reset to the default template?")) return;
    setProfile(defaultProfile);
    setStatus("Reset");
    setError(null);
  }, [defaultProfile]);

  useEffect(() => {
    if (loaded.current === username) return;
    loaded.current = username;

    void (async () => {
      try {
        const response = await fetch(
          `/api/admin/profiles/${encodeURIComponent(username)}`,
        );
        if (!response.ok) return;
        const body = (await response.json()) as { data?: SiteProfile };
        if (body.data) {
          setProfile(mergeProfile(profileTemplate, body.data));
        }
      } catch {
        // keep local default
      }
    })();
  }, [username]);

  async function save() {
    setSaving(true);
    setStatus(null);
    setError(null);
    const response = await fetch(
      `/api/admin/profiles/${encodeURIComponent(username)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...profile,
            instagramTiles: profile.instagramTiles.filter(Boolean),
          },
        }),
      },
    );
    setSaving(false);
    if (!response.ok) {
      setError("Save failed");
      return;
    }
    setStatus("Saved");
  }

  async function remove() {
    if (!confirm(`Delete profile "${username}"?`)) return;
    const response = await fetch(
      `/api/admin/profiles/${encodeURIComponent(username)}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) window.location.href = "/admin";
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-400">{error}</p>
        <Link
          href="/admin"
          className="mt-4 inline-block text-coral hover:underline"
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <JsonProfileModal
        open={jsonOpen}
        profile={profile}
        defaultProfile={defaultProfile}
        username={username}
        onClose={() => setJsonOpen(false)}
        onApply={(next) =>
          setProfile(mergeProfile(profileTemplate, { ...next, username }))
        }
      />
      <div className="flex h-screen" data-lenis-prevent>
        <div
          className="flex min-h-0 w-full shrink-0 flex-col border-r border-neutral-800 max-lg:w-full lg:w-auto"
          style={{ width: editorWidth }}
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-neutral-800 px-4 py-3 justify-between">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-2.5 py-1.5 text-sm text-neutral-300 hover:border-coral hover:text-coral"
            >
              ←
            </Link>
            <Link
              href={`/${username}`}
              target="_blank"
              className="font-mono text-sm text-coral"
            >
              /{username}
            </Link>
          </header>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
            <div className="flex flex-wrap items-center gap-2">
              {status ? (
                <span className="text-xs text-green-400">{status}</span>
              ) : null}
              {error ? (
                <span className="text-xs text-red-400">{error}</span>
              ) : null}
              <button
                type="button"
                onClick={resetProfile}
                className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:border-coral hover:text-coral"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setJsonOpen(true)}
                className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:border-coral hover:text-coral"
              >
                JSON
              </button>
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving}
                className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => void remove()}
                className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-400 hover:border-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
            <Section id="brand" title="Brand" onPreview={previewSection}>
              <Field
                label="Short name"
                value={profile.brand.shortName}
                onChange={(shortName) =>
                  patch({ brand: { ...profile.brand, shortName } })
                }
              />
              <Field
                label="Full name"
                value={profile.brand.name}
                onChange={(name) =>
                  patch({ brand: { ...profile.brand, name } })
                }
              />
              <Field
                label="First name"
                value={profile.brand.firstName}
                onChange={(firstName) =>
                  patch({ brand: { ...profile.brand, firstName } })
                }
              />
              <Field
                label="Tagline"
                value={profile.brand.tagline}
                onChange={(tagline) =>
                  patch({ brand: { ...profile.brand, tagline } })
                }
              />
            </Section>

            <Section id="seo" title="SEO" onPreview={previewSection}>
              <Field
                label="Title"
                value={profile.seo.title}
                onChange={(title) => patch({ seo: { ...profile.seo, title } })}
              />
              <TextArea
                label="Description"
                value={profile.seo.description}
                onChange={(description) =>
                  patch({ seo: { ...profile.seo, description } })
                }
              />
              <Field
                label="Instagram handle"
                value={profile.seo.instagram}
                onChange={(instagram) =>
                  patch({ seo: { ...profile.seo, instagram } })
                }
              />
              <Field
                label="Instagram URL"
                value={profile.seo.instagramUrl}
                onChange={(instagramUrl) =>
                  patch({ seo: { ...profile.seo, instagramUrl } })
                }
              />
              <Field
                label="Email"
                value={profile.seo.email}
                type="email"
                onChange={(email) => patch({ seo: { ...profile.seo, email } })}
              />
              <Field
                label="Keywords (comma-separated)"
                value={profile.seo.keywords.join(", ")}
                onChange={(raw) =>
                  patch({
                    seo: {
                      ...profile.seo,
                      keywords: raw
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
              <ImageField
                label="OG image"
                value={profile.images.og}
                username={username}
                onChange={(og) => patch({ images: { ...profile.images, og } })}
              />
            </Section>

            <Section id="hero" title="Hero" onPreview={previewSection}>
              <ImageField
                label="Hero image"
                value={profile.images.hero}
                username={username}
                onChange={(hero) =>
                  patch({ images: { ...profile.images, hero } })
                }
              />
              <Field
                label="Line 1"
                value={profile.hero.heading.line1}
                onChange={(line1) =>
                  patch({
                    hero: {
                      ...profile.hero,
                      heading: { ...profile.hero.heading, line1 },
                    },
                  })
                }
              />
              <Field
                label="Accent"
                value={profile.hero.heading.accent}
                onChange={(accent) =>
                  patch({
                    hero: {
                      ...profile.hero,
                      heading: { ...profile.hero.heading, accent },
                    },
                  })
                }
              />
              <Field
                label="Line 2"
                value={profile.hero.heading.line2}
                onChange={(line2) =>
                  patch({
                    hero: {
                      ...profile.hero,
                      heading: { ...profile.hero.heading, line2 },
                    },
                  })
                }
              />
              <Field
                label="Line 3"
                value={profile.hero.heading.line3}
                onChange={(line3) =>
                  patch({
                    hero: {
                      ...profile.hero,
                      heading: { ...profile.hero.heading, line3 },
                    },
                  })
                }
              />
              <TextArea
                label="Subtext"
                value={profile.hero.subtext}
                onChange={(subtext) =>
                  patch({ hero: { ...profile.hero, subtext } })
                }
              />
              <Field
                label="Social proof"
                value={profile.hero.socialProof}
                onChange={(socialProof) =>
                  patch({ hero: { ...profile.hero, socialProof } })
                }
              />
            </Section>

            <Section
              id="credibility"
              title="Credibility"
              onPreview={previewSection}
            >
              <TextArea
                label="Items (one per line)"
                value={profile.credibility.join("\n")}
                onChange={(raw) =>
                  patch({ credibility: raw.split("\n").filter(Boolean) })
                }
              />
            </Section>

            <Section id="programs" title="Programs" onPreview={previewSection}>
              <Field
                label="Subheading"
                value={profile.sectionCopy.programs.subheading}
                onChange={(subheading) =>
                  patch({
                    sectionCopy: {
                      ...profile.sectionCopy,
                      programs: { subheading },
                    },
                  })
                }
              />
              <div className="space-y-3">
                {profile.programs.map((program, index) => (
                  <div
                    key={`${program.title}-${index}`}
                    className="space-y-2 rounded-lg border border-neutral-800 p-3"
                  >
                    <Field
                      label={`Program ${index + 1} title`}
                      value={program.title}
                      onChange={(title) => {
                        const programs = [...profile.programs];
                        programs[index] = { ...program, title };
                        patch({ programs });
                      }}
                    />
                    <TextArea
                      label="Description"
                      value={program.description}
                      rows={2}
                      onChange={(description) => {
                        const programs = [...profile.programs];
                        programs[index] = { ...program, description };
                        patch({ programs });
                      }}
                    />
                    <ImageField
                      label="Card image"
                      value={program.image}
                      username={username}
                      onChange={(image) => {
                        const programs = [...profile.programs];
                        programs[index] = { ...program, image };
                        patch({ programs });
                      }}
                    />
                    <Field
                      label="CTA label"
                      value={program.cta}
                      onChange={(cta) => {
                        const programs = [...profile.programs];
                        programs[index] = { ...program, cta };
                        patch({ programs });
                      }}
                    />
                    <label className="flex items-center gap-2 text-sm text-neutral-300">
                      <input
                        type="checkbox"
                        checked={program.isNew}
                        onChange={(event) => {
                          const programs = [...profile.programs];
                          programs[index] = {
                            ...program,
                            isNew: event.target.checked,
                          };
                          patch({ programs });
                        }}
                      />
                      Show &quot;New&quot; badge
                    </label>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="about" title="About" onPreview={previewSection}>
              <ImageField
                label="About image"
                value={profile.images.about}
                username={username}
                onChange={(about) =>
                  patch({ images: { ...profile.images, about } })
                }
              />
              <Field
                label="Eyebrow"
                value={profile.about.eyebrow}
                onChange={(eyebrow) =>
                  patch({ about: { ...profile.about, eyebrow } })
                }
              />
              <Field
                label="Heading"
                value={profile.about.heading}
                onChange={(heading) =>
                  patch({ about: { ...profile.about, heading } })
                }
              />
              <Field
                label="Heading accent"
                value={profile.about.headingAccent}
                onChange={(headingAccent) =>
                  patch({ about: { ...profile.about, headingAccent } })
                }
              />
              <TextArea
                label="Paragraphs (one per line)"
                value={profile.about.paragraphs.join("\n")}
                rows={5}
                onChange={(raw) =>
                  patch({
                    about: {
                      ...profile.about,
                      paragraphs: raw.split("\n").filter(Boolean),
                    },
                  })
                }
              />
            </Section>

            <Section id="packages" title="Pricing" onPreview={previewSection}>
              <JsonSection<Package[]>
                label="Packages JSON"
                value={profile.packages}
                onChange={(packages) => patch({ packages })}
              />
            </Section>

            <Section
              id="testimonials"
              title="Testimonials"
              onPreview={previewSection}
            >
              <div className="space-y-3">
                {profile.testimonials.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="space-y-2 rounded-lg border border-neutral-800 p-3"
                  >
                    <Field
                      label="Name"
                      value={item.name}
                      onChange={(name) => {
                        const testimonials = [...profile.testimonials];
                        testimonials[index] = { ...item, name };
                        patch({ testimonials });
                      }}
                    />
                    <Field
                      label="Weeks"
                      value={item.weeks}
                      onChange={(weeks) => {
                        const testimonials = [...profile.testimonials];
                        testimonials[index] = { ...item, weeks };
                        patch({ testimonials });
                      }}
                    />
                    <TextArea
                      label="Quote"
                      value={item.quote}
                      rows={2}
                      onChange={(quote) => {
                        const testimonials = [...profile.testimonials];
                        testimonials[index] = { ...item, quote };
                        patch({ testimonials });
                      }}
                    />
                    <ImageField
                      label="Before image"
                      value={item.beforeImage}
                      username={username}
                      onChange={(beforeImage) => {
                        const testimonials = [...profile.testimonials];
                        testimonials[index] = { ...item, beforeImage };
                        patch({ testimonials });
                      }}
                    />
                    <ImageField
                      label="After image"
                      value={item.afterImage}
                      username={username}
                      onChange={(afterImage) => {
                        const testimonials = [...profile.testimonials];
                        testimonials[index] = { ...item, afterImage };
                        patch({ testimonials });
                      }}
                    />
                  </div>
                ))}
              </div>
            </Section>

            <Section id="shop" title="Shop" onPreview={previewSection}>
              <Field
                label="CTA URL"
                value={profile.shop.ctaUrl}
                onChange={(ctaUrl) =>
                  patch({ shop: { ...profile.shop, ctaUrl } })
                }
              />
              <Field
                label="Promo code"
                value={profile.shop.promoCode}
                onChange={(promoCode) =>
                  patch({ shop: { ...profile.shop, promoCode } })
                }
              />
              <Field
                label="Discount"
                value={profile.shop.discount}
                onChange={(discount) =>
                  patch({ shop: { ...profile.shop, discount } })
                }
              />
              <div className="space-y-2">
                <p className="text-xs text-neutral-400">Items</p>
                {profile.shop.items.map((item, index) => (
                  <MediaItemEditor
                    key={index}
                    username={username}
                    item={item}
                    onChange={(next) => {
                      const items = [...profile.shop.items];
                      items[index] = next;
                      patch({ shop: { ...profile.shop, items } });
                    }}
                    onRemove={() => {
                      patch({
                        shop: {
                          ...profile.shop,
                          items: profile.shop.items.filter(
                            (_, i) => i !== index,
                          ),
                        },
                      });
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patch({
                      shop: {
                        ...profile.shop,
                        items: [
                          ...profile.shop.items,
                          { video: "", poster: "", alt: "", instagramUrl: "" },
                        ],
                      },
                    })
                  }
                  className="text-xs text-coral hover:underline"
                >
                  + Add item
                </button>
              </div>
            </Section>

            <Section
              id="supplements"
              title="Supplements"
              onPreview={previewSection}
            >
              <Field
                label="CTA URL"
                value={profile.supplements.ctaUrl}
                onChange={(ctaUrl) =>
                  patch({ supplements: { ...profile.supplements, ctaUrl } })
                }
              />
              <div className="space-y-2">
                <p className="text-xs text-neutral-400">Items</p>
                {profile.supplements.items.map((item, index) => (
                  <MediaItemEditor
                    key={index}
                    username={username}
                    item={item}
                    onChange={(next) => {
                      const items = [...profile.supplements.items];
                      items[index] = next;
                      patch({ supplements: { ...profile.supplements, items } });
                    }}
                    onRemove={() => {
                      patch({
                        supplements: {
                          ...profile.supplements,
                          items: profile.supplements.items.filter(
                            (_, i) => i !== index,
                          ),
                        },
                      });
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patch({
                      supplements: {
                        ...profile.supplements,
                        items: [
                          ...profile.supplements.items,
                          { video: "", poster: "", alt: "", instagramUrl: "" },
                        ],
                      },
                    })
                  }
                  className="text-xs text-coral hover:underline"
                >
                  + Add item
                </button>
              </div>
            </Section>

            <Section
              id="instagram"
              title="Instagram tiles"
              onPreview={previewSection}
            >
              <div className="space-y-3">
                {profile.instagramTiles.map((url, index) => (
                  <ImageField
                    key={index}
                    label={`Tile ${index + 1}`}
                    value={url}
                    username={username}
                    onChange={(next) => {
                      const instagramTiles = [...profile.instagramTiles];
                      instagramTiles[index] = next;
                      patch({ instagramTiles });
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patch({ instagramTiles: [...profile.instagramTiles, ""] })
                  }
                  className="text-xs text-coral hover:underline"
                >
                  + Add tile
                </button>
              </div>
            </Section>

            <Section id="finalCta" title="Copy" onPreview={previewSection}>
              <Field
                label="Pricing subheading"
                value={profile.sectionCopy.pricing.subheading}
                onChange={(subheading) =>
                  patch({
                    sectionCopy: {
                      ...profile.sectionCopy,
                      pricing: { subheading },
                    },
                  })
                }
              />
              <Field
                label="Final CTA subheading"
                value={profile.sectionCopy.finalCta.subheading}
                onChange={(subheading) =>
                  patch({
                    sectionCopy: {
                      ...profile.sectionCopy,
                      finalCta: { subheading },
                    },
                  })
                }
              />
              <Field
                label="Scarcity message"
                value={profile.scarcityMessage}
                onChange={(scarcityMessage) => patch({ scarcityMessage })}
              />
            </Section>
          </div>
        </div>

        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
          onMouseDown={(event) => {
            dragging.current = true;
            dragStart.current = { x: event.clientX, width: editorWidth };
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
          className="hidden w-1.5 shrink-0 cursor-col-resize bg-neutral-800 transition-colors hover:bg-coral active:bg-coral lg:block"
        />

        <div className="hidden min-h-0 min-w-0 flex-1 flex-col lg:flex">
          <div className="shrink-0 border-b border-neutral-800 bg-neutral-950/90 px-4 py-2 text-xs uppercase tracking-wide text-neutral-500">
            Live preview
          </div>
          <div className="min-h-0 flex-1">
            <AdminPreviewFrame profile={profile} iframeRef={previewRef} />
          </div>
        </div>
      </div>
    </>
  );
}
