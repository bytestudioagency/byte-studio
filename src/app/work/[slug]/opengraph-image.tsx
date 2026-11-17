import { ImageResponse } from "next/og";
import { projects, site } from "@/lib/site";

// The preview card shown when a link to a case study is shared.
export const alt = `${site.name} case study`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#050505";
const fog = "#9a9aa2";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug) ?? projects[0];
  const accent = project.accent;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f4f4f5",
          backgroundColor: ink,
          backgroundImage: `radial-gradient(circle at 85% 115%, ${accent}4d, rgba(5,5,5,0) 55%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, letterSpacing: -1 }}>
          <div style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: accent, marginRight: 16 }} />
          {site.name}
          <div style={{ display: "flex", color: fog, marginLeft: 16 }}>· Case study</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: accent, marginBottom: 20 }}>
            {project.kind} · {project.industry}
          </div>
          <div style={{ display: "flex", fontSize: 128, lineHeight: 1, letterSpacing: -5 }}>{project.name}</div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.3, color: fog, marginTop: 24, maxWidth: 960 }}>
            {project.summary}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: fog }}>
          {project.results.map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                marginRight: 12,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <div style={{ display: "flex", color: accent, marginRight: 10 }}>{r.value}</div>
              <div style={{ display: "flex" }}>{r.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
